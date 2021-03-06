const TICK_INTERVAL = 250;

function lpad(n) {
    return (String(n).length === 1) ? `0${n}` : `${n}`;
}

function tick(startFrom) {
    let d = Date.now();
    let diff = d - startFrom;
    let minutes = Math.floor(diff / 1000 / 60);
    let seconds = Math.floor(diff / 1000) - minutes * 60;
    self.postMessage(`${lpad(minutes)}:${lpad(seconds)}`);
}

function onStart(message) {
    let now = Date.now();
    self.setInterval(() => tick(now), TICK_INTERVAL);
}

self.addEventListener('message', (evt) => {
    switch (evt.data) {
        case 'start':
            return onStart.call(onStart, evt.data);

        default:
            return;
    }
});
