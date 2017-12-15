var listeners = [];

function appState() {
    var started = false;
    var countDown = 25;  

    this.start = function() {
        started = true;
        setCountDown(25);                    
        notifyState('started');

        this.interval = setInterval(()=> {
            setCountDown(countDown - 1);                       
            if (countDown === 0) {
                this.stop();        
            }
            
            notifyCountdown();          
        }, 1000); 
    };

    this.stop = function() {      
        started = false;
        clearInterval(this.interval);
        setCountDown(25);  
        notifyCountdown();
        notifyState('stopped');
    };

    this.getCountDown = function() {
        return countDown;
    };

    this.isStarted = function() {
        return started;
    };

    function setCountDown(value) {
        countDown = value;
        chrome.browserAction.setBadgeText({text: String(countDown)});
    }

    function notify(event, value) {
        if (listeners.length) {
            listeners[0](event, value);
        }       
    };

    function notifyState(state) {
        notify('state', state);           
    };

    function notifyCountdown() {
        notify('countDown', countDown);           
    };
}

var state = new appState();

function getCountDown() {
    return state.getCountDown();        
}

function isStarted() {
    return state.isStarted();
}

function start() {
    state.start();
}

function stop() {
    state.stop();
}

function registerListener(listener) {
    listeners = [];
    listeners.push(listener);
}