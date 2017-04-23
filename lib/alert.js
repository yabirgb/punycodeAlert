notify = function(url){
	//Create notifications
	var alertTitle = "Caution! Is this your url?";
	var alertText = "The url that you are really accessing is ";

	new Notification(alertTitle, {
		icon: '/img/scan-128.png',
		body: alertText + url,
		tag: "punycode" //Using tags prevents multiple notifications
	});
}

function verify(url){
	var secure = true;
	var re = new RegExp('([a-z]{0,5}?:\/\/*)?(www.)?xn--*.*\/*');

	//If url maths regex
	if(re.test(url)){
		notify(url);
		secure = false;
	}

	//Show text also in extension icon
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
chrome.tabs.onActivated.addListener(function(info) {
    check_page(info.tabId);
});

//Check when a tab is loaded
chrome.webNavigation.onCompleted.addListener(function(details) {
    check_page(details.tabId)
});
