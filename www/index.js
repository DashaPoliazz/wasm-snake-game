import init, { World } from "rust_wasm";

init().then((_) => {
  const world = World.new(10);
  console.log(world);
  const canvas = document.getElementById("snake-canvas");
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

  drawWorld();
});
