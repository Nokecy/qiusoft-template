#caimen_web
## docker build 命令
docker build --pull --rm -f "Dockerfile" -t crpi-0kxun921ghao17rn.cn-shenzhen.personal.cr.aliyuncs.com/nokecy/caimen_web:0.1 "."
## 登录仓库
docker login --username=nokecy@163.com crpi-0kxun921ghao17rn.cn-shenzhen.personal.cr.aliyuncs.com
## push镜像到仓库
docker push crpi-0kxun921ghao17rn.cn-shenzhen.personal.cr.aliyuncs.com/nokecy/caimen_web:0.1