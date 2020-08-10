{
	// 初始化输入框容器
	initInputWrap()
	// 初始化消息队列
	initMsgQueue()
}


/**
 * 初始化输入框容器
 */
function initInputWrap() {
	let inputWraps = document.getElementsByClassName('control-input-wrap')
	for (let inputWrap of inputWraps) {
		if (inputWrap.firstElementChild.value != '') {
			// 初始时有值
			inputWrap.lastElementChild.classList.add('control-input-wrap-div-focus')
		}
		inputWrap.firstElementChild.onfocus = function() {
			inputWrap.firstElementChild.classList.add('control-input-wrap-input-focus')
			console.log(inputWrap.lastElementChild.className)
			if (inputWrap.lastElementChild.className.indexOf('control-input-wrap-div-focus') == -1) {
				inputWrap.lastElementChild.classList.add('control-input-wrap-div-focus')
			}
		}
		inputWrap.firstElementChild.onblur = function() {
			if (inputWrap.firstElementChild.value == '') {
				inputWrap.lastElementChild.classList.remove('control-input-wrap-div-focus')
			}
			inputWrap.firstElementChild.classList.remove('control-input-wrap-input-focus')
		}
	}
}




/**
 * 消息队列
 */
function initMsgQueue() {
	if (document.getElementById("msgQueueWrap")) {
		document.getElementById("msgQueueWrap").classList.add("msgQueueWrap")
		document.getElementById("msgQueueWrap").innerHTML =
			`<transition-group name="msgItem" tag="div">
				<!-- 弹出消息组件依赖于vue，若引入该组件必须同时引入vue 和control.css-->
				<div class="msgItem-msgIndex" @click="removeMsgItem(msgIndex)" v-for="(msgItem,msgIndex) in msgQueueArr" :key="msgIndex" :style="{backgroundColor:msgItem.bgcolor,color:msgItem.textcolor}">
					<div class="msgItem_title">
						{{msgItem.title}}
					</div>
					<div class="msgItem_text">
						{{msgItem.text}}
					</div>
				</div>
			</transition-group>`

		msgQueue = new Vue({
			el: "#msgQueueWrap",
			data() {
				return {
					msgQueueArr: [],
					msgQueueId: 1
				}
			},
			mounted: function() {},
			methods: {
				// 插入消息队列
				pushMsgQueue({
					text,
					title = "提示",
					bgcolor = "#9ce572",
					textcolor = "color",
					duration = 5000
				}) {
					this.msgQueueArr.push({
						'text': text,
						'title': title,
						'bgcolor': bgcolor,
						'textcolor': textcolor,
						'id': this.msgQueueId
					})
					let tId = this.msgQueueId
					setTimeout(() => {
						this.msgQueueArr.forEach((item, index) => {
							if (item.id == tId) {
								this.msgQueueArr.splice(index, 1)
							}
						})
					}, duration)
					this.msgQueueId++
				},
				// 手动移除一条消息提示
				removeMsgItem(e) {
					this.msgQueueArr.splice(e, 1)
				}
			}
		})
	}
}
