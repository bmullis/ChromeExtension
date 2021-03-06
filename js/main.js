/*
** file: js/main.js
** description: javascript code for "html/main.html" page
*/

chrome.windows.getCurrent(function (currentWindow) {
	chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
		var activeTabID = activeTabs[0].id
		console.log(activeTabID);
		// Get the background page
		var background = chrome.extension.getBackgroundPage();
		var feeds = background.getFeeds(activeTabID);
		if (feeds) {
			var link;
			var name;
			var plural = '';
			if (feeds.length > 1) { plural = 's' };
			$('#feeds').append('<h2 id="sub-title">We found ' + feeds.length + ' feed' + plural +  ' on this site</h2>');
			$('#feeds').append('<h3 id="subsub-title">Click to choose the feeds you want to import into TX360:</h3>');
			$('#feeds').append('<div id="feed-results"></div>');
			$.each(feeds, function(key, val) {
				link = val.link;
				name = val.link;
				type = val.type;
				var image;
				if (type == 'twitter') {
					image = '../tweeterbird.png';
				} else {
					image = '../rss-icon.png';
				}
				if (name.length > 52) {
					name = name.slice(0,52) + '...';
				}
			  	$('#feed-results').append("<div class='feed-result'><img class='rss-icon' src='" + image + "'><div class='inner-feed-link'><a  href='" + link + "' class=\"rss\">" + name + "</a></div><img src='../images/green-check.png' class='check'></div>");
			});
			$('#feeds').append("<div class='import-btns'><a class='btn btn-md'>Import Selected Feeds</a></div>");
			$("#feeds a").click(function() {
				chrome.tabs.create({url: this.href});
			});
			$('.feed-result').on('click', function() {
				$(this).toggleClass('selected');
				$(this).children('.check').toggle();
			});
		} else {
			$('#feeds').append('<h2 id="sub-title">We couldn\'t find any feeds on this site.</h2>');
		}
	});
});
