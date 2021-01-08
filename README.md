去中心化资料共享平台

# 前端仓库

## 容器化开发环境

### 构建镜像

```
docker build -t dfts-frontend .
```

在 Windows 平台上，请使用 PowerShell 执行以下命令；如果使用的是命令提示符（cmd）则需要将命令中的 `-v "$(pwd):/app"` 替换为 `-v %cd%:/app`。

### 安装依赖项

```
docker run -v "$(pwd):/app" -t --rm dfts-frontend install
```

### 编译 + 热重载（开发环境）

```
docker run -v "$(pwd):/app" -p 8080:8080 -t --rm dfts-frontend
```

## 传统开发环境

### 安装yarn

```
npm install -g yarn
```

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
