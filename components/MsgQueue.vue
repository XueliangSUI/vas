<template id="MsgQueue">
	<div id="msgQueueWrap" class="msgQueueWrap">
		<transition-group name="msgItem" tag="div">
			<!-- 弹出消息组件依赖于vue，若引入该组件必须同时引入vue 和control.css-->
			<div class="msgItem-msgIndex" @click="removeMsgItem(msgIndex)" v-for="(msgItem,msgIndex) in msgQueueArr" :key="msgIndex"
			 :style="{backgroundColor:msgItem.bgcolor,color:msgItem.textcolor}">
				<div class="msgItem_title">
					{{msgItem.title}}
				</div>
				<div class="msgItem_text">
					{{msgItem.text}}
				</div>
			</div>
		</transition-group>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				msgQueueArr: [],
				msgQueueId: 1
			}
		},
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
	}
</script>

<style>
	/* 弹出消息的队列 */
	.msgQueueWrap {
		/* 穿透点击 */
		/* pointer-events: none; */
		height: 80vmin;
		width: 40vmin;
		position: fixed;
		top: 0;
		right: 0;
		/* background-color: #eee; */
		/* border: 1px solid #aaa; */
		display: flex;
		flex-direction: column;
		align-items: ;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	.msgItem-msgIndex {
		align-self: flex-end;
		transition: 0.2s;
		opacity: 0.9;
		background-color: #9ce572;
		/* width: -webkit-max-content; */
		/* max-width: 36vmin; */
		width: 36vmin;
		min-height: 10vmin;
		margin: 2vmin;
		border-radius: 1vmin;
		word-wrap: break-word;
		box-shadow: inset 0.5vmin 0.5vmin 0.2vmin rgba(255, 255, 255, 0.3), inset -0.5vmin -0.5vmin 0.3vmin rgba(0, 0, 0, 0.1);
		border: 0.2vmin solid rgba(0, 0, 0, 0);
	}

	.msgItem-msgIndex:hover {
		opacity: 1;
		box-shadow: ;
		border: 0.2vmin solid rgba(55, 55, 55, 0.2);
	}

	.msgItem-enter,
	.msgItem-leave-to {
		transition: 0.2s;
		transform: translateX(10vmin);
		opacity: 0;
	}

	/* .msgItem-leave-to{
		transition: 0;
		opacity: 0;
	} */
	.msgItem-leave-active {
		position: absolute;
	}



	.msgItem_title {
		color: #555;
		font-weight: 600;
		margin: 1.2vmin;
		font-size: 2vmin;
	}

	.msgItem_text {
		color: #555;
		font-weight: 600;
		margin: 1.2vmin;
		font-size: 1.5vmin;
	}
</style>
