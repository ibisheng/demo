# 毕升文档Api开发示例

Git pull代码后

#### 修改项目根目录下config.json

其中editorHost为毕升文档的地址，该值在demo中会用来拼接成使用毕升文档编辑文件或预览文件所需要的URL;

editorCaller为该demo运行所在的地址，该值在demo中会用来拼接为回调地址url，毕升文档从获取文件的URL，以及demo调用毕升文档是参数

apiKey为毕升文档api key，部署完毕升文档之后，可以从控制台许可信息中查询到该值。apiKey将被用来对调用参数进行Hmac md5签名。如果该值不对，调用文档时，将返回错误。

注意：配置文件url的值，需要使用demo服务器，毕升文档所在服务的IP,域名，主机名，不要使用localhost或者127.0.0.1。例如，我们在IP地址为192.168.2.40的服务上部署了毕升文档，在IP地址为192.168.2.66的服务傻姑娘运行demo，并且从毕升文档中获取了apikey，则有如下配置：

```json
{
	"editorHost": "http://192.168.2.40",
	"editorCaller": "http://192.168.2.66:9090",
    "apiKey":"45ae1f8b5d50ea9322a3d8e3326ca0f9"
}
```
![image-20190325220838352](https://public-bisheng.oss-cn-zhangjiakou.aliyuncs.com/resource/image-20190325220838352.png)

#### 修改毕升文档配置

为了使得调用毕升文档对文件进行编辑之后，编辑结果能够回调到demo服务器，需要在毕升文档的配置文件中增加配置项，以指明如果是API调用编辑，编辑完成之后应该调用哪个地址来对结果进行回存。

毕升文档的配置文件在你安装的毕升文档目录的 workspace/config/config.yml

![image-20190325220009021](https://public-bisheng.oss-cn-zhangjiakou.aliyuncs.com/resource/image-20190325220009021.png)

编辑config.yml，在配置文件中增加API回调

```yaml
apis:
   postapiurl: http://192.168.2.66:9090/api/file/saveBack
```

![image-20190325223245235](https://public-bisheng.oss-cn-zhangjiakou.aliyuncs.com/resource/image-20190325223245235.png)

修改毕升文档的配置之后，需要重启毕升文档服务

```shell
sh restart.sh
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

http://localhost:9090

