const fs = require('fs');
const path = require('path');

/**
 * 自动路由生成器
 *
 * 扫描 src/pages/{appXxx}/ 下的 .tsx / .jsx，根据文件中导出的 routeProps
 * 生成 config/routeItems/{appXxx}.json。
 *
 * routeProps 字段：
 *   name    string   必填。菜单 / 标签名
 *   path    string?  可选。显式 URL；缺省则按文件路径派生（向后兼容）
 *   xLayout boolean? 可选。是否套外层 layout，默认 true
 *
 * 设计原则：
 *   1. 只有显式声明了 routeProps 的文件才被注册成路由。
 *      —— 内部子组件 / Editor 不再被错误暴露为顶层 URL。
 *   2. path 与文件路径解耦：迁文件 / 重命名不破坏 URL，URL 命名也不必跟物理目录挂钩。
 *   3. 字段顺序、引号风格、尾逗号无关，正则更鲁棒。
 *   4. 输出按 path 字典序排序，便于 diff。
 *
 * @author nokecy
 */

/**
 * 从一段源码中解析 routeProps 字面量。
 * 没有 routeProps 或 routeProps 缺 name → 返回 null（视作非页面）。
 */
const extractRouteProps = (codeString) => {
  const block = codeString.match(/export\s+const\s+routeProps\s*=\s*\{([\s\S]*?)\}\s*;?/);
  if (!block) return null;
  const body = block[1];

  const pickString = (key) => {
    const r = body.match(new RegExp(`\\b${key}\\s*:\\s*['"\`]([^'"\`]*)['"\`]`));
    return r ? r[1] : undefined;
  };
  const pickBool = (key) => {
    const r = body.match(new RegExp(`\\b${key}\\s*:\\s*(true|false)\\b`));
    return r ? r[1] === 'true' : undefined;
  };

  const name = pickString('name');
  if (name === undefined) return null;

  return {
    name,
    path: pickString('path'),
    xLayout: pickBool('xLayout') ?? true,
  };
};

/** 递归列出 .tsx / .jsx；忽略 _ / . 开头目录与文件 */
const getAllFilePaths = async (dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const results = await Promise.all(
      entries.map(async (entry) => {
        const filePath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          if (entry.name.startsWith('_') || entry.name.startsWith('.')) return [];
          return await getAllFilePaths(filePath);
        }
        if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.jsx')) return [];
        if (entry.name.startsWith('.')) return [];
        return filePath;
      }),
    );
    return results.flat().filter(Boolean);
  } catch (err) {
    console.error(`--文件递归读取失败-- ${dirPath}:`, err);
    return [];
  }
};

/**
 * 由 unix 风格的相对路径派生默认 URL / component。
 *   ./appMES/basicInfo/CollectRule/List.tsx       → /appMES/basicInfo/CollectRule/List
 *   ./appMES/basicInfo/CollectRule/index.tsx      → /appMES/basicInfo/CollectRule
 */
const derivePathFromFile = (unixRelPath) => unixRelPath.substr(1).replace(/(\/index\.tsx|\.tsx)$/, '');

const writeRouteFile = async (routeFileName) => {
  const targetDir = './src/pages';
  try {
    const allFilePaths = await getAllFilePaths(targetDir);
    const records = [];
    let skipped = 0;

    for (const filePath of allFilePaths) {
      const unixPath = `./${filePath.replace(/\\/g, '/').slice(10)}`;
      if (
        unixPath.includes('components') ||
        unixPath.includes('_') ||
        !unixPath.includes(routeFileName)
      ) {
        continue;
      }
      const content = fs.readFileSync(filePath, 'utf8');
      const props = extractRouteProps(content);
      if (!props) {
        skipped += 1;
        continue;
      }
      const componentPath = derivePathFromFile(unixPath);
      records.push({
        path: props.path ?? componentPath,
        component: `.${componentPath}`,
        name: props.name,
        layout: props.xLayout,
      });
    }

    records.sort((a, b) => a.path.localeCompare(b.path));

    const outFile = `./config/routeItems/${routeFileName}.json`;
    await fs.promises.writeFile(outFile, JSON.stringify(records, null, 2));
    console.log(
      `--  \x1b[34m${routeFileName}\x1b[0m 路由文件更新成功（${records.length} 条，跳过无 routeProps ${skipped} 个） --`,
    );
  } catch (err) {
    console.error('--路由文件更新失败--:', err);
  }
};

const getSubdirectories = async (dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((d) => d.name);
  } catch (err) {
    console.error('--文件名读取失败--:', err);
    return [];
  }
};

const run = async () => {
  const targetFileUrl = process.argv[3];
  if (process.argv.length > 3 && targetFileUrl) {
    console.log('处理单个目标文件夹:', targetFileUrl);
    await writeRouteFile(targetFileUrl);
  } else {
    console.log('处理所有目标文件夹...');
    const subDirs = await getSubdirectories('./src/pages');
    subDirs
      .filter((dir) => dir.includes('app') && !dir.startsWith('_') && !dir.startsWith('.'))
      .forEach((dir) => writeRouteFile(dir));
  }
};

run().catch((err) => console.error('程序运行出错:', err));
