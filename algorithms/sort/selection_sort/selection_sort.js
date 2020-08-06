var app = new Vue({
	el: "#app",
	data() {
		return {
			cellsList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
			// 排序到多少步了
			sortStepNum: 0,
			// 本轮最小的值
			tMin: undefined,
			// 本轮最小的值的号
			tMinNo: 0
		}
	},
	mounted: function() {
		this.initCells()
	},

	methods: {
		// 自动演示
		autoNextStep() {
			// 自动按钮文字切换暂停
			if (document.getElementById("autoNextStep").innerText == "自动") {
				// 当按钮文字为【自动】时，切换文字并开启计时器
				document.getElementById("autoNextStep").innerText = "暂停"
				timer = self.setInterval(() => {
					if (this.sortStepNum > 36) {
						window.clearInterval(timer)
					} else {
						this.nextStep()
					}
				}, 1000)
			} else if (document.getElementById("autoNextStep").innerText == "暂停") {
				// 当按钮文字为【暂停】时，切换文字并清除计时器
				document.getElementById("autoNextStep").innerText = "自动"
				window.clearInterval(timer)
			}
		},
		// 点击下一步按钮触发
		nextStep() {
			// 排序步数＋1
			this.sortStepNum++
			// 判断排序是否完成
			if (this.sortStepNum > 36) {
				// 设置自动播放按钮文字为【自动】
				document.getElementById("autoNextStep").innerText = "自动"
				// console.log(22222,this)
				alert("排序完成")
				return
			}
			// 获取当前应该比较的cell位置
			let [thisTurnSortStepNum, turn] = this.getThisTurnSortStepNum(this.sortStepNum, 0)
			// 每一轮的最小值
			this.tMin = this.tMin ? this.tMin : this.cellsList[turn - 1].order

			if (this.cellsList[this.tMin - 1].no > this.cellsList[thisTurnSortStepNum - 1].no) this.tMin = thisTurnSortStepNum
			// 用于让本轮最小的块亮起来
			this.tMinNo = this.cellsList[this.tMin - 1].no
			// 比较两个cell的动画
			this.compareCellsAnimation(this.cellsList[thisTurnSortStepNum - 1].order, this.cellsList[turn - 1].order)

			if (thisTurnSortStepNum == 9) {
				this.exchangeCells(this.cellsList[this.tMin - 1].order, this.cellsList[turn - 1].order)
				this.tMinNo = 0
				this.tMin = undefined
			}
			// 每次比较后将this.cellsList按照order重新排序
			this.sortForOrder()


		},
		// 重置演示
		reset() {
			// 初始化排序
			this.initCells()
			// 如果计时器存在，清除计时器
			try {
				window.clearInterval(timer)
			} catch (e) {}

		},

		/**
		 * 初始化排序（洗牌）
		 */
		initCells: function() {
			// 全局变量，cells实体对象
			cells = document.getElementsByClassName("cell")
			// 初始化排序步数为0
			this.sortStepNum = 0
			this.tMin = undefined,
				this.tMinNo = 0
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
		 * 计算当前应当比较第几步
		 */
		getThisTurnSortStepNum(sortStepNum, turn) {
			if (sortStepNum < 9) return [sortStepNum + 1, 1]
			else if (sortStepNum < 16) return [sortStepNum - 8 + 2, 2]
			else if (sortStepNum < 22) return [sortStepNum - 15 + 3, 3]
			else if (sortStepNum < 27) return [sortStepNum - 21 + 4, 4]
			else if (sortStepNum < 31) return [sortStepNum - 26 + 5, 5]
			else if (sortStepNum < 34) return [sortStepNum - 30 + 6, 6]
			else if (sortStepNum < 36) return [sortStepNum - 33 + 7, 7]
			else if (sortStepNum < 37) return [sortStepNum - 35 + 8, 8]
		},
		/**
		 * 比较两个cell时候的动画
		 */
		compareCellsAnimation(frontCellNum, behindCellNum) {
			cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.boxShadow =
				"inset 0 -100vmin rgba(255,255,255,0.7)"
			cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.boxShadow =
				"inset 0 -100vmin rgba(255,255,255,0.7)"
			setTimeout(() => {
				cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.boxShadow = "none"
				cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.boxShadow = "none"
			}, 500)
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
		 * 交换两个cell位置
		 * @param {整数} frontCellNum
		 * @param {整数} behindCellNum
		 */
		exchangeCells(frontCellNum, behindCellNum) {
			let t_order = this.cellsList[frontCellNum - 1].order
			let t_left = this.cellsList[frontCellNum - 1].left

			this.cellsList[frontCellNum - 1].order = this.cellsList[behindCellNum - 1].order
			this.cellsList[frontCellNum - 1].left = this.cellsList[behindCellNum - 1].left
			this.cellsList[behindCellNum - 1].order = t_order
			this.cellsList[behindCellNum - 1].left = t_left
			cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.left = this.cellsList[frontCellNum - 1].left
			cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.left = this.cellsList[behindCellNum - 1]
				.left
			console.log(this.cellsList)
		}

	}
})
