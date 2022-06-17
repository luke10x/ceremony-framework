const ctx: SharedWorker = self as unknown as SharedWorker;

const allPorts: MessagePort[] = [];



/* @ts-ignore */
ctx.onconnect = function(e: MessageEvent) {
  console.log('ww', e);
  // the incoming port
  var port = e.ports[0];
  allPorts.push(port);

  port.addEventListener('message', function(e) {

  console.log('rrww', e, port);

    // get the message sent to the worker
    var message = e.data[0];
    // send the message to ALL connected worker ports!
    allPorts.forEach(port => {
      port.postMessage(message);
    })
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}

export {}
