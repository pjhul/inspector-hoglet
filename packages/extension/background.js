chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "posthog",
    contexts: ["selection"],
    title: "Lookup this email in PostHog",
    type: "normal",
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.selectionText) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      args: [info.selectionText],
      func: (email) => {
        if (!document.getElementById("posthog-panel")) {
          const frame = document.createElement("iframe");
          frame.src = `https://inspector-hoglet.vercel.app/?email=${email}`;
          frame.id = "posthog-panel";
          frame.style.width = "400px";
          frame.style.position = "fixed";
          frame.style.right = 0;
          frame.style.top = 0;
          frame.style.bottom = 0;
          frame.style.height = "100%";
          frame.style.border = "";
          frame.style.zIndex = 99999;

          document.body.appendChild(frame);
        }
      },
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "save-prefs") {
  } else if (message.type === "get-defs") {
  }
});
