const input = document.getElementById("input");
const list = document.querySelector(".file-data-screen");
const view = document.getElementById("view");
const read = document.querySelector(".file-read");
const textarea = document.getElementById("textarea");
const saveBtn = document.getElementById("save");
const saveBtn2 = document.getElementById("save2");

/**
 * 创建行
 * @param {string} label
 * @param {string} content
 */
function generateRow(label, content) {
  const div = document.createElement("div");
  div.classList.add("row");

  const labelDiv = document.createElement("div");
  labelDiv.classList.add("left");
  labelDiv.innerText = label;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("right");
  contentDiv.innerText = content;

  div.append(labelDiv, contentDiv);

  return div;
}

/**
 * 添加行
 * @param {string} label
 * @param {string} content
 * @param {Element} target
 */
function appendRow(label, content, target = list) {
  target.appendChild(generateRow(label, content));
}

function transformTime(time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

input.onchange = (e) => {
  // 清空 list
  clearList();
  // 目前只考虑单选
  const file = e.target.files[0];
  // 展示文件基本信息
  appendRow("文件名", file.name);
  appendRow("文件类型", file.type);
  appendRow("文件大小", file.size + "b");
  appendRow("最后更新时间", transformTime(file.lastModified));
  // 预览文件内容
  const fileURL = window.URL.createObjectURL(file);
  view.setAttribute("src", fileURL);
  window.URL.revokeObjectURL(fileURL);
  // 获取JSON内容
  const jsonRegex = new RegExp(/\.json$/);
  if (jsonRegex.test(file.name)) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const obj = JSON.parse(e.target.result);
      Object.keys(obj).forEach((key) => {
        appendRow(key, obj[key], read);
      });
    };
    fileReader.readAsText(file);
  }
};

// 保存
function saveFile(type) {
  const value = textarea.value;
  var blob = new Blob([value], { type: "text/plain;charset=utf-8" });
  switch (type) {
    case "file-save":
      saveAs(blob, "write.txt");
      break;
    default:
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.style.display = "none";
      a.download = "write1.txt";
      document.body.append(a);
      a.click();
      break;
  }
}
saveBtn.onclick = () => {
  saveFile("file-save");
};
saveBtn2.onclick = () => {
  saveFile("default");
};
