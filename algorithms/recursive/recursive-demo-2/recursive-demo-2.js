// 这篇我故意不写注释，试试看吧
var app = new Vue({
	el: "#app",
	data() {
		return {
			inputNum: '',
			fArr: []

		}
	},
	mounted: function() {},
	methods: {
		reset() {},
		nextStep() {
			if(this.fArr.length>1&&this.fArr[this.fArr.length-1].length ==1&&!String(this.fArr[this.fArr.length-1]).match(/[^0-9]+/)){
				
				alert('结束')
				return
			}
			for(let i =0;i<this.fArr[this.fArr.length - 1].length;i++){
				if(this.fArr[this.fArr.length - 1][i]!=1){break}
				if(i ==this.fArr[this.fArr.length - 1].length-1){
					this.fArr.push(`${this.fArr[this.fArr.length-1].length}`)
					return
				}
			}
			this.fArr.push([])
			for (let i = 0; i < this.fArr[this.fArr.length - 2].length; i++) {

				if (this.fArr[this.fArr.length - 2][i] == 1 || this.fArr[this.fArr.length - 2][i] == 'f(1)' || this.fArr[this.fArr
						.length - 2][i] == 'f(2)') {
					this.fArr[this.fArr.length - 1].push(1)
				} else {
					console.log(this.fArr[this.fArr.length - 2][i])
					var t = this.fArr[this.fArr.length - 2][i].replace(/[^0-9]/ig, "")
					this.fArr[this.fArr.length - 1].push(`f(${t-1})`)
					console.log(t)
				}
				if (this.fArr[this.fArr.length - 2][i] == 1 || this.fArr[this.fArr.length - 2][i] == 'f(1)' || this.fArr[this.fArr
						.length - 2][i] == 'f(2)') {} else {
					console.log(this.fArr[this.fArr.length - 2][i])
					var t = this.fArr[this.fArr.length - 2][i].replace(/[^0-9]/ig, "")
					this.fArr[this.fArr.length - 1].push(`f(${t-2})`)
					console.log(t)
				}
			}

			
		},
		autoNextStep() {},
		onInput(e) {
			console.log(e.currentTarget.value)
			if (e.currentTarget.value == '') {} else if (e.currentTarget.value > 9) {
				this.inputNum = 9
			} else if (e.currentTarget.value < 2) {
				this.inputNum = 2
			}
			this.reset()
			this.fArr.push([`f(${this.inputNum})`])
		}
	}
})
