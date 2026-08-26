/**
 * 接缝三：骨架分发的漂移。
 *
 * 骨架分发把母版仓的文件拷进客户宿主，拷完这些文件在宿主内不再具有版本身份——
 * 谁在本地改了一行，没有任何机制会发现，直到下一次分发把它悄悄覆盖，或它悄悄留存成四个客户的差异。
 * 内容指纹补上这一环：分发落地时盖章，之后任何就地修改都与章不符。
 *
 * 章由 `node scripts/sharedFingerprint.js --write` 盖，仅应在分发刚落地、宿主等同母版时执行。
 *
 * @author nokecy
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { repoRoot } from './_helpers/routeTable';

const fingerprintFile = join(repoRoot, '.shared-fingerprint.json');
const scriptFile = join(repoRoot, 'scripts', 'sharedFingerprint.js');

type Fingerprint = { 文件数: number; 指纹: Record<string, string> };

describe('骨架分发漂移', () => {
	it('分发内容已盖章', () => {
		assert.ok(
			existsSync(fingerprintFile),
			'缺少 .shared-fingerprint.json。分发落地后执行：node scripts/sharedFingerprint.js --write',
		);
	});

	it('共享文件与指纹一致，无就地修改', () => {
		let output = '';
		try {
			output = execFileSync('node', [scriptFile], { cwd: repoRoot }).toString();
		} catch (error: any) {
			const detail = [error.stdout?.toString(), error.stderr?.toString()].filter(Boolean).join('\n');
			assert.fail(
				`共享文件已偏离分发内容：\n${detail}\n` +
					'就地修改共享资产会在下次分发时被覆盖，且不会传播到其他客户。' +
					'该改动若属通用能力，应回母版仓；若属客户差异，应改到客户配置里。',
			);
		}
		assert.match(output, /无漂移/);
	});

	it('指纹覆盖面不得退化', () => {
		const { 文件数, 指纹 } = JSON.parse(readFileSync(fingerprintFile, 'utf8')) as Fingerprint;
		assert.equal(文件数, Object.keys(指纹).length, '指纹表与声明的文件数不符');
		assert.ok(文件数 >= 50, `指纹只覆盖 ${文件数} 个文件，分发内容不该这么少，检查清单或盖章范围`);
	});
});
