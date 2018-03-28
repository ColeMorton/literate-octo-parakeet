self.addEventListener("fetch", event => {
  const req = event.request;

  console.log("fetch-event", req);
});
