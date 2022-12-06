# 模版为Restful接口型服务

## 引入的功能
- mysql
- redis
- typeorm
- cache-manager
- cos-nodejs-sdk-v5
- swagger
- pm2
- sentry
- passport-local
- passport-jwt

> 使用前首先要配置好.config的环境变量，并启动本地的mysql，redis。如果不需要可以删除CacheModule以及typeorm的相关代码

## 使用腾讯云需要配置helper/cos/constants.ts文件

## mysql，redis，nginx的配置文件以及导出导出卷的项目
[https://github.com/guiqide/docker-volumes](https://github.com/guiqide/docker-volumes)
## mysql的container创建命令
mysql
docker run -d -p 3306:3306 \
--name mysql8 \
-e MYSQL_ROOT_PASSWORD=123456 \
-v /Users/guiqide/files/github/project-docker/mysql-volume/my.cnf:/etc/my.cnf \
-v /Users/guiqide/files/github/project-docker/mysql-volume/conf.d:/etc/mysql/conf.d \
-v /Users/guiqide/files/github/project-docker/mysql-volume/data:/var/lib/mysql mysql

## redis的container创建命令
docker run -p 6379:6379 -e TZ=Asia/Shanghai -v /Users/guiqide/files/github/project-docker/redis-volume/conf:/usr/local/etc/redis -v /Users/guiqide/files/github/project-docker/redis-volume/data:/data --name project-redis redis redis-server /usr/local/etc/redis/redis.conf

// 启动镜像
docker start containerId

## nginx的创建命令
docker run --name nginx -p 80:80 -v /Users/guiqide/files/github/project-docker/nginx-volume/nginx.conf:/etc/nginx/nginx.conf -v /Users/guiqide/files/github/project-docker/nginx-volume/log:/var/log/nginx -v /Users/guiqide/files/github/project-docker/nginx-volume/conf.d:/etc/nginx/conf.d -d nginx

## k8s
```
docker image build . --tag server-api:tag // 打包镜像
docker run -p 3000:3000 -d server-api:tag  // 执行包
docker exec -it containerId bash pm2 logs // 查看日志
docker exec -it containerId bash
```