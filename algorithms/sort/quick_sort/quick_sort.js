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
			nextStepMode: 1,
			key: null,
			i: null,
			j: null,
			progressWidth: '0vmin',
			turn: 0,
			groupArr: [],
			groupIndex: 0,
			timer: null,
			speedUpText: '超级加速'

		}
	},
	mounted: function () {
		this.initCells()
	},
	methods: {
		/**
		 * 初始化排序（洗牌）
		 */
		initCells: function () {
			// 输入数值过大提示
			this.inputNumRemind()
			// 初始化颜色
			let colorSelected = Math.floor(Math.random() * this.colorOptionsArr.length)
			this.gradientColorArr = new gradientColor(this.colorOptionsArr[colorSelected][0], this.colorOptionsArr[
				colorSelected][1], this.inputNum);
			// 初始化字号
			this.fontSize = 60 / this.inputNum + 'vmin'
			// 创建数组
			this.cellsList = []
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
			// 重置待排数组
			this.groupArr = []
			this.groupArr.push({ i: 0, j: this.cellsList.length - 1 })
			// // 重置进度条
			// this.progressWidth = "0vmin"
		},
		/**
		 * 下一步
		 */
		nextStep: function () {
			// 判断排序是否完成
			if (this.groupArr.length == 0) {
				// 排序完成
				clearInterval(this.timer)
				this.speedUpText = '超级加速'
				msgQueue.pushMsgQueue({
					text: '排序完成'
				})
				return
			}

			// 判断i和j，相等即进入下一组
			if (this.i == this.j && this.i != null) {
				// 对组分割
				let tI = this.groupArr[this.groupIndex].i, tJ = this.groupArr[this.groupIndex].j
				// 移除待排数组首位
				this.groupArr.shift()
				// 尝试插入当前右侧数组作为首位
				if (this.j + 1 < tJ) {
					// 右侧数组大于长度1时执行插入
					this.groupArr.unshift({
						i: this.j + 1,
						j: tJ
					})
				}

				// 尝试插入当前左侧数组作为首位
				if (tI < this.i - 1) {
					// 左侧数组大于长度1时执行插入
					this.groupArr.unshift({
						i: tI,
						j: this.i - 1
					})
				}

				console.log('this.j + 1', this.j + 1, 'tJ', tJ)
				console.log('this.i-1', this.i - 1, 'tI', tI)
				// 设置进度条
				// if (this.j + 1 == tJ && tI == this.i - 1) {

				// 	this.progressWidth = (tJ / this.cellsList.length) * 100 + 'vmin'
				// } else if (tI == this.i - 1) {

				// 	this.progressWidth = (this.i / this.cellsList.length) * 100 + 'vmin'
				// }

				// 回归模式1
				this.nextStepMode = 1
			}


			// 1、组数加1，确定当前key、i、j的值
			if (this.nextStepMode == 1) {
				this.turn++
				if (this.groupArr.length > 0) {
					this.key = this.groupArr[this.groupIndex].i
					this.i = this.groupArr[this.groupIndex].i
					this.j = this.groupArr[this.groupIndex].j
					this.nextStepMode++
				}


			} else if (this.nextStepMode == 2) {

				// 2、j向前比较
				if (this.cellsList[this.j].text < this.cellsList[this.key].text) {
					// j值小于key
					let t = this.cellsList[this.j]
					this.cellsList[this.j] = this.cellsList[this.i]
					this.cellsList[this.i] = t
					this.key = this.j
					this.i++
					this.nextStepMode = 3
					return
				}
				this.j--
			} else if (this.nextStepMode == 3) {
				// 3、i向后比较
				if (this.cellsList[this.i].text > this.cellsList[this.key].text) {
					// j值小于key
					let t = this.cellsList[this.j]
					this.cellsList[this.j] = this.cellsList[this.i]
					this.cellsList[this.i] = t
					this.key = this.i
					this.j--
					this.nextStepMode = 2
					return
				}
				this.i++
			}

			// 3、j找到比key小的值，与i交换，i后移一位
			// 4、i向前比较
			// 5、i找到比key大的值，与j交换，j前移一位

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
				}, 10)
			} else {
				clearInterval(this.timer)
				this.timer = null
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
