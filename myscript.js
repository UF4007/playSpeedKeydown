var video11 = document.getElementsByTagName('video')[0];
var lspeed1 = localStorage['playspeed-chrome-extension-speed'];
var key1 = localStorage['playspeed-chrome-extension-key'];
if (lspeed1 != null) video11.playbackRate = lspeed1;
document.onkeydown = (keyid) => {
    var speed11 = video11.playbackRate;
	key1 = localStorage['playspeed-chrome-extension-key'];
	if(keyid.keyCode == key1)
	{
		video11.playbackRate = 3;
	}
	else
	{
		switch (keyid.keyCode) {
		    case 219:
		        // TODO: decrease
		        speed11 -= 0.1;
		        video11.playbackRate = (speed11>0.3?speed11:0.3);
		        localStorage['playspeed-chrome-extension-speed'] = speed11;
		        break;
		    case 221:
		        // TODO: increase
		        speed11 += 0.1;
		        video11.playbackRate = (speed11<8?speed11:8);
		        localStorage['playspeed-chrome-extension-speed'] = speed11;
		        break;
		    case 187:
		        // TODO: normal
		        video11.playbackRate = 1;
		        localStorage['playspeed-chrome-extension-speed'] = speed11;
		        break;
		    default:
		        break;
		}
	}
}

document.onkeyup = (keyid) => {
	key1 = localStorage['playspeed-chrome-extension-key'];
	if(keyid.keyCode == key1)
	{
		video11.playbackRate = localStorage['playspeed-chrome-extension-speed'];
	}
}
