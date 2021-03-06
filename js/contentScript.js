$(document).ready(function() {
  var feeds = findFeeds();

  jsonStr = JSON.stringify(feeds);
  chrome.extension.sendMessage({greeting: jsonStr});

  function findFeeds() {
  	var feeds = [];
    //Find all the RSS link elements
    $('link[rel=alternate]').filter('[type*="rss"],[type*="atom"],[type*="rdf"]').each(function() {
        feeds.push({
            type: 'rss',
            link: this.href
        });
    });
    $('meta[name="twitter:site"]').each(function() {
        feeds.push({
            type: 'twitter',
            link: this.content
        });
    });
    return feeds;
  }
});
