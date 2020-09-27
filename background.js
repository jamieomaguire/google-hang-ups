chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    const urlPattern = /(http[s]?:\/\/)(meet.google.com)(\/)(.*)/
  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      if (currentTab) { 
        if (currentTab.url.match(urlPattern)) {
          chrome.tabs.query({url: 'https://meet.google.com/*'}, (tabs) => {
            if (tabs && tabs.length) {
              const tabsToRemove = tabs.map(t => t.id).filter(id => id !== currentTab.id)
              chrome.tabs.remove(tabsToRemove)
            }
          });
        }
      }
    });
  }
});
