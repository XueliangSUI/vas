var app = new Vue({
	el: "#app",
	data() {
		return {
			inputNum: 21,
			cellsList: [],
			fontSize: '',
			width: '',
			gradientColorArr: [],
			colorOptionsArr: [
				['#feca57', '#ee5253'],
				['#48dbfb', '#5f27cd'],
				['#badc58', '#10ac84'],
				['#c7ecee', '#f368e0']
			],
			index: 0,
			stepLength: 0,
			stepLengthThisTurn: 0,
			turn: 1,
			group: 0,
			cellsGroup: [],
			timer: 0,
			speedUpText: '超级加速'

		}
	},
	mounted: function() {
		this.initCells()
	},
	methods: {
		/**
		 * 初始化排序（洗牌）
		 */
		initCells: function() {
			// 输入数值过大提示
			this.inputNumRemind()
			// 初始化颜色
			let colorSelected = Math.floor(Math.random() * this.colorOptionsArr.length)
			this.gradientColorArr = new gradientColor(this.colorOptionsArr[colorSelected][0], this.colorOptionsArr[
				colorSelected][1], this.inputNum);
			// 初始化字号
			this.fontSize = 60 / this.inputNum + 'vmin'
			// 初始化宽度
			this.cellsList = []
			// 创建数组
			for (let i = 0; i < this.inputNum; i++) {
				this.cellsList.push({
					text: i + 1,
					height: 15 + i * 40 / this.inputNum + 'vmin',
					width: 96 / this.inputNum * 0.9 + 'vmin',
					margin: 96 / this.inputNum * 0.05 + 'vmin',
					fontSize: this.fontSize,
					backgroundColor: this.gradientColorArr[i]
				})
			}
			// 数组乱序
			for (let i = 0; i < this.inputNum; i++) {
				let tIndex = Math.floor(Math.random() * this.inputNum)
				let tObj = this.cellsList[i]
				this.cellsList[i] = this.cellsList[tIndex]
				this.cellsList[tIndex] = tObj
			}
			this.stepLength = Math.floor(this.cellsList.length / 2)


		},
		/**
		 * 下一步
		 */
		nextStep: function() {
			// 下一组
			this.group++
			if (this.stepLength < 1) {
				// 结束
				clearInterval(this.timer)
				this.timer = 0
				this.speedUpText = '超级加速'
				this.stepLength = 0
				this.group--
				msgQueue.pushMsgQueue({
					text: '希尔排序已完成'
				})
				return
			} else if (this.stepLength >= 1) {
				// 排序过程中
				// this.stepLength = Math.floor(this.cellsList.length / 2)
				this.cellsGroup = []

				if (this.group <= this.stepLength) {
					// 继续排序
					for (let i = this.index; i < this.cellsList.length; i += this.stepLength) {
						this.cellsGroup.push(i)
						// //console.log(i)
					}
					this.insertionSortForGroup()
					this.index++
				} else if (this.group > this.stepLength) {
					this.group = 0
					this.index = 0
					// 本轮排序结束，进入下一轮
					this.stepLength = Math.floor(this.stepLength / 2)
					//console.log(' 本轮排序结束，进入下一轮')
					this.turn++
				}


			}

			// //console.log(this.cellsGroup, this.stepLength, this.cellsList)
		},
		insertionSortForGroup() {

			for (let i = 1; i < this.cellsGroup.length; i++) {
				var tCell = this.cellsList[this.cellsGroup[i]]
				// this.cellsList.splice([this.cellsGroup[i]], 1)
				for (let j = i - 1; j >= 0; j--) {
					//console.log(i, j, this.cellsList)
					//console.log(this.cellsList[this.cellsGroup[i]].text, this.cellsList[this.cellsGroup[j]].text)
					this.exchangeCells(i, j, tCell)
					//console.log(this.cellsList[this.cellsGroup[i]].text, this.cellsList[this.cellsGroup[j]].text)
					if (this.cellsList[this.cellsGroup[i]].text < this.cellsList[this.cellsGroup[j]].text) {
						this.cellsList[this.cellsGroup[i]] = this.cellsList[this.cellsGroup[j]]
						this.cellsList[this.cellsGroup[j]] = tCell
					} else if (this.cellsList[this.cellsGroup[
							i]].text > this.cellsList[this.cellsGroup[j]].text) {

					}
				}
			}

		},
		exchangeCells(index_i, index_j, tCell) {
			//console.log('index_i', index_i, 'index_j', index_j)
			if (this.cellsList[this.cellsGroup[index_i]].text < this.cellsList[this.cellsGroup[index_j]].text) {
				this.cellsList[this.cellsGroup[index_i]] = this.cellsList[this.cellsGroup[index_j]]
				this.cellsList[this.cellsGroup[index_j]] = tCell
			}
			if (index_j >= 1) {

				this.exchangeCells(index_j, index_j - 1, tCell)
			}
		},
		reset() {
			let tInputNum = this.inputNum
			clearInterval(this.timer)
			Object.assign(this.$data, this.$options.data())
			this.inputNum = tInputNum
			this.initCells()
		},
		// 超级加速
		speedUp() {
			if (!this.timer) {
				this.speedUpText = '暂停'
				this.timer = setInterval(() => {
					this.nextStep()
				}, 30)
			} else {
				clearInterval(this.timer)
				this.timer = 0
				this.speedUpText = '超级加速'
			}





		},
		// 失焦
		onBlur() {
			if (this.inputNum < 5) {
				this.inputNum = 5
			} else if (this.inputNum > 999) {
				this.inputNum = 999
			}
			this.reset()
		},
		// 输入长度提醒
		inputNumRemind() {
			if (this.inputNum > 499) {

				msgQueue.pushMsgQueue({
					backgroundColor: '#ee4d52',
					color: '#ffffff',
					duration: 20000,
					title: 'CPU警告：',
					text: '我们可能不是人'
				})

			} else if (this.inputNum > 200) {
				msgQueue.pushMsgQueue({
					text: '数组过长，渲染过程中可能产生卡顿'
				})
			}
		}

	}
})
