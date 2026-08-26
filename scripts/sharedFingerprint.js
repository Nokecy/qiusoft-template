#!/usr/bin/env node

/**
 * 骨架分发的内容指纹。
 *
 * 骨架分发把母版仓的文件拷进客户宿主，拷完这些文件在宿主内就不再具有版本身份——
 * 谁在本地改了一行，没有任何机制会发现。本脚本给分发内容盖一枚指纹章：
 * 分发落地时盖章，之后任何就地修改都会与章不符，被 tests/sharedDrift.test.ts 拦下。
 *
 * 用法:
 *   node scripts/sharedFingerprint.js           比对当前内容与基线，有漂移则以非零码退出
 *   node scripts/sharedFingerprint.js --write   重新盖章（仅在分发刚落地、宿主等同母版时执行）
 *
 * 注意：带 skipIfExists 的条目是客户配置的落点，本就允许各客户不同，不纳入指纹。
 *
 * @author nokecy
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const manifestFile = path.join(repoRoot, 'shared.manifest.json');
const fingerprintFile = path.join(repoRoot, '.shared-fingerprint.json');

const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));

/** 把清单里的排除条目化为判定函数。`**\/x/**` 视为「路径任意层级下的 x 目录」。 */
const isExcluded = relPath => {
	return manifest.exclude.some(pattern => {
		if (pattern.startsWith('**/') && pattern.endsWith('/**')) {
			const segment = pattern.slice(3, -3);
			return relPath === segment || relPath.startsWith(`${segment}/`) || relPath.includes(`/${segment}/`);
		}
		if (pattern.startsWith('**/')) {
			const tail = pattern.slice(3);
			return relPath === tail || relPath.endsWith(`/${tail}`);
		}
		return relPath === pattern;
	});
};

/**
 * 指纹范围以 git 跟踪的文件为准。未跟踪与被忽略的内容（.husky/_ 这类工具生成物、
 * node_modules、构建产物）本就不随分发走，纳入指纹只会制造假漂移。
 */
const trackedFiles = execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot, maxBuffer: 64 * 1024 * 1024 })
	.toString('utf8')
	.split('\0')
	.filter(Boolean);

const isUnder = (file, entryPath) => file === entryPath || file.startsWith(`${entryPath}/`);

/** 指纹只覆盖真正共享的条目：skipIfExists 的是客户配置落点，各客户本就不同。 */
const sharedEntries = manifest.includes.filter(entry => !entry.skipIfExists);

const buildFingerprint = () => {
	const files = trackedFiles
		.filter(file => sharedEntries.some(entry => isUnder(file, entry.to)))
		.filter(file => !isExcluded(file))
		.sort();
	const fingerprint = {};
	for (const file of files) {
		const full = path.join(repoRoot, file);
		// git 跟踪但工作树里没有的文件不算数，留给比对环节报成「分发缺失」。
		if (!fs.existsSync(full)) continue;
		fingerprint[file] = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex').slice(0, 16);
	}
	return fingerprint;
};

/** 分发内容与基线的差异。缺失、多出、改动三类分开报，便于判断该补分发还是该回退本地修改。 */
const compare = (current, baseline) => {
	const currentKeys = Object.keys(current);
	const baselineKeys = Object.keys(baseline);
	return {
		changed: currentKeys.filter(file => baseline[file] && baseline[file] !== current[file]),
		added: currentKeys.filter(file => !baseline[file]),
		removed: baselineKeys.filter(file => !current[file]),
	};
};

const current = buildFingerprint();

if (process.argv.includes('--write')) {
	const stamp = {
		说明: '骨架分发的内容指纹。分发落地时由 scripts/sharedFingerprint.js --write 盖章，tests/sharedDrift.test.ts 据此发现就地修改。',
		基于清单: path.basename(manifestFile),
		文件数: Object.keys(current).length,
		指纹: current,
	};
	fs.writeFileSync(fingerprintFile, `${JSON.stringify(stamp, null, 2)}\n`, 'utf8');
	console.log(`已盖章：${Object.keys(current).length} 个文件 -> ${path.basename(fingerprintFile)}`);
	process.exit(0);
}

if (!fs.existsSync(fingerprintFile)) {
	console.error('尚未盖章。分发落地后执行：node scripts/sharedFingerprint.js --write');
	process.exit(1);
}

const { 指纹: baseline } = JSON.parse(fs.readFileSync(fingerprintFile, 'utf8'));
const { changed, added, removed } = compare(current, baseline);

if (!changed.length && !added.length && !removed.length) {
	console.log(`无漂移：${Object.keys(current).length} 个共享文件与指纹一致`);
	process.exit(0);
}

if (changed.length) console.error(`就地修改 ${changed.length} 个：\n  ${changed.join('\n  ')}`);
if (added.length) console.error(`章外多出 ${added.length} 个：\n  ${added.join('\n  ')}`);
if (removed.length) console.error(`分发缺失 ${removed.length} 个：\n  ${removed.join('\n  ')}`);
process.exit(1);
