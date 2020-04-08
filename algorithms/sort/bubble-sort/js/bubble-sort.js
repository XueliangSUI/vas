var data = {
	a: 1,
	cell1Style: {},
	cellsList: ''
}
var app = new Vue({
	el: '#app',
	data: data,
	created: function() {
		initCells()
	},
	methods: {
		// 点击下一步按钮触发
		nextStep: function() {
			// 排序步数＋1
			sortStepNum++
			// 判断排序是否完成
			if (sortStepNum > 36) {
				alert("排序完成")
				return
			}
			// 获取当前应该比较的cell位置
			let thisTurnSortStepNum = getThisTurnSortStepNum(sortStepNum, 0)
			console.log(thisTurnSortStepNum)
			// 比较两个cell的动画
			compareCellsAnimation(cellsList[thisTurnSortStepNum - 1].order, cellsList[thisTurnSortStepNum].order)
			setTimeout(()=>{
				// 判断是否需要交换位置
				if (cellsList[thisTurnSortStepNum - 1].no > cellsList[thisTurnSortStepNum].no) {
					exchangeCells(cellsList[thisTurnSortStepNum - 1].order, cellsList[thisTurnSortStepNum].order)
				}
				// 每次比较后将cellsList按照order重新排序
				sortForOrder()
			},500)
			
		},
		// 自动演示
		autoNextStep() {
			var int = self.setInterval(() => {
				this.nextStep()
				if (sortStepNum > 36) {
					window.clearInterval(int)
				}
			}, 1000)
		}
	}
})

/**
 * 初始化排序（洗牌）
 */
function initCells() {

	// 全局变量，cells实体对象
	cells = document.getElementsByClassName("cell")
	// 初始化排序步数为0
	sortStepNum = 0
	this.cellsList = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
	// 循环初始化
	for (let i = 0; i < this.cellsList.length; i++) {
		// 初始化重复状态
		let repeat = false
		// 随机位置
		this.cellsList[i].order = randomNum(1, 9)
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
		// 序号
		this.cellsList[i].no = i + 1
		// 位置
		this.cellsList[i].left = (this.cellsList[i].order - 1) * 11 + 1 + 'vmin'
		// 将位置渲染到实际
		cells[this.cellsList.length - 1 - i].style.left = this.cellsList[i].left

	}
	// 初始化完成后将cellsList按照order排序顺序重新排序
	sortForOrder()
	console.log('初始化并按照order排序后的this.cellsList', this.cellsList)
}

/**
 * 比较两个cell的动画
 */
function compareCellsAnimation(frontCellNum, behindCellNum) {
	cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.boxShadow = "inset 0 -100vmin rgba(255,255,255,0.7)"
	cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.boxShadow = "inset 0 -100vmin rgba(255,255,255,0.7)"
	setTimeout(()=>{
		cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.boxShadow = "none"
		cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.boxShadow = "none"
	},500)
}

/**
 * 交换两个cell位置
 * @param {整数} frontCellNum
 * @param {整数} behindCellNum
 */
function exchangeCells(frontCellNum, behindCellNum) {
	let t_order = this.cellsList[frontCellNum - 1].order
	let t_left = this.cellsList[frontCellNum - 1].left

	this.cellsList[frontCellNum - 1].order = this.cellsList[behindCellNum - 1].order
	this.cellsList[frontCellNum - 1].left = this.cellsList[behindCellNum - 1].left
	this.cellsList[behindCellNum - 1].order = t_order
	this.cellsList[behindCellNum - 1].left = t_left
	cells[this.cellsList.length - this.cellsList[frontCellNum - 1].no].style.left = this.cellsList[frontCellNum - 1].left
	cells[this.cellsList.length - this.cellsList[behindCellNum - 1].no].style.left = this.cellsList[behindCellNum - 1].left
	console.log(this.cellsList)
}

/**
 * 将cellsList按照order排序顺序重新排序
 */
function sortForOrder() {
	for (let i = 0; i < this.cellsList.length - 1; i++) {
		for (let j = 0; j < this.cellsList.length - 1 - i; j++) {
			if (this.cellsList[j].order > this.cellsList[j + 1].order) {
				let t = this.cellsList[j]
				this.cellsList[j] = this.cellsList[j + 1]
				this.cellsList[j + 1] = t
			}
		}
	}
}

/**
 * 计算当前应当比较第几步
 */
function getThisTurnSortStepNum(sortStepNum, turn) {
	console.log(sortStepNum, turn)
	let thisTurnSortStepNum
	if (sortStepNum - (this.cellsList.length - 1 - turn) > 0) {
		thisTurnSortStepNum = getThisTurnSortStepNum(sortStepNum - (this.cellsList.length - 1 - turn), ++turn)
		// console.log(sortStepNum,turn)
	} else {
		console.log(sortStepNum + turn)
		return (sortStepNum)
	}
	return thisTurnSortStepNum
}


/**
 * 生成从minNum到maxNum的随机数
 */
function randomNum(minNum, maxNum) {
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
}
