/**
 * 接缝四：业务模块之间的边界。
 *
 * 业务模块各自固定版本，前提是彼此只经公开接口往来。若模块可以任意深挖别的模块，
 * 「可独立固定版本」就只是名义上的——升一个模块要连带验另一个，循环依赖更会让两个模块必须同版本。
 *
 * 本测试断言两件事：
 * 一、模块对别的模块的每一处引用，都必须命中被引模块的 public-api.json；
 * 二、模块之间不得成环。
 *
 * 模块自身内部的引用不受约束，那是模块的内部实现自由。
 *
 * @author nokecy
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { describe, it } from 'node:test';
import { repoRoot } from './_helpers/routeTable';

const pagesRoot = join(repoRoot, 'src/pages');
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx']);

/** 业务模块 = src/pages 下自带模块自述的目录。 */
const modules = readdirSync(pagesRoot).filter(name => existsSync(join(pagesRoot, name, 'routes.json')));

const collectFiles = (dir: string, out: string[] = []): string[] => {
	for (const entry of readdirSync(dir)) {
		if (entry === 'node_modules' || entry === '.git' || entry.startsWith('.umi')) continue;
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) collectFiles(full, out);
		else if (SCAN_EXTS.has(extname(entry))) out.push(full);
	}
	return out;
};

interface CrossReference {
	file: string;
	from: string;
	to: string;
	path: string;
}

const collectCrossReferences = (): CrossReference[] => {
	const refs: CrossReference[] = [];
	for (const from of modules) {
		for (const file of collectFiles(join(pagesRoot, from))) {
			const source = readFileSync(file, 'utf8');
			for (const [, to, path] of source.matchAll(/@\/pages\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_./-]+)/g)) {
				if (to === from || !modules.includes(to)) continue;
				refs.push({ file: relative(repoRoot, file), from, to, path });
			}
		}
	}
	return refs;
};

const crossReferences = collectCrossReferences();

const readPublicApi = (module: string): string[] | null => {
	const file = join(pagesRoot, module, 'public-api.json');
	if (!existsSync(file)) return null;
	return (JSON.parse(readFileSync(file, 'utf8')) as { 公开路径: string[] }).公开路径;
};

describe('业务模块边界', () => {
	it('被别的模块引用的模块必须持有公开接口清单', () => {
		const consumed = [...new Set(crossReferences.map(ref => ref.to))].sort();
		const missing = consumed.filter(module => readPublicApi(module) === null);
		assert.deepEqual(
			missing,
			[],
			'这些模块正被其他模块引用，却没有 public-api.json，边界仍是隐式的。',
		);
	});

	it('跨模块引用不得越出被引模块的公开接口清单', () => {
		const violations = crossReferences
			.filter(ref => {
				const allowed = readPublicApi(ref.to);
				return allowed !== null && !allowed.includes(ref.path);
			})
			.map(ref => `${ref.file} -> @/pages/${ref.to}/${ref.path}`);

		assert.deepEqual(
			[...new Set(violations)].sort(),
			[],
			'出现了未列入被引模块公开接口清单的引用。若确属应当公开的能力，先在该模块的 public-api.json 中登记；' +
				'若属通用能力，更应上提到应用壳。',
		);
	});

	it('模块之间不得成环', () => {
		const edges = new Map<string, Set<string>>();
		for (const ref of crossReferences) {
			if (!edges.has(ref.from)) edges.set(ref.from, new Set());
			edges.get(ref.from)!.add(ref.to);
		}

		const cycles: string[] = [];
		const visiting = new Set<string>();
		const visited = new Set<string>();

		const walk = (node: string, trail: string[]) => {
			if (visiting.has(node)) {
				// trail 末项即 node，从上一次出现处截断就是完整的环
				cycles.push(trail.slice(trail.indexOf(node)).join(' -> '));
				return;
			}
			if (visited.has(node)) return;
			visiting.add(node);
			for (const next of edges.get(node) ?? []) walk(next, [...trail, next]);
			visiting.delete(node);
			visited.add(node);
		};

		for (const module of modules) walk(module, [module]);

		assert.deepEqual(
			[...new Set(cycles)].sort(),
			[],
			'模块之间出现循环依赖，环上的模块无法各自独立升级。把双方共用的东西上提到应用壳可以断环。',
		);
	});

	it('清单中的每一条都必须在模块内真实存在', () => {
		const missing: string[] = [];
		for (const module of modules) {
			for (const path of readPublicApi(module) ?? []) {
				const base = join(pagesRoot, module, path);
				const resolves = existsSync(base) || ['.ts', '.tsx'].some(ext => existsSync(`${base}${ext}`));
				if (!resolves) missing.push(`${module}/${path}`);
			}
		}
		assert.deepEqual(missing, [], '清单声明了模块中不存在的路径，清单已经腐烂。');
	});
});
