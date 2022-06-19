addEventListener("message", (event: MessageEvent) => {
  console.log("worker event message", event.target, event.type);
  postMessage(event.data);
});

export {}
