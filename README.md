> 测试过程中读取操作的文件都是 `JSON` 文件

## Log

- [x] 获取本地文件基本信息
- [x] 预览文件内容
- [x] 读取文件中的内容
- [x] 文件写入

## File Object

通过`<input type="file">` 得到的 `File` Object 有一下几个常用属性：

- name 
  - 文件名, `string`
- type
  - 文件类型,  `string`
- size
  - 文件大小, `string`, 以字节为单位
- lastModified
  - 上次更新时间, `number`, 以毫秒为单位



## 预览文件内容

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications) 中记录的最简单的方式就是通过 `<iframe>` 表示实现, 示例代码如下: 

```html
<input type="file" id="input">
<iframe id="view" src="" frameborder="0"></iframe>
```

```javascript
const input = document.getElementById("input");
const view = document.getElementById("view");

input.onchange = (e) => {
  const file = e.target.files[0];
  const fileURL = window.URL.create/ObjectURL(file);
  view.setAttribute('src', fileURL);
  window.URL.revokeObjectURL(fileURL)
};

```

大致思路如下:

- 通过 `<input>` 获得 `File` Object
- 通过 `window.URL.createObjectURL` 函数, 传入 `File` Object, 得到 `Blob` url
- 将 url 赋值给 `<iframe>` 的 `src` 属性, 这样就会实现文件内容的预览
- 最后用 `window.URL.revokeObjectURL` 释放 url

同理, 图片和音频等内容的预览也非常简单, 只要将 `<img>` 或 `<video>` 标签的 `src` 数学赋值 `Blob` url 即可.



## 读取文件内容

依靠 [File Reader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 实现, 使用起来也是非常简单, 实例代码如下:

```html
<input type="file" id="input">
```

```javascript
const input = document.getElementById("input");

input.onchange = (e) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
      // 文件的内容通过 e.target.result 得到
     console.log(e.target.result)
  };
  fileReader.readAsText(file);
};
```

大致思路:

- 通过 `<input>` 获得 `File` Object
- 设定 `onload` 函数, 当触发 `readAsText` 等函数的时候或处罚, 通过 `e.target.result` 获取文件内容



## 写入文件

### 使用 `FileSaver.js`

自己功力还不够, 没有办法自己用原生 JavaScript 写文件的写入, 目前先用 [FileSaver.js](https://github.com/eligrey/FileSaver.js) 实现写入, 后续看这个插件的源码, 研究一下原生实现方式.

这个插件的使用方式这里不作赘述.

#### 局限

这个写入和在服务端的写入不一样, 需要下载才能得到文件.
