// وضعیت پیش‌فرض افزونه (فعال)
let isEnabled = true;

// ذخیره وضعیت افزونه در localStorage مرورگر
chrome.storage.local.get("isEnabled", (data) => {
  isEnabled = data.isEnabled !== undefined ? data.isEnabled : false;
});

// تغییر وضعیت افزونه با کلیک روی آیکون
chrome.action.onClicked.addListener((tab) => {
  isEnabled = !isEnabled;
  chrome.storage.local.set({ isEnabled });

  // ارسال پیام به تب فعلی برای اطلاع از تغییر وضعیت
  chrome.tabs.sendMessage(tab.id, { isEnabled });

  // اگر افزونه فعال شد، فایل‌های CSS و JS را تزریق کن
  if (isEnabled) {
    injectContentScripts(tab.id);
  } else {
    // اگر افزونه غیرفعال شد، تغییرات CSS را حذف کن
    removeCSS(tab.id);
  }


});

// تزریق فایل‌های CSS و JS
function injectContentScripts(tabId) {
  chrome.scripting.insertCSS({
    target: { tabId },
    files: ["main.css"]
  });

  chrome.scripting.executeScript({
    target: { tabId },
    files: ["main.js"]
  });
}

// حذف فایل CSS
function removeCSS(tabId) {
  chrome.scripting.removeCSS({
    target: { tabId },
    files: ["main.css"]
  });
}
