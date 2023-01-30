FROM node:latest

# 镜像作者
LABEL maintainer="179570087@qq.com"  

# 制文件到容器里指定路径
COPY . /home/ad-video-player  

# 指定工作目录为，RUN/CMD 在工作目录运行
WORKDIR /home/ad-video-player  

# 指定环境变量 NODE_ENV 为 production
ENV NODE_ENV=production  

# 初始化项目
RUN npm install -f  

# 生成out
RUN tsc -p src

# 声明端口
EXPOSE 42986    

# 运行 node 项目 `$ node src/app.js`
CMD [ "node", "./out/web-server/index.js" ] 