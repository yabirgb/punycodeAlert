notify = function(url){
	var alertTitle = "Caution! Is this your url?";
	var alertText = "The url that you are really accessing is ";

	new Notification(alertTitle, {
		icon: '/img/scan-128.png',
		body: alertText + url,
	});
}

function verify(url){
	var secure = true;
	var re = new RegExp('([a-z]{0,5}?:\/\/*)?(www.)?xn--*.*\/*');

	if(re.test(url)){
		notify(url);
		secure = false;
	}

	if (secure == false){
		chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
		chrome.browserAction.setBadgeText({text: "Care"});
	}
	else{
		chrome.browserAction.setBadgeText({text: ""});
	}
};

chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {
    chrome.tabs.query({active: true}, function(tabs) {
        var current = tabs[0].url;
        verify(current);
    });
});

chrome.extension.onMessage.addListener(function(request, sender) {
		chrome.tabs.query({active: true}, function(tabs) {
				var current = tabs[0].url;
				verify(current);
		});
});
