// 这篇我故意不写注释，试试看吧
// 更新：不写注释自己都看不懂了，得写
var app = new Vue({
	el: "#app",
	data() {
		return {
			inputNum: '',
			fArr: [],
			gradient: [],
			fontSizeArr: ['15vmin']

		}
	},
	mounted: function() {},
	methods: {
		reset() {
			this.inputNum = ''
			this.fArr = []
			this.gradient = []
			this.fontSizeArr = ['15vmin']
			try {
				clearInterval(timer)
			} catch (e) {}
			document.getElementById('autoNextStep').innerText = '自动'
		},
		nextStep() {

			if (this.fArr == '') {
				msgQueue.pushMsgQueue({
					text: '请输入位数'
				})
				return
			}

			// 最后一位的文本是纯数字，算法结束
			if (this.fArr.length > 1 && this.fArr[this.fArr.length - 1].length == 1 && !String(this.fArr[this.fArr.length -
					1].length, this.fArr[this.fArr.length - 1][0].text).match(/[^0-9]+/)) {

				try {
					clearInterval(timer)
				} catch (e) {}
				document.getElementById('autoNextStep').innerText = '自动'
				msgQueue.pushMsgQueue({
					text: '结束'
				})
				return
			}
			for (let i = 0; i < this.fArr[this.fArr.length - 1].length; i++) {
				// 遍历fArr最后一组的每个元素
				if (this.fArr[this.fArr.length - 1][i].text != 1) {
					// 如果fArr中最后一组并非每个都是1，则递归未完成
					break
				}
				if (i == this.fArr[this.fArr.length - 1].length - 1) {
					// 如果遍历到fArr中最后一组的最后一个元素了遍历还未结束，说明最后一组每个元素都是1，可以塞入最终结果
					this.fArr.push([])
					this.fArr[this.fArr.length - 1].push({
						'text': `${this.fArr[this.fArr.length-2].length}`,
						'backgroundcolor': this.gradient[Number(this.inputNum)]
					})
					this.updateFontSizeArr()
					return
				}
			}
			this.fArr.push([])
			// 遍历上一组中每个数
			for (let i = 0; i < this.fArr[this.fArr.length - 2].length; i++) {
				if (this.fArr[this.fArr.length - 2][i].text == 1 || this.fArr[this.fArr.length - 2][i].text == 'f(1)' || this.fArr[
						this.fArr
						.length - 2][i].text == 'f(2)') {
					//如果该元素是1或f1或f2，则塞入一个1
					this.fArr[this.fArr.length - 1].push({
						'text': `1`,
						'backgroundcolor': this.gradient[Number(this.inputNum) - 1]
					})
					this.updateFontSizeArr()
				} else {
					// 否则塞入f-1
					console.log(this.fArr[this.fArr.length - 2][i])
					var t = this.fArr[this.fArr.length - 2][i].text.replace(/[^0-9]/ig, "")
					this.fArr[this.fArr.length - 1].push({
						'text': `f(${t-1})`,
						'backgroundcolor': this.gradient[Number(this.inputNum) - t]
					})
					this.updateFontSizeArr()
					console.log(t)
				}
				if (this.fArr[this.fArr.length - 2][i].text == 1 || this.fArr[this.fArr.length - 2][i].text == 'f(1)' || this.fArr[
						this.fArr
						.length - 2][i].text == 'f(2)') {
					//如果该元素是1或f1或f2，则什么都不做
				} else {
					// 否则塞入f-2
					// console.log(this.fArr[this.fArr.length - 2][i])
					var t = this.fArr[this.fArr.length - 2][i].text.replace(/[^0-9]/ig, "")
					this.fArr[this.fArr.length - 1].push({
						'text': `f(${t-2})`,
						'backgroundcolor': this.gradient[Number(this.inputNum) - t + 1]
					})
					this.updateFontSizeArr()
					console.log(this.fArr)
				}
			}


		},
		autoNextStep() {
			let buttonAutoNextStep = document.getElementById('autoNextStep')
			if (buttonAutoNextStep.innerText == "自动") {
				buttonAutoNextStep.innerText = "暂停"
				timer = setInterval(() => {
					this.nextStep()
				}, 1000)
			} else if (buttonAutoNextStep.innerText == "暂停") {
				clearInterval(timer)
				buttonAutoNextStep.innerText = "自动"
			}
		},
		onBlur(e) {
			// console.log(e.currentTarget.value)
			let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);
			if (!flag) {
				this.inputNum = ''
				return
			} else {
				this.inputNum = e.currentTarget.value
			}
			if (e.currentTarget.value == '') {} else if (e.currentTarget.value > 9) {
				this.inputNum = 9
			} else if (e.currentTarget.value < 3) {
				this.inputNum = 3
			}
			this.gradient = new gradientColor('#e74c3c', '#70a1ff', Number(this.inputNum) + 1);
			console.log(this.inputNum, this.gradient)
			if (this.fArr.length == 0) {
				this.fArr.push([{
					'text': `f(${this.inputNum})`,
					'backgroundcolor': this.gradient[0]
				}])
			}


		},
		onInputChange: function() {
			this.fArr = []
			this.gradient = []
			this.fontSizeArr = ['15vmin']
			try {
				clearInterval(timer)
			} catch (e) {}
			document.getElementById('autoNextStep').innerText = '自动'
		},
		updateFontSizeArr() {
			this.fontSizeArr = []
			for (let i = 0; i < this.fArr.length; i++) {
				if (15 - this.fArr.length * 0.7 - this.fArr[i].length * 0.6 > 0) {
					this.fontSizeArr.push(15 - this.fArr.length * 0.7 - this.fArr[i].length * 0.8 + 'vmin')
				} else {
					this.fontSizeArr.push(0.001 + 'vmin')
				}

			}
			console.log(this.fontSizeArr)
		}
	}
})



/*
//网上借来的生成阶梯颜色的方法,基本没做改动
//http://www.yanue.net/post-80.html
		// 作者 yanue
		// 参数：
		// startColor：开始颜色hex
		// endColor：结束颜色hex
	    // step:几个阶级（几步）
	   */
function gradientColor(startColor, endColor, step) {
	startRGB = this.colorRgb(startColor); //转换为rgb数组模式
	startR = startRGB[0];
	startG = startRGB[1];
	startB = startRGB[2];

	endRGB = this.colorRgb(endColor);
	endR = endRGB[0];
	endG = endRGB[1];
	endB = endRGB[2];

	sR = (endR - startR) / step; //总差值
	sG = (endG - startG) / step;
	sB = (endB - startB) / step;

	var colorArr = [];
	for (var i = 0; i < step; i++) {
		//计算每一步的hex值 
		var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB *
			i + startB)) + ')');
		colorArr.push(hex);
	}
	return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function(sColor) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var sColor = sColor.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return sColorChange;
	} else {
		return sColor;
	}
};

// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function(rgb) {
	var _this = rgb;
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (/^(rgb|RGB)/.test(_this)) {
		var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = _this;
		}
		return strHex;
	} else if (reg.test(_this)) {
		var aNum = _this.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return _this;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return _this;
	}
}

// var gradient = new gradientColor('#013548', '#554851', 10);
// console.log(gradient); //控制台输出
// alert(gradient);
