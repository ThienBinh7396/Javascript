class Down {
	constructor() {
		this.speedDown = DOWN_SPEED
		this.container = document.querySelector('#container')
		this.context = this.container.getContext('2d')

		this.start = this.start.bind(this)

		this.stop = this.stop.bind(this)

		this.score = 0

		this.timer = null;

		this.keyDownTimer = null

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
			width: WIDTH_CONTAINER * (CELL_SIZE + 3),
			height: HEIGHT_CONTAINER * (CELL_SIZE + 2)
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

		document.addEventListener('keydown', (e) => {
			console.log(e.keyCode)

			switch (e.keyCode) {
				case 32: 
					this.brick.transformVariantBrick()
					break
				case 39:
					this.brick.moveHorizontal(false)
					break
				case 37:
					this.brick.moveHorizontal(true)
					break;
				case 40:
					this.fastSpeedDown()
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
		this.brick = new DownBrick({
			matrix: this.matrix,
			context: this.context
		})

		window.brick = this.brick

	}

	removeLine = (line) => {
		console.log('LINE: ', line)
		for (let j = line; j > -1	; j--) {
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
				this.dots.splice(i, 1);
				continue
			}
			if(this.dots[i].col > line) {
				i++
				continue
			}
			this.dots[i].col++
			i++
		}
	}

	checkFullLine = () => {
		let checkLine

		let j = HEIGHT_CONTAINER - 1;

		while (j > -1) {
			checkLine = true	

			for (let i = 0; i < WIDTH_CONTAINER; i++) {
				if (this.matrix[j][i] !== _) checkLine = false
			}

			if (checkLine) {
				console.log(j)
				this.score ++;
				this.removeLine(j)
				continue
			}

			j--
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
			if(this.checkGameOver()) {
				alert(this.score)
				this.stop()

				window.location.href = this.container.toDataURL("image/png").replace("image/png", "image/octet-stream");
			}
		}
		else {
			console.log(this.brick)
			this.dots = [...this.dots, ...this.brick.getDots()]
			this.checkFullLine()
			this.generateBrick()
			this.resetSpeedDown()
		}

		this.draw()

	}

	stop = () => {
		if (this.timer) clearInterval(this.timer)

	}

	start = () => {
		this.infiniteLoop()
	}

	fastSpeedDown = () => {
		this.speedDown = 0
		this.infiniteLoop()
	}
	resetSpeedDown = () => {
		if(this.speedDown !== DOWN_SPEED){
			this.speedDown = DOWN_SPEED
			this.infiniteLoop()
		}

	}

	infiniteLoop = () => {
		if (this.timer) clearInterval(this.timer)

		this.timer = setInterval(() => {
			this.update()

		}, this.speedDown)
	}
}

window.down = new Down()
