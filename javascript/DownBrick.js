class DownBrick {
  constructor({ matrix, context }) {
    this.matrix = matrix
    this.context = context

    this.row = parseInt(Math.random() * (WIDTH_CONTAINER - 4))
    this.col = 0

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]

    this.initBrick()
  }

  initBrick = () => {
    
    let _randomTypeShape = 'tzlv'.charAt(parseInt(Math.random() * 4))
    
    let _brick = BRICKS[_randomTypeShape][0]
    
    let w = _brick[0].length
    let h = _brick.length
    
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (_brick[i][j] === _) {
          _brick[i][j] = new DownDot({
            matrix: this.matrix,
            context: this.context,
            row: this.row + j,
            col: this.col + i,
            color: this.color
          })

          this.matrix[this.col + i][this.row + j] = _
        }
      }
    }

    this.brick = {
      variant: _brick,
      type: 0
    }
  }

  canDown = () => {
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length

    for (let j = 0; j < w; j++) {
      let _brickLastInCol = null

      for (let i = h - 1; i >= 0; i--) {
        if (this.brick.variant[i][j] instanceof DownDot) {
          _brickLastInCol = this.brick.variant[i][j]
          break;
        }
      }

      if (_brickLastInCol && !_brickLastInCol.canDown()) {
        return false
      }
    }
    return true;
  }

  getDots = () => {
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length

    let arr = []

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.brick.variant[i][j] instanceof DownDot) {
          arr.push(this.brick.variant[i][j])
        }
      }
    }

    return arr
  }

  draw() {
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (this.brick.variant[i][j] instanceof DownDot) {
          this.brick.variant[i][j].draw()
        }
      }
    }

  }

  update() {
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length

    for (let i = h - 1; i >= 0; i--) {
      for (let j = 0; j < w; j++) {
        if (this.brick.variant[i][j] instanceof DownDot) {
          this.brick.variant[i][j].update(true)
        }
      }
    }
  }
}
