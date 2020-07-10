class DownScreen {
  constructor({ context }) {
    this.context = context
    this.context.font = "13px Arial";
  }

  drawGrid = () => {
    this.context.fillStyle = '#222'
    this.context.strokeStyle = LINE_COLOR

    for (let i = 0; i <= WIDTH_CONTAINER; i++) {
      this.context.beginPath()
      this.context.moveTo(i * CELL_SIZE, 0)
      this.context.lineTo(i * CELL_SIZE, HEIGHT_CONTAINER * CELL_SIZE)
      this.context.stroke()

      if (i < WIDTH_CONTAINER)  
        this.context.fillText(i + 1, i * CELL_SIZE + CELL_SIZE / 2 - 3, HEIGHT_CONTAINER * CELL_SIZE + CELL_SIZE / 2)
    }
    for (let j = 0; j <= HEIGHT_CONTAINER; j++) {
      this.context.beginPath()
      this.context.moveTo(0, j * CELL_SIZE)
      this.context.lineTo(WIDTH_CONTAINER * CELL_SIZE, j * CELL_SIZE)
      this.context.stroke()

      if (j < HEIGHT_CONTAINER)  
        this.context.fillText(j + 1, WIDTH_CONTAINER * CELL_SIZE + CELL_SIZE / 2 - 3, j * CELL_SIZE + CELL_SIZE / 2 + 3)
    }
  }

  draw = () => {
    this.drawGrid()
  }
}
