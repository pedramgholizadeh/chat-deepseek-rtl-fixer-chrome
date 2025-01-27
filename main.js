// دریافت وضعیت افزونه از Background Script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.isEnabled !== undefined) {
      applyChanges(message.isEnabled);
    }
  });
  
  // بررسی وضعیت افزونه هنگام لود صفحه
  chrome.storage.local.get("isEnabled", (data) => {
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    applyChanges(isEnabled);
  });
  
  // اعمال یا حذف تغییرات بر اساس وضعیت افزونه
  function applyChanges(isEnabled) {
    if (isEnabled) {
      // اعمال تغییرات CSS و JS
      document.body.style.direction = "rtl";
      document.body.style.textAlign = "right";
    } else {
      // حذف تغییرات
      document.body.style.direction = "";
      document.body.style.textAlign = "";
    }
  }