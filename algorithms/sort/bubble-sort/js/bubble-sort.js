var data = {
	a: 1,
	cell1Style: {},
	cellsList: ''
}
var app = new Vue({
	el: '#app',
	data: data,
	created: function() {
		// console.log(this.cellsList)
		initCells()
	}
})

/**
 * 初始化排序
 */
function initCells() {
	// var cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9 = {bottom:0}
	aaa = {
		aaa: 111
	}
	
	let cells = document.getElementsByClassName("cell")
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
		this.cellsList[i].left = (this.cellsList[i].order - 1) * 11 +1+ 'vmin'
cells[i].style.left = this.cellsList[i].left

	}
	console.log(this.cellsList)
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
