use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

extern crate wee_alloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

pub struct SnakeCell(usize);

pub struct Snake {
    body: Vec<SnakeCell>,
}

impl Snake {
    pub fn new(spawn_index: usize) -> Self {
        return Snake {
            body: vec![SnakeCell(spawn_index)],
        };
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize) -> Self {
        let spawn_index = World::calc_spawn_index(width);

        return World {
            width,
            snake: Snake::new(spawn_index),
        };
    }

    pub fn width(&self) -> usize {
        return self.width;
    }

    pub fn snake_head_idx(&self) -> usize {
        return self.snake.body[0].0;
    }

    pub fn crawl(&mut self) {
        let new_position = self.snake_head_idx() + 1;
        let last_index = self.width * self.width;
        self.snake.body[0].0 = new_position % last_index;
    }

    fn calc_spawn_index(width: usize) -> usize {
        return (width * width) / 2;
    }
}

// wasm-pack build --target web
