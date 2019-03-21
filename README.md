# 毕升文档Api开发示例

Git pull代码后

#### 修改项目根目录下config.json

设置上编辑器服务器的Host，以及供编辑器回调的本机服务器Host,例:
```json
{
	"editorHost": "http://localhost:5500",
	"editorCaller": "http://localhost:8080"
}
```
#### 修改编辑器server的回调配置

打开您部署好的毕升文档server下的connection/config.yml

修改为本项目server的回调url,例:

```yaml
postapiurl:  http://localhost:8080/api/file/saveBack
```

#### 添加供测试的ms office文件

在项目根目录/storage下拷贝您要编辑的文件

#### 运行项目

```bash
npm install

npm run build

npm run server
```

然后浏览器打开

http://localhost:8080

