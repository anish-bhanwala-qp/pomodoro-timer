var START_BTN_ID = 'startBtn';
var STOP_BTN_ID = 'stopBtn';

function getBackgroundPage() {
    return chrome.extension.getBackgroundPage();
}

var showCountDown = function(value) {
    document.getElementsByTagName('span')[0].innerHTML = value;
}

var switchBtnDisabledStates = function() {        
    toggleButtonState(START_BTN_ID);
    toggleButtonState(STOP_BTN_ID);      
}

var toggleButtonState = function(id) {
    var btn = document.getElementById(id);
    btn.disabled = !btn.disabled;
}

function listener(event, value) {
    if (event === 'countDown') {
        showCountDown(value);
    } else if (event === 'state') {
        switchBtnDisabledStates();
    }    
}

    
function initApp() {
    showCountDown(getBackgroundPage().getCountDown());
    var startBtn = document.getElementById(START_BTN_ID);
    if (getBackgroundPage().isStarted() !== startBtn.disabled) {
        switchBtnDisabledStates();
    }

    getBackgroundPage().registerListener(listener);  

    startBtn.addEventListener('click', function() {
        getBackgroundPage().start();
    });
    document.getElementById(STOP_BTN_ID).addEventListener('click', function() {
        getBackgroundPage().stop();
    });
}

window.onload = initApp;