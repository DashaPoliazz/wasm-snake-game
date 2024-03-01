use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

extern crate wee_alloc;

// Using `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

// wasm-pack build --target web
