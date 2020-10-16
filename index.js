const input = document.getElementById("input");
const list = document.querySelector(".file-data-screen");
const view = document.getElementById("view");

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
 */
function appendRow(label, content) {
  list.appendChild(generateRow(label, content));
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

  appendRow("文件名: ", file.name);
  appendRow("文件类型", file.type);
  appendRow("文件大小", file.size + "b");
  appendRow("最后更新时间", transformTime(file.lastModified));

  const fileURL = window.URL.createObjectURL(file);
  view.setAttribute("src", fileURL);
  window.URL.revokeObjectURL(fileURL);
};
