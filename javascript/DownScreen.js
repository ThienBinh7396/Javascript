class DownScreen {
  constructor({matrix, context}) {
    this.matrix = matrix
    this.context = context

    console.log(matrix)
  }

  drawGrid = () => {
    this.context.strokeStyle = LINE_COLOR

    for (let i = 0; i <= WIDTH_CONTAINER; i++) {
      this.context.beginPath()
      this.context.moveTo(i * CELL_SIZE, 0)
      this.context.lineTo(i * CELL_SIZE, HEIGHT_CONTAINER * CELL_SIZE)
      this.context.stroke()
    }
    for (let j = 0; j <= HEIGHT_CONTAINER; j++) {
      this.context.beginPath()
      this.context.moveTo(0, j * CELL_SIZE)
      this.context.lineTo(HEIGHT_CONTAINER * CELL_SIZE, j * CELL_SIZE)
      this.context.stroke()
    }
  }

  draw = () => {
    this.drawGrid()
  }
}
