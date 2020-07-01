class DownDot{
  constructor({matrix, dots, context, row, col}){
    this.dots = dots
    this.matrix = matrix
    this.context = context
    this.row = row
    this.col = col

  }

  moveDown = () => {
    if(this.canDown()) this.col++
  }

  moveHorizontal = (left) => {
    this.row = left ? this.row - 1 : this.row + 1
    this.row = this.row < 0 ? 0 : this.row >= WIDTH_CONTAINER ? WIDTH_CONTAINER - 1: this.row 
  }

  canDown = () => {
    if(this.col >= HEIGHT_CONTAINER - 1) return false
    
    if(this.matrix[this.col][this.row] === _) return false

    return true

  }

  draw = () => {
    this.context.fillStyle = CELL_COLOR
    this.context.fillRect(this.row * CELL_SIZE, this.col * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  }

  update = () => {
    this.matrix[this.col][this.row] = 0
    this.moveDown();
    this.matrix[this.col][this.row] = _

  }
}