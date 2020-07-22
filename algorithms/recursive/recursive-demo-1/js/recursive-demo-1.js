var app = new Vue({
	el: '#app',
	data: {
		languages: ['文字描述', 'JavaScript', 'C语言'],
		languageSelected: 2,
		favouriteNum: 0,
		getFavourite: false,
		line1running: false,
		line2running: false,
		line3running: false,
		line4running: false,
		line5running: false,
		winNum: 1,
		resetPermit: true,
		focus: false,
		autoOrStop: '自动'

	},
	mounted: function() {
		// 开局重置一下
		this.reset()
	},
	methods: {
		autoNextStep: function() {
			if (this.autoOrStop == '自动') {
				this.autoOrStop = '停止'
				this.nextStep()
				let timer = setInterval(() => {
					if (this.getFavourite == true || this.autoOrStop == '自动') {
						clearInterval(timer)
					}
					this.nextStep()
				}, 500)
			} else if (this.autoOrStop == '停止') {
				this.autoOrStop = '自动'
			}

		},
		/**
		 * 下一步
		 */
		nextStep: function() {
			if (this.getFavourite) {
				alert('递归已结束，请重置')
			}
			if (this.winNum == this.favouriteNum) {
				if (this.line5running == true && this.getFavourite == false) {
					this.line5running = false
					this.line2running = true
				} else if (this.line2running == true) {
					this.line2running = false
					this.line5running = true
					this.getFavourite = true
					this.focus = true
					setTimeout(() => {
						this.focus = false
					}, 500)
				}

			} else if (this.winNum < this.favouriteNum) {
				if (this.line5running == true) {
					// if(this.winNum!=this.favouriteNum){
					// 	this.winNum++
					// }
					this.line5running = false
				}
				if (this.line3running == false) {
					this.line3running = true
				} else if (this.line3running == true) {
					this.line3running = false
					this.line5running = true
					this.winNum++
					this.focus = true
					setTimeout(() => {
						this.focus = false
					}, 700)
				}
			}

		},
		/**
		 * 重置
		 */
		reset: function() {
			// 判断按钮间隔
			if (this.resetPermit == false) return
			else this.resetPermit = false
			// 设定按钮间隔1s
			setTimeout(() => {
				this.resetPermit = true
			}, 1000)
			console.log(this.resetPermit)
			// 重置窗口号
			this.favouriteNum = Math.floor(Math.random() * (10 - 1 + 1) + 1)
			// 重置值
			this.getFavourite = false
			this.winNum = 1
			this.line5running = false
			this.autoOrStop = '自动'
			// 重置一下样式，主要是炫一点，没啥大用
			this.line1running = true
			setTimeout(() => {
				this.line1running = false
				this.line2running = true
			}, 100)
			setTimeout(() => {
				this.line2running = false
				this.line3running = true
			}, 200)
			setTimeout(() => {
				this.line3running = false
				this.line4running = true
			}, 300)
			setTimeout(() => {
				this.line4running = false
				this.line5running = true
			}, 400)

		},
		/**
		 * 切换语言
		 */
		exchangeLanguage: function() {
			this.languageSelected = this.languageSelected >= this.languages.length - 1 ? 0 : ++this.languageSelected,
				console.log(this.languageSelected)
			console.log(this.languages.length)
			console.log(this.languageSelected.length >= this.languages.length - 1)
		}
	}


})
