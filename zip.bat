@echo off
rem 检查是否存在 dist.zip 文件，存在则删除
if exist dist.zip (
    del dist.zip
)

rem 压缩 dist 目录为 dist.zip
powershell Compress-Archive -Path "dist" -DestinationPath "dist.zip"