var app = new Vue({
	el: '#app',
	data() {
		return {
			navList: [{
				title: "开发阶段声明",
				algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
				mdSrc: "./algorithms/sort/bubble-sort/introduce.md",
				fold: ""
			}, {
				title: "数据结构/经典算法",
				algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
				mdSrc: "./algorithms/sort/bubble-sort/introduce.md",
				fold: "",
				content: [{
					title: "排序",
					algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
					mdSrc: "./algorithms/sort/bubble-sort/introduce.md",
					fold: "",
					content: [{
						title: "冒泡排序",
						algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
						mdSrc: "./algorithms/sort/bubble-sort/introduce.md",
						// fold: ""
					}, {
						title: "选择排序",
						algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
						mdSrc: "./algorithms/sort/bubble-sort/introduce.md"
						// fold: ""
					}]
				}, {
					title: "图论",
					algorithmSrc: "./algorithms/sort/bubble-sort/index.html",
					mdSrc: "./algorithms/sort/bubble-sort/introduce.md",
					fold: ""
				}]
			}, {
				title: "扩展算法"
			}, {
				title: "其他"
			}],
			aaaa: "aaa",
			algorithmsSrc: "./algorithms/sort/bubble-sort/index.html"
		}
	},
	mounted: function() {
		// this.mdToHtml()
	},
	methods: {
		/**
		 * md转HTML，返回HTML格式
		 * @param {Object} mdSrc
		 */
		mdToHtml: function(mdSrc) {
			var md
			// 获取md文档内容，并转化成HTML格式，并显示
			$.get(mdSrc, function(response, status, xhr) {
				$("#mdBody").html(marked(response));
			});
		},
		/**
		 * 导航栏标题点击事件，用于弹出抽屉和跳转md文档及动画
		 * @param {Object} algorithmSrc
		 * @param {Object} mdSrc
		 */
		clickNavListTitle: function(algorithmSrc, mdSrc) {

			if (mdSrc && algorithmSrc) {
				// 如果存在md说明文档，且存在动画内容：显示它们，并跳转到动画版块id
				this.mdToHtml(mdSrc)
				window.location.hash = "#algorithmsId";
			} else if (mdSrc) {
				// 如果仅存在md说明文档：显示它，跳转到md版块id，并隐藏动画版块
				$("#mdBody").html(this.mdToHtml(mdSrc));
			} else if (algorithmSrc) {
				// 如果仅存在动画版块：显示它，跳转到动画版块id，并隐藏md版块
			} else if (!mdSrc && !algorithmSrc) {
				// 如果既不存在md版块，也不存在动画版块，则什么也不做
			}

		}
	}
})
