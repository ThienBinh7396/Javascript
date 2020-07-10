class DownBrick {
  constructor({ matrix, context }) {
    this.matrix = matrix
    this.context = context

    this.row = parseInt(Math.random() * (WIDTH_CONTAINER - 4))
    this.col = 0

    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]

    this.BRICKS = {
      o: {
        0: [
          [_, _],
          [_, _]
        ]
      },
      t: {
        0: [
          [_, _, _],
          [0, _, 0]
        ],
        1: [
          [0, _],
          [_, _],
          [0, _],
        ],
        2: [
          [0, _, 0],
          [_, _, _],
        ],
        3: [
          [_, 0],
          [_, _],
          [_, 0],
        ]
      },
      z: {
        0: [
          [_, 0],
          [_, _],
          [0, _]
        ],
        1: [
          [0, _, _],
          [_, _, 0]
        ]
      },
      l: {
        0: [
          [_, 0],
          [_, 0],
          [_, _]
        ],
        1: [
          [_, _, _],
          [_, 0, 0]
        ],
        2: [
          [_, _],
          [0, _],
          [0, _]
        ],
        3: [
          [0, 0, _],
          [_, _, _]
        ],
      },
      v: {
        0: [[_, _, _, _]],
        1: [
          [_],
          [_],
          [_],
          [_]
        ]
      }
    }


    this.brickGenerator()
  }

  brickGenerator = ( variantType = 0) => {
    let _brick, w, h;

    if(this.BRICK_TYPE){
      _brick = this.BRICKS[this.BRICK_TYPE][this.brick.type]
    
      console.log(_brick)

      w = _brick[0].length
      h = _brick.length

      for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
          if (_brick[i][j] instanceof DownDot) {
            this.matrix[_brick[i][j].col][_brick[i][j].row] = 0
          }
        }
      }

      console.table(this.matrix)

    }
    
    if(!this.BRICK_TYPE){
      this.BRICK_TYPE = 'otzlv'.charAt(parseInt(Math.random() * 5))
    }


    this.BRICK_TYPE_MAX = Math.max(...Object.keys(this.BRICKS[this.BRICK_TYPE]))

   _brick = this.BRICKS[this.BRICK_TYPE][variantType]

    console.log(variantType, this,_brick)

     w = _brick[0].length
     h = _brick.length

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
      type: variantType
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

  canMoveHorizontal = (left) => {
    let checkCol = left ? 0 : this.brick.variant[0].length - 1
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length


    console.log(checkCol)
    
    let checkDots = []

    for (let i = 0; i < h; i++) {

      if (left) { 
        for (let j = 0; j < w; j++) {
          if (this.brick.variant[i][j] instanceof DownDot) {
            checkDots.push(this.brick.variant[i][j])
            break;
          }
        }
      } else {
        for (let j = w - 1; j > -1; j--) {

          if (this.brick.variant[i][j] instanceof DownDot) {
            console.log('j: ', j, i)
            checkDots.push(this.brick.variant[i][j])
            break;
          }
        }
      }
    }

    for (let i = 0; i < checkDots.length ; i++) {
      let _dotRow = checkDots[i].row
      let _dotCol = checkDots[i].col
      if ((left && _dotRow === 0) || (!left && _dotRow === WIDTH_CONTAINER - 1)) {
        return false
      }

      if (left && this.matrix[_dotCol][_dotRow - 1] === _) return false
      if (!left && this.matrix[_dotCol][_dotRow + 1] === _) return false
    }
    return true
  }

  moveHorizontal = (left) => {
    let w = this.brick.variant[0].length
    let h = this.brick.variant.length

    if (!this.canMoveHorizontal(left)) {
      console.log(`Can't move horizontal!`)
      return
    }

    this.row = left ? this.row - 1: this.row + 1  

    for (let i = 0; i < h; i++) {
      if (left) {
        for (let j = 0; j < w; j++) {
          if (this.brick.variant[i][j] instanceof DownDot) {
            this.brick.variant[i][j].moveHorizontal(left)
          }
        }

      } else {
        for (let j = w - 1; j > -1; j--) {
          if (this.brick.variant[i][j] instanceof DownDot) {
            this.brick.variant[i][j].moveHorizontal(left)
          }
        }
      }
    }
  }

  transformVariantBrick = () => {
    let variantType = this.brick.type + 1
    if(variantType > this.BRICK_TYPE_MAX) variantType = 0

    this.brickGenerator( variantType)

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
    this.col++
  }
}
