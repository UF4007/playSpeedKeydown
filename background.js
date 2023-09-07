chrome.runtime.onInstalled.addListener(function() {
	localStorage.setItem('playspeed-chrome-extension-state', 'enabled');
});

chrome.runtime.onMessage.addListener(
function(message, sender, response) {
  if (message.greeting == "hi"){
    chrome.tabs.executeScript({
      code: 'console.log(\''+message.greeting+'\')'
    });
} else if (message.what == "speed"){
	chrome.tabs.executeScript({
		code: 'localStorage.setItem(\'playspeed-chrome-extension-speed\', \''+message.value+'\'); var list1 = document.querySelector(\'video\').playbackRate =  '+message.value+'; '
	});
} else if (message.what == 'key'){
	chrome.tabs.executeScript({
		code: 'localStorage.setItem(\'playspeed-chrome-extension-key\', \''+message.value+'\');'
	});
}
});
