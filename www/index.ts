import init, { World } from "rust_wasm";

init().then((_) => {
  const world = World.new(10);
  console.log(world);
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

  function drawSnake() {
    const headIdx = world.snake_head_idx();
    const rowIdx = headIdx % worldWidth;
    const colIdx = Math.floor(headIdx / worldWidth);
    console.log(headIdx);

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
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      world.crawl();
      paint();
      requestAnimationFrame(update);
    }, 300);
  }

  paint();
  update();
});
