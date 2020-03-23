
/**
 * Manages requests spam, only will execute one at time.
 * 
 * If more than one request is sent to the caller, it will be queued.
 * Only the last request will be stored to be executed latter.
 * 
 */
var CallQueuer = (function () {
    var state = {};
    return function caller (call) {
        if (!call)
            return;

        if (state.onCall)
            return state.queuedCall = call;

        state.onCall = true;

        return call().then(function () {
            call = state.queuedCall;
            state.onCall = false;
            state.queuedCall = null;
            caller(call);
        });
    };
})();


/**
 * Mocked backend request.
 */
function request () {
    return new Promise(function (resolve) {
        setTimeout(() => resolve('Request done.'), 1000);
    }).then(console.warn);
};


/**
 * Secure request spamming.
 */
CallQueuer(request);
CallQueuer(request);
CallQueuer(request);
CallQueuer(request);
CallQueuer(request);
CallQueuer(request);
