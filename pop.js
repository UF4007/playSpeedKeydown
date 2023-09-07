var sp, disp, lsp, ldisp, state, lstate, ks;
var isSetting;

function applyChange(id, val) {
	localStorage.setItem('playspeed-chrome-extension-'+id, val);
	disp.value = val;
	chrome.runtime.sendMessage({what:""+id, value:""+val});
}

// set current values in popup.html
function initPreset() {
	sp = document.getElementById('speed');
	disp = document.getElementById('display');
	lsp = localStorage.getItem('playspeed-chrome-extension-speed');
	state = document.getElementById('state');
	ks = document.getElementById('keytest');
	if (lsp != null) {
		sp.value = lsp;
		disp.value = lsp;
	}
}

// 
function changePlaySpeed(temp_state) {
	state.checked = !temp_state;
	var list1 = document.getElementsByClassName('container');
	var val = "";
	if (temp_state) {
		applyChange('speed', 1);
		applyChange('display', 1);
		val = "none";
	}
	else {
		applyChange('speed', sp.value);
		applyChange('display', sp.value);
		val = "block";
	}
	list1[0].style.display = val;
}

// add input listeners to color-input elements
function initListeners() {
	sp.addEventListener('input', function () {
		applyChange('speed', sp.value);
	});
	disp.addEventListener('input', function () {
		applyChange('display', sp.value);
	});
	state.addEventListener('change', function () {
		if (this.checked) {
			localStorage.setItem('playspeed-chrome-extension-state', 'enabled');
			changePlaySpeed(false);
		} else {
			localStorage.setItem('playspeed-chrome-extension-state', 'disabled');
			changePlaySpeed(true);
		}
	});
	ks.addEventListener('click', function () {
		ks.textContent = "press a key to set";
		isSetting = true;
	});
}


window.onload = (function () {
	initPreset();
	initListeners();
	
	var result = localStorage.getItem('playspeed-chrome-extension-state');
	if (result == "enabled") {
		changePlaySpeed(false);
	}
	else {
		changePlaySpeed(true);
	}
	result = localStorage.getItem('playspeed-chrome-extension-key');
	chrome.runtime.sendMessage({what:"key", value:""+result});
});

document.onkeydown = (keyid) => {
	key1 = localStorage['playspeed-chrome-extension-key'];
	if(isSetting)
	{
		localStorage.setItem('playspeed-chrome-extension-key', keyid.keyCode);
		chrome.runtime.sendMessage({what:"key", value:""+keyid.keyCode});
	}
}

document.onkeyup = (keyid) => {
	if(isSetting)
	{
		isSetting = false;
		ks.textContent = "Select Accl Key";
	}
}
