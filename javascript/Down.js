class Down {
	constructor() {
		this.speedDown = DOWN_SPEED
		this.container = document.querySelector('#container')
		this.context = this.container.getContext('2d')

		this.matrix = []

		this.dots = []

		this.dot = null

		this.screen = new DownScreen(this)

		this.init()

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

		this.shapes = {
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

		this.dot = new DownDot({ ...this, row: 3, col: 0 })

		this.listenKeyBoardEvent()

		this.update()
	}

	listenKeyBoardEvent = () => {
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

	generateShape = () => {
		let _randomTypeShape = 'tzlv'.charAt(parseInt(Math.random() * 4))

		this.shape = {
			variant: this.shapes[_randomTypeShape][0],
			vetical: 0
		}
	}

	setAttribute = (target, attributes) => {
		for (let attribute in attributes) {
			target.setAttribute(attribute, attributes[attribute])
		}
	}

	checkShapeIsStopDownAtPos = () => {

	}

	draw = () => {
		this.context.clearRect(0, 0, WIDTH_CONTAINER * CELL_SIZE, HEIGHT_CONTAINER * CELL_SIZE)
		this.dot.draw()
		this.screen.draw()


	}

	update = () => {
		console.log(this);
		setInterval(() => {
			this.draw()
			this.dot.update()
			this.dots.forEach(dot => dot.update())
		}, this.speedDown)
	}

}

window.down = new Down()
