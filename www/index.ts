import init, { World, Direction } from "rust_wasm";

init().then((_) => {
  const world = World.new(10, 32);
  const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  const worldWidth = world.width();

  const CELL_SIZE = 20;
  const WORLD_SIZE = world.width() * CELL_SIZE;

  canvas.height = WORLD_SIZE;
  canvas.width = WORLD_SIZE;

  function drawWorld() {
    ctx.beginPath();

    // Drawing horizontal lines
    const x = worldWidth * CELL_SIZE;
    for (let y = 0; y < worldWidth + 1; y++) {
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(x, y * CELL_SIZE);
    }

    // Drawing vertical lines
    const y = worldWidth * CELL_SIZE;
    for (let x = 0; x < worldWidth + 1; x++) {
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, y);
    }

    ctx.stroke();
  }

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log(key);
    switch (key) {
      case "ArrowUp":
        world.change_direction(Direction.Top);
        break;
      case "ArrowRight":
        world.change_direction(Direction.Right);
        break;
      case "ArrowDown":
        world.change_direction(Direction.Bottom);
        break;
      case "ArrowLeft":
        world.change_direction(Direction.Left);
        break;
    }
  });

  function drawSnake() {
    const headIdx = world.snake_head_idx();
    const rowIdx = headIdx % worldWidth;
    const colIdx = Math.floor(headIdx / worldWidth);

    ctx.beginPath();

    // TODO:
    // [ ] Fix the spawnIdx
    ctx.fillRect(rowIdx * CELL_SIZE, colIdx * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    ctx.stroke();
  }

  function paint() {
    drawWorld();
    drawSnake();
  }

  function update() {
    const fps = 5;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.crawl();
      paint();
      requestAnimationFrame(update);
    }, 1000 / fps);
  }

  paint();
  update();
});
