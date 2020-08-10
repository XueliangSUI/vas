var app = new Vue({
	el: "#app",
	data() {
		return {
			cellsList: [],
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
			cellsGroup: []

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
			// 随机颜色
			let colorSelected = Math.floor(Math.random() * this.colorOptionsArr.length)
			this.gradientColorArr = new gradientColor(this.colorOptionsArr[colorSelected][0], this.colorOptionsArr[
				colorSelected][1], 21);
			this.cellsList = []
			// 创建数组
			for (let i = 0; i < 21; i++) {
				this.cellsList.push({
					text: i + 1,
					height: 15 + i * 2 + 'vmin',
					backgroundColor: this.gradientColorArr[i]
				})
			}
			// 数组乱序
			for (let i = 0; i < 21; i++) {
				let tIndex = Math.floor(Math.random() * 21)
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
				this.stepLength = 1
				// 最后一轮
			} else if (this.stepLength >= 1) {
				// 排序过程中
				// this.stepLength = Math.floor(this.cellsList.length / 2)
				this.cellsGroup = []

				if (this.group <= this.stepLength) {
					// 继续排序
					for (let i = this.index; i < this.cellsList.length; i += this.stepLength) {
						this.cellsGroup.push(i)
						// console.log(i)
					}
					this.insertionSortForGroup()
					this.index++
				} else if (this.group > this.stepLength) {
					this.group = 0
					this.index = 0
					// 本轮排序结束，进入下一轮
					this.stepLength = Math.floor(this.stepLength / 2)
					console.log(' 本轮排序结束，进入下一轮')
					this.turn++
				}


			}

			// console.log(this.cellsGroup, this.stepLength, this.cellsList)
		},
		insertionSortForGroup() {

			for (let i = 1; i < this.cellsGroup.length; i++) {
				var tCell = this.cellsList[this.cellsGroup[i]]
				// this.cellsList.splice([this.cellsGroup[i]], 1)
				for (let j = i - 1; j >= 0; j--) {
					console.log(i, j, this.cellsList)
					console.log(this.cellsList[this.cellsGroup[i]].text, this.cellsList[this.cellsGroup[j]].text)
					this.exchangeCells(i, j, tCell)
					console.log(this.cellsList[this.cellsGroup[i]].text, this.cellsList[this.cellsGroup[j]].text)
					if (this.cellsList[this.cellsGroup[i]].text < this.cellsList[this.cellsGroup[j]].text) {
						this.cellsList[this.cellsGroup[i]] = this.cellsList[this.cellsGroup[j]]
						this.cellsList[this.cellsGroup[j]] = tCell
					} else if (this.cellsList[this.cellsGroup[
							i]].text > this.cellsList[this.cellsGroup[j]].text) {
						// 		console.log(this.cellsGroup, this.stepLength, this.cellsList)
						// // this.cellsList.splice([this.cellsGroup[j+1]], 0, tCell)
						// for (let k = i; k > j+1; k--) {
						// 	this.cellsList[this.cellsGroup[k]] = this.cellsList[this.cellsGroup[k - 1]]
						// }
						// if(i>j+1){this.cellsList[this.cellsGroup[j]] = tCell}

						// break
					}
				}
			}
			// if (this.cellsList[this.cellsGroup[index]]<this.cellsList[this.cellsGroup[index-i]]){
			// 	let t =  this.cellsList[this.cellsGroup[index]]
			// 	 this.cellsList[this.cellsGroup[index]] = this.cellsList[this.cellsGroup[index-1]]
			// 	 this.cellsList[this.cellsGroup[index-1]] = t
			// }
			// if(index == this.cellsGroup[index].length-1  &&  )
		},
		exchangeCells(index_i, index_j, tCell) {
			console.log('index_i', index_i, 'index_j', index_j)
			if (this.cellsList[this.cellsGroup[index_i]].text < this.cellsList[this.cellsGroup[index_j]].text) {
				this.cellsList[this.cellsGroup[index_i]] = this.cellsList[this.cellsGroup[index_j]]
				this.cellsList[this.cellsGroup[index_j]] = tCell
			}
			if (index_j >= 1) {

				this.exchangeCells(index_j, index_j - 1, tCell)
			}
		},
		reset(){
			Object.assign(this.$data, this.$options.data())
			this.initCells()
		}
	}
})
