(($root, undefined) => {
    const SCRIPT_SOURCE = './src/timer.js';

    class Timer {
        constructor() {
            this.isWebWorkersSupported = (typeof Worker !== 'undefined');
            this.worker = null;
            this.setupWorker();
        }

        setupWorker() {
            if (!this.isWebWorkersSupported) {
                return console.log('%c😢 Web Workers are not supported...', 'color:#ff8b56');
            }

            if (this.worker === null) {
                this.createWorker();
            }
        }

        createWorker() {
            this.worker = new Worker(SCRIPT_SOURCE);
        }

        terminateWorker() {
            this.worker.terminate();
            this.worker = null;
        }

        onUpdate(fn) {
            this.worker.addEventListener('message', (evt) => fn.call(fn, evt.data));
        }

        onError(fn) {
            this.worker.addEventListener('error', (evt) => fn.call(fn, evt.data));
        }

        start() {
            this.setupWorker();
            this.worker.postMessage('start');
        }

        stop() {
            this.terminateWorker();
        }
    }

    $root.Timer = Timer;
})(window);
