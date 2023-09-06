chrome.storage.sync.get(["newTabUrl"], function (result) {
  const newTabUrl = result.newTabUrl || "https://google.com"; // 默认网址
  window.location.href = newTabUrl; // 使用 href 属性来重定向
});
