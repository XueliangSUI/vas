// var app = new Vue({
// 	el: "#app",
// 	data() {
// 		return {}
// 	},
// 	mounted: function() {},
// 	methods: {}
// })


// 这个数组仅供演示弹出文字使用
var i = 0
var textArr = ['这是第一句话','这句字数多一点扣非后你万达华府付款黑','这句少点','wfoiwsjfoisjfosdnfokweniofhweoidhhfuiwfoiwsjfoisjfosdnfokweniofhweoidhhfuiwfoiwsjfoisjfosdnfokweniofhweoidhhfuiwfoiwsjfoisjfosdnfokweniofhweoidhhfuiwfoiwsjfoisjfosdnfokweniofhweoidhhfuiwfoiwsjfoisjfosdnfokweniofhweoidhhfui','87264982319845697','oisudfhewuihfiuwdgfiuweghuiofhweoifh']
function showTip() {
	// 引入control.js后,你可以在任何时间调用msgQueue.pushMsgQueue()这个方法来可以生成消息弹窗,除了text正文以外,其他都可省,持续时间duration尽可能默认或同页设置相同时间,
	msgQueue.pushMsgQueue({
		text: textArr[i]+i
		// ,
		// title:'标题',
		// textcolor:"#555",
		// bgcolor:"#9ce572",
		// duration:5000
	})
	i++
}
