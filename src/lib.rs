use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

extern crate wee_alloc;

// Using `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

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
