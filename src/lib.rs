use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

extern crate wee_alloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Top,
    Right,
    Bottom,
    Left,
}

pub struct SnakeCell(usize);

pub struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    pub fn new(spawn_index: usize) -> Self {
        return Snake {
            body: vec![SnakeCell(spawn_index)],
            direction: Direction::Top,
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
    pub fn new(width: usize, spawn_index: usize) -> Self {
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

    pub fn change_direction(&mut self, new_direction: Direction) {
        self.snake.direction = new_direction;
    }

    pub fn crawl(&mut self) {
        let current_idx = self.snake_head_idx();
        let row = current_idx / self.width;
        let col = current_idx % self.width;

        if self.snake.direction == Direction::Right {
            let next_col = (col + 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_col;
        }

        if self.snake.direction == Direction::Left {
            let next_col = if col == 0 { self.width - 1 } else { col - 1 }; // Если текущая колонка 0, то следующая - самая правая, иначе - на одну меньше
            self.snake.body[0].0 = (row * self.width) + next_col;
        }

        if self.snake.direction == Direction::Top {
            let next_row = if row == 0 { self.width - 1 } else { row - 1 }; // Если текущая строка 0, то следующая - самая нижняя, иначе - на одну меньше
            self.snake.body[0].0 = (next_row * self.width) + col;
        }

        if self.snake.direction == Direction::Bottom {
            let next_row = (row + 1) % self.width;
            self.snake.body[0].0 = (next_row * self.width) + col;
        }
    }
}

// wasm-pack build --target web
