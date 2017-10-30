var feeds = new Object();

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var obj = JSON.parse(request.greeting);
  	console.log(obj);
  	if (obj.length > 0) {
	  	feeds[sender.tab.id] = obj;
	  	//chrome.pageAction.show(sender.tab.id);
        chrome.browserAction.setBadgeText({
            tabId: sender.tab.id,
            text: '' + obj.length
        });
	  	console.log(feeds);
	  }
  });

function getFeeds(tabID) {
	return feeds[tabID];
}
