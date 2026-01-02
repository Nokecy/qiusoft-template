const fs = require('fs');
const path = require('path');

// 从代码字符串中提取 routeProps
const extractRouteProps = (codeString) => {
  const regex = /export const routeProps = {[\s\S]*?name: '([^']*)'(?:,[\s\S]*?xLayout: (\w+))?[\s\S]*?}/g;
  const routes = [];
  let match;
  
  while ((match = regex.exec(codeString)) !== null) {
    routes.push({
      name: match[1],
      xLayout: match[2] === undefined ? true : match[2] === 'true' // 默认 true
    });
  }
  
  return routes;
};

// 异步读取文件目录和文件路径
const getAllFilePaths = async (dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const results = await Promise.all(entries.map(async (entry) => {
      const filePath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // 忽略 _ 开头或 . 开头的文件夹
        if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
          return [];
        }
        return await getAllFilePaths(filePath);
      } else {
        // 只处理 tsx 和 jsx 文件
        if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.jsx')) {
          return [];
        }
        // 忽略 . 开头的文件
        if (entry.name.startsWith('.')) {
          return [];
        }
        return filePath;
      }
    }));
    return results.flat().filter(Boolean); // 过滤掉空值
  } catch (err) {
    console.error(`--文件递归读取失败-- ${dirPath}:`, err);
    return [];
  }
};

// 生成路由文件
const writeRouteFile = async (routeFileName) => {
  const targetDir = './src/pages';
  try {
    const allFilePaths = await getAllFilePaths(targetDir);
    const unixRecords = allFilePaths.map((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const dispositions = extractRouteProps(content)[0];
      return {
        path: `./${filePath.replace(/\\/g, '/').slice(10)}`,
        dispositions
      };
    });

    const routes = unixRecords
      .filter(({ path }) => !path.includes("components") && !path.includes("_") && path.includes(routeFileName))
      .map(({ path, dispositions }) => {
        const cleanPath = path.substr(1).replace(/(\/index\.tsx|\.tsx)$/, "");
        return {
          path: cleanPath,
          component: `.${cleanPath}`,
          name: dispositions?.name || '',
          layout: dispositions?.xLayout
        };
      });

    const filePath = `./config/routeItems/${routeFileName}.json`;
    const jsonString = JSON.stringify(routes, null, 2);
    await fs.promises.writeFile(filePath, jsonString);
    console.log(`--  \x1b[34m${routeFileName}\x1b[0m 路由文件更新成功 --`);
  } catch (err) {
    console.error('--路由文件更新失败--:', err);
  }
};

// 获取目录下的子文件夹
const getSubdirectories = async (dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    return entries.filter(entry => entry.isDirectory()).map(dir => dir.name);
  } catch (err) {
    console.error('--文件名读取失败--:', err);
    return [];
  }
};

// 入口函数，根据传入参数判断处理方式
const run = async () => {
  const targetFileUrl = process.argv[3];

  if (process.argv.length > 3 && targetFileUrl) {
    console.log('处理单个目标文件夹:', targetFileUrl);
    await writeRouteFile(targetFileUrl);
  } else {
    console.log('处理所有目标文件夹...');
    const subDirs = await getSubdirectories('./src/pages');
    subDirs.filter(dir => dir.includes('app') && !dir.startsWith('_') && !dir.startsWith('.'))
      .forEach(dir => writeRouteFile(dir));
  }
};

run().catch(err => console.error('程序运行出错:', err));
