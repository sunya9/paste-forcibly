chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab) return;
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.focus();
  document.execCommand("paste");
  const text = textarea.value;
  document.body.removeChild(textarea);
  const tabId = tab.id;
  if (!tabId) return;
  chrome.tabs.sendMessage(tabId, text);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: chrome.runtime.id,
    title: "Paste forcibly",
    type: "normal",
    contexts: ["editable"],
  });
});
