去中心化资料共享平台

# 前端仓库

## 容器化开发环境

### 构建镜像

```
docker build -t dfts-frontend .
```

### 编译 + 热重载（开发环境）

- 使用 Powershell 或 *nix 系统终端

  ```
  docker run -v "$(pwd):/app" -p 8080:8080 -t --rm dfts-frontend
  ```

- 使用命令提示符（cmd）

  ```
  docker run -v %cd%:/app -p 8080:8080 -t --rm dfts-frontend
  ```

## 传统开发环境

### 安装依赖项

```
yarn install
```

### 编译 + 热重载（开发环境）

```
yarn serve
```

### 编译 + 压缩（测试/生产环境）

```
yarn build
```

### 运行单元测试

```
yarn test:unit
```

### 运行 lint 工具并修复错误

```
yarn lint
```

### 更改配置

详见 [配置项参考](https://cli.vuejs.org/config/)。
