document.addEventListener("DOMContentLoaded", function () {
  const contentContainer = document.getElementById("content");
  const acceptButton = document.getElementById("acceptButton");

  //如果已经接受过协议直接跳转到setting.html
  chrome.storage.local.get(['accept'], (result) => {
    if (!result.accept) {

      // 接受声明，跳转设置页
      acceptButton.addEventListener("click", function () {
        chrome.storage.local.set({ 'accept': true }, () => {
          chrome.action.setPopup({ popup: 'html/settings.html' })
          fetch(chrome.runtime.getURL("html/settings.html"))
            .then((response) => response.text())
            .then((settingHtml) => {
              contentContainer.innerHTML = settingHtml
              initPage();
            })
        })
      });

      // 使用fetch API读取txt文件内容
      fetch(chrome.runtime.getURL("declaration.txt"))
        .then((response) => response.text())
        .then((data) => {
          // 将读取的内容显示在页面上
          const declarationContainer = document.getElementById("declaration");
          declarationContainer.innerHTML = data;
        })
        .catch((error) => {
          console.error("Error reading declaration.txt:", error);
        });
    }
  })
});
