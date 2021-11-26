const client = require("..");

client.on("threadCreate", (thread) => {
  if (thread.joinable()) {
    return thread.join();
  }
});
