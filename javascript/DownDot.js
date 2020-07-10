

class DownDot {
  constructor({ matrix, context, row, col, color }) {
    this.matrix = matrix
    this.context = context
    this.row = row
    this.col = col
    this.color = color
  }

  moveDown = () => {
    if (this.canDown()) this.col++
  }

  moveHorizontal = (left) => {
    this.matrix[this.col][this.row] = 0

    this.row = left ? this.row - 1 : this.row + 1
    this.row = this.row < 0 ? 0 : this.row >= WIDTH_CONTAINER ? WIDTH_CONTAINER - 1 : this.row
    
    this.matrix[this.col][this.row] = _
  }

  canDown = () => {
    if (this.col >= HEIGHT_CONTAINER - 1) return false

    if (this.matrix[this.col + 1][this.row] === _) return false

    return true

  }

  resetMatrix() {
    this.matrix[this.col][this.row] = 0
  }

  draw = () => {
    this.context.fillStyle = this.color || CELL_COLOR
    this.context.fillRect(this.row * CELL_SIZE, this.col * CELL_SIZE, CELL_SIZE, CELL_SIZE)

  }

  update = (isForced = false) => {
    this.matrix[this.col][this.row] = 0
    if (isForced) this.col++
    else
      this.moveDown();
    this.matrix[this.col][this.row] = _

  }
}