document.getElementById("getTitle").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getTitle" }, (response) => {
        document.getElementById("output").innerText = response.title || "No title found";
      });
    });
  });
  
  // Handle messages from content script (optional)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message from content script:", message);
  });