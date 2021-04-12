const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (message) => {
  return new Promise((resolve) => {
    readline.question(message, (result) => {
      resolve(result);
      readline.close();
    });
  });
};

async function main() {
  const name = await question('请输入项目名称：');

  // TODO: 根据提示修改
  // const databaseUrl = await question('请输入数据库名称');
  // const jwtSecert = await question('请输入 jwt secret');
  // const authorization = await question('请输入 authorization key');

  const pkg = require('./package.json');
  pkg.name = name;

  await fs.promises.writeFile('./package.json', JSON.stringify(pkg, null, 2));
  console.log('success');
}

main();
