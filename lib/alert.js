chrome.tabs.onUpdated.addListener(function (tabs, info) {
	var secure = true;
	var re = new RegExp('([a-z]{0,5}?:\/\/*)?(www.)?xn--*.*\/*');
	chrome.tabs.get(tabs, function(tab){
		if(re.test(tab.url) == true && tab.status == 'complete'){
			alert("This site url is encoded using punycode!");
			secure = false;
		}

		if (secure == false){
		chrome.browserAction.setBadgeBackgroundColor({ color: [122, 186, 122, 255] });
		chrome.browserAction.setBadgeText({text: "!"});
		}
		else{
		chrome.browserAction.setBadgeText({text: ""});
		}
	});
});

