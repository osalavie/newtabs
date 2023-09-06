// 从存储中获取已保存的网址
function initPage() {
    chrome.storage.local.get(["accept"], function (result) {
        if (!result.accept) {
            chrome.action.setPopup({ popup: 'html/popup.html' })
        }
    });
    const inputElement = document.getElementById("newTabUrl");
    const saveButton = document.getElementById("saveButton");

    // 从存储中获取已保存的网址
    chrome.storage.sync.get(["newTabUrl"], function (result) {
        if (result.newTabUrl) {
            inputElement.value = result.newTabUrl;
        }
    });

    // 保存新的网址
    saveButton.addEventListener("click", function () {
        const newTabUrl = inputElement.value;
        chrome.storage.sync.set({ newTabUrl: newTabUrl }, function () {
            // 通知用户保存成功
            window.close();
        });
    });
}
