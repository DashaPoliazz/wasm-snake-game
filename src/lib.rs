use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) {
    unsafe {
        alert(name);
    }
}

#[wasm_bindgen]
// Imlementation of this fn will be provided by
// javascript
extern "C" {
    pub fn alert(s: &str);
}

// wasm-pack build --target web
