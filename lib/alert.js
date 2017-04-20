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
}

function check_page(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        verify(tab.url);
    })
}

// check when a user switches to a different tab
chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {
    check_page(tabId);
});

// check when a tab loads a url
// todo: if the user reopens a window that had several tabs (eg. recovering from
// a crash), then the user will get a sep. notification for each tab that has a
// punycode url loaded. this will be
// 1. spammy
// 2. ambiguous. the notifications assume the user is looking at the current tab
chrome.webNavigation.onCompleted.addListener(function(details) {
    check_page(details.tabId)
});

// todo: i'm not sure what use case this is covering
// chrome.extension.onMessage.addListener(function(request, sender) {
// 		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
// 				var current = tabs[0].url;
// 				verify(current);
// 		});
// });
