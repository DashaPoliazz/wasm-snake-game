import init, { greet } from "rust_wasm";

init().then((_) => {
  greet("something");
});
