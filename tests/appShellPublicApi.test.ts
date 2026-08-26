/**
 * 应用壳公开接口接缝测试。
 *
 * 应用壳被四个客户宿主与多个业务模块共享。若使用方可以任意深挖壳内部结构，
 * 壳就无法在不惊动使用方的前提下重构——公开接口清单存在的意义就是划出这条线。
 *
 * 本测试断言：使用方对应用壳的每一处引用，都必须命中 src/appShell/public-api.json；
 * 反过来，清单里的每一条也必须真实存在。清单未列入的一切均为应用壳内部实现。
 *
 * @author nokecy
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { describe, it } from 'node:test';

const repoRoot = join(__dirname, '..');
const appShellRoot = join(repoRoot, 'src/appShell');

interface PublicApi {
    约定挂载点: string[];
    公开路径: string[];
}

const publicApi: PublicApi = JSON.parse(
    readFileSync(join(appShellRoot, 'public-api.json'), 'utf8'),
);

/** 扫描范围：使用方代码。应用壳自身与 umi 临时产物不在其中。 */
const SCAN_ROOTS = ['src', 'config', 'plugins'];
const SKIP_DIRS = new Set(['node_modules', '.git', 'appShell']);
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.less', '.css']);

const collectFiles = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
        if (SKIP_DIRS.has(entry) || entry.startsWith('.umi')) continue;
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) collectFiles(full, out);
        else if (SCAN_EXTS.has(extname(entry))) out.push(full);
    }
    return out;
};

interface Reference {
    file: string;
    path: string;
    kind: 'alias' | 'mount';
}

const collectReferences = (): Reference[] => {
    const refs: Reference[] = [];
    for (const root of SCAN_ROOTS) {
        const dir = join(repoRoot, root);
        if (!existsSync(dir)) continue;
        for (const file of collectFiles(dir)) {
            const source = readFileSync(file, 'utf8');
            const rel = relative(repoRoot, file);
            for (const [, path] of source.matchAll(/@\/appShell\/([A-Za-z0-9_./-]+)/g)) {
                refs.push({ file: rel, path, kind: 'alias' });
            }
            // 宿主根级转发文件以相对路径挂载应用壳的 umi 约定文件
            for (const [, path] of source.matchAll(/(?<![\w@])\.\/appShell\/([A-Za-z0-9_./-]+)/g)) {
                refs.push({ file: rel, path, kind: 'mount' });
            }
        }
    }
    return refs;
};

const references = collectReferences();

describe('应用壳公开接口', () => {
    it('使用方对应用壳的引用不得越出公开接口清单', () => {
        const allowed = new Set(publicApi.公开路径);
        const violations = references
            .filter(ref => ref.kind === 'alias' && !allowed.has(ref.path))
            .map(ref => `${ref.file} -> @/appShell/${ref.path}`);

        assert.deepEqual(
            [...new Set(violations)].sort(),
            [],
            '出现了未列入公开接口清单的引用。若确属应当公开的能力，先在 src/appShell/public-api.json 登记；否则改用清单内的公开路径。',
        );
    });

    it('宿主转发文件只能挂载清单声明的约定挂载点', () => {
        const allowed = new Set(publicApi.约定挂载点);
        const violations = references
            .filter(ref => ref.kind === 'mount' && !allowed.has(ref.path))
            .map(ref => `${ref.file} -> ./appShell/${ref.path}`);

        assert.deepEqual([...new Set(violations)].sort(), []);
    });

    it('清单中的每一条都必须在应用壳内真实存在', () => {
        const resolves = (path: string) => {
            const base = join(appShellRoot, path);
            if (existsSync(base)) return true;
            return ['.ts', '.tsx', '.less', '.css'].some(ext => existsSync(`${base}${ext}`));
        };

        const missing = [...publicApi.约定挂载点, ...publicApi.公开路径].filter(
            path => !resolves(path),
        );
        assert.deepEqual(missing, [], '清单声明了应用壳中不存在的路径，清单已经腐烂。');
    });

    it('应用壳的内部实现域不得被使用方引用', () => {
        // 这四个域整体是内部实现：models 经 umi extraModels 注册后由 useModel 消费，
        // icons/style/assets 只服务于应用壳自身的渲染。
        const privateDomains = ['models', 'icons', 'style', 'assets'];
        const leaked = references
            .filter(ref => privateDomains.some(domain => ref.path === domain || ref.path.startsWith(`${domain}/`)))
            .map(ref => `${ref.file} -> ${ref.path}`);

        assert.deepEqual([...new Set(leaked)].sort(), []);
    });

    it('公开面必须显著小于应用壳的全部内容，否则收窄没有发生', () => {
        const countMembers = (domain: string) => {
            const dir = join(appShellRoot, domain);
            return existsSync(dir) ? readdirSync(dir).length : 0;
        };
        const domains = ['components', 'hooks', '_utils', 'models', 'icons', 'style', 'assets', 'layouts', 'appLogin'];
        const totalMembers = domains.reduce((sum, domain) => sum + countMembers(domain), 0);

        assert.ok(
            publicApi.公开路径.length < totalMembers,
            `公开路径 ${publicApi.公开路径.length} 条已经不少于壳内成员 ${totalMembers} 个，公开面失去了约束意义。`,
        );
    });
});
