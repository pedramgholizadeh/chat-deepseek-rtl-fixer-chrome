// دریافت وضعیت فعلی افزونه
chrome.storage.local.get("isEnabled", (data) => {
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    updateButton(isEnabled);
  });
  
  // تغییر وضعیت افزونه با کلیک روی دکمه
  document.getElementById("toggleButton").addEventListener("click", () => {
    chrome.storage.local.get("isEnabled", (data) => {
      const isEnabled = !data.isEnabled;
      chrome.storage.local.set({ isEnabled });
  
      // ارسال پیام به تب فعلی برای اطلاع از تغییر وضعیت
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { isEnabled });
  
        // اگر افزونه فعال شد، فایل‌های CSS و JS را تزریق کن
        if (isEnabled) {
          injectContentScripts(tabId);
        } else {
          // اگر افزونه غیرفعال شد، تغییرات CSS را حذف کن
          removeCSS(tabId);
        }
  
      });
  
      // به‌روزرسانی دکمه
      updateButton(isEnabled);
    });
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
  
  // به‌روزرسانی متن دکمه
  function updateButton(isEnabled) {
    const button = document.getElementById("toggleButton");
    button.textContent = isEnabled ? "Disable" : "Enable";
  }