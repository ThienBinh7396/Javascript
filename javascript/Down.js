class Down {
	constructor() {
		this.speedDown = DOWN_SPEED
		this.container = document.querySelector('#container')
		this.context = this.container.getContext('2d')

		this.timer = null;

		this.matrix = []

		this.dots = []

		this.screen = new DownScreen({
			context: this.context
		})

		this.init()

		window.matrix = this.matrix
	}

	init = () => {
		let arr;

		for (let i = 0; i < HEIGHT_CONTAINER; i++) {
			arr = Array(WIDTH_CONTAINER).fill(0)
			this.matrix.push(arr)
		}

		console.table(this.matrix)

		this.setAttribute(this.container, {
			width: WIDTH_CONTAINER * CELL_SIZE,
			height: HEIGHT_CONTAINER * CELL_SIZE
		})

		this.listenKeyBoardEvent()

		this.generateBrick()

		this.infiniteLoop()
	}

	listenKeyBoardEvent = () => {
		let _self = this
		document.getElementById('start').addEventListener('click', (e) => {
			_self.start()

		})
		document.getElementById('stop').addEventListener('click', (e) => {
			_self.stop()

		})

		document.addEventListener('keyup', (e) => {
			switch (e.keyCode) {
				case 39:
					this.dot.moveHorizontal(false)
					break
				case 37:
					this.dot.moveHorizontal(true)
					break;
			}

			this.draw()
		})
	}

	setAttribute = (target, attributes) => {
		for (let attribute in attributes) {
			target.setAttribute(attribute, attributes[attribute])
		}
	}

	generateBrick = () => {
		this.brick = null
		this.brick = new DownBrick({
			matrix: this.matrix,
			context: this.context
		})

	}

	removeLine = (line) => {
		for (let j = line; j >= 0; j--) {
			for (let i = 0; i < WIDTH_CONTAINER; i++) {
				if (j === 0) {
					this.matrix[j][i] = 0
				} else {
					if (this.matrix[j][i] !== this.matrix[j - 1][i]) {
						this.matrix[j][i] = this.matrix[j - 1][i]
					}
				}
			}
		}
		let i = 0;

		while (i < this.dots.length) {
			if (this.dots[i].col === line) {
				this.dots.splice(i, 1)
				continue
			}
			else {
				this.dots[i].col++
			}
			i++

		}
	}

	checkFullLine = () => {
		let checkLine

		for (let j = HEIGHT_CONTAINER - 1; j >= 0; j--) {
			checkLine = true

			for (let i = 0; i < WIDTH_CONTAINER; i++) {
				if (this.matrix[j][i] !== _) checkLine = false
			}

			if (checkLine) {
				console.log(j)

				this.removeLine(j)
			}
		}

	}

	checkGameOver = () => {
		for (let i = 0; i < WIDTH_CONTAINER; i++) {
			if (this.matrix[0][i] === _) return true

		}
		return false
	}

	draw = () => {
		this.context.clearRect(0, 0, WIDTH_CONTAINER * CELL_SIZE, HEIGHT_CONTAINER * CELL_SIZE)

		if (this.brick) this.brick.draw()

		this.dots.forEach(dot => dot.draw())

		this.screen.draw()
	}

	update = () => {
		if (this.brick.canDown()) {
			this.brick.update()
		}
		else {
			console.log(this.brick)
			this.dots = [...this.dots, ...this.brick.getDots()]
			// this.checkFullLine()
			this.generateBrick()

		}

		this.draw()

	}

	stop = () => {
		if (this.timer) clearInterval(this.timer)

	}

	start = () => {
		this.infiniteLoop()
	}

	infiniteLoop = () => {
		if (this.timer) clearInterval(this.timer)

		this.timer = setInterval(() => {
			this.update()

		}, this.speedDown)
	}
}

window.down = new Down()
