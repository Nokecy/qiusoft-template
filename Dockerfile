# Step 1
#基础镜像
FROM node:20.16 AS build-stage

RUN mkdir /app
#工作目录
WORKDIR /app
#拷贝文件
COPY ./dist /app

# Stage 2
# 基于Nginx基础镜像
FROM nginx:alpine
 
# 设置工作目录
WORKDIR /app
 
# 将构建的React应用复制到Nginx服务目录
COPY --from=build-stage /app /usr/share/nginx/html

# 复制Nginx配置文件（如果有自定义配置）
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
# 暴露80端口
EXPOSE 80
 
# 启动Nginx并持续运行
CMD ["nginx", "-g", "daemon off;"]

