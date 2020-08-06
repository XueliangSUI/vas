var app = new Vue({
	el: "#app",
	data() {
		return {
			cellsList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
			turn: 1,
			thisTurnStepNum: 1
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
			// 全局变量，cells实体对象
			cells = document.getElementsByClassName("cell")
			// 初始化数据
			this.turn = 1
			this.thisTurnStepNum = 1
			this.cellsList = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
			// 循环初始化
			for (let i = 0; i < this.cellsList.length; i++) {
				// 初始化重复状态
				let repeat = false
				// 随机位置
				this.cellsList[i].order = this.randomNum(1, 9)
				// 判断随机位置是否重复
				for (let j = 0; j < i; j++) {
					if (this.cellsList[i].order == this.cellsList[j].order) {
						repeat = true
						break
					}
				}
				//若重复则重新随机
				if (repeat) {
					i--
					continue
				}
				// 赋予元素对应的序号
				this.cellsList[i].no = i + 1
				// 位置
				this.cellsList[i].left = (this.cellsList[i].order - 1) * 11 + 1 + 'vmin'
				// 将位置渲染到实际
				cells[this.cellsList.length - 1 - i].style.left = this.cellsList[i].left

			}
			// 初始化完成后将this.cellsList按照order排序顺序重新排序
			this.sortForOrder()
			console.log('初始化并按照order排序后的this.cellsList', this.cellsList)
		},
		/**
		 * 生成从minNum到maxNum的随机数
		 */
		randomNum: function(minNum, maxNum) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * minNum + 1, 10);
					break;
				case 2:
					return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
					//或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
					break;
				default:
					return 0;
					break;
			}
		},
		/**
		 * 将this.cellsList按照order排序顺序重新排序
		 */
		sortForOrder() {
			for (let i = 0; i < this.cellsList.length - 1; i++) {
				for (let j = 0; j < this.cellsList.length - 1 - i; j++) {
					if (this.cellsList[j].order > this.cellsList[j + 1].order) {
						let t = this.cellsList[j]
						this.cellsList[j] = this.cellsList[j + 1]
						this.cellsList[j + 1] = t
					}
				}
			}
		},
		/**
		 * 自动
		 */
		autoNextStep: function() {
			if (document.getElementById("autoNextStep").innerText == "自动") {
				document.getElementById("autoNextStep").innerText = "暂停"
				timer = setInterval(() => {
					this.nextStep()
				}, 500)
			} else if (document.getElementById("autoNextStep").innerText == "暂停") {
				document.getElementById("autoNextStep").innerText = "自动"
				window.clearInterval(timer)

			}

		},
		/**
		 * 重置
		 */
		reset: function() {
			// 把悬空的本轮块放回来
			if (this.turn < 9) {
				cells[9 - this.cellsList[this.turn].no].style.bottom = 0
			}
			this.initCells()
		},
		/**
		 * 下一步
		 */
		nextStep: function() {

			if (this.thisTurnStepNum == 9 && this.turn == 9) {
				window.clearInterval(timer)
				alert('排序结束')
				document.getElementById("autoNextStep").innerText = "自动"
				return
			} else if (this.thisTurnStepNum == this.turn) {
				// 位置
				this.cellsList[this.turn].bottom = 70 + 'vmin'
				console.log(this.cellsList)
				console.log(cells)
				// 将位置渲染到实际
				cells[9 - this.cellsList[this.turn].no].style.bottom = this.cellsList[this.turn].bottom
				this.thisTurnStepNum--
				return
			}
			if (this.thisTurnStepNum < 0) {
				// 没有其他块可比了，本轮块放到最前面
				this.cellsList[this.turn].left = 1 + 'vmin'

				// 将位置渲染到实际
				cells[9 - this.cellsList[this.turn].no].style.left = this.cellsList[this.turn].left
				cells[9 - this.cellsList[this.turn].no].style.bottom = 0
				this.turn++
				this.thisTurnStepNum = this.turn
				this.sortForLeft()
				console.log('this.turn', this.turn, 'this.thisTurnStepNum', this.thisTurnStepNum)
				return
			} else if (this.cellsList[this.turn].no < this.cellsList[this.thisTurnStepNum].no) {
				// 本轮块小于当前块，当前块挪一下
				// 位置
				this.cellsList[this.thisTurnStepNum].left = (this.cellsList[this.thisTurnStepNum].order) * 11 + 1 + 'vmin'
				console.log(this.cellsList)
				console.log(cells)
				// 将位置渲染到实际
				cells[9 - this.cellsList[this.thisTurnStepNum].no].style.left = this.cellsList[this.thisTurnStepNum].left
				// this.cellsList[this.turn]
				this.thisTurnStepNum--
				this.sortForLeft()
				return
			} else if (this.cellsList[this.turn].no > this.cellsList[this.thisTurnStepNum].no) {
				// 本轮块大于当前块,插入
				this.cellsList[this.turn].left = (this.thisTurnStepNum + 1) * 11 + 1 + 'vmin'
				cells[9 - this.cellsList[this.turn].no].style.left = this.cellsList[this.turn].left
				cells[9 - this.cellsList[this.turn].no].style.bottom = 0
				this.turn++
				this.thisTurnStepNum = this.turn
				this.sortForLeft()
				return
			}

		},
		/**
		 * 按照left给cellsList排序
		 */
		sortForLeft: function() {
			for (let i = 0; i < this.cellsList.length; i++) {
				for (let j = 0; j < this.cellsList.length - 1 - i; j++) {
					if (parseInt(this.cellsList[j].left) > parseInt(this.cellsList[j + 1].left)) {
						let t = this.cellsList[j]
						this.cellsList[j] = this.cellsList[j + 1]
						this.cellsList[j + 1] = t
					}
				}
				this.cellsList[i].order = i + 1
			}
			console.log('this.turn', this.turn, 'this.thisTurnStepNum', this.thisTurnStepNum, '重排序后cellsList', this.cellsList)
		}
	}
})
