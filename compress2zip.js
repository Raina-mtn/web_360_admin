const { exec } = require('child_process');
const path = require('path');

// 获取当前目录
const currentDirectory = process.cwd();

// 打开当前目录
exec(`start ${currentDirectory}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`打开当前目录时出错: ${error}`);
    return;
  }
});

// 运行 zip.bat
const zipBatPath = path.join(currentDirectory, 'zip.bat');
exec(`start ${zipBatPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`运行 zip.bat 时出错: ${error}`);
    return;
  }
});