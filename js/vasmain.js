var app = new Vue({
	el: '#app',
	data() {
		return {
			// 控制md和动画版块的显示或隐藏
			ifMdBodyShow: true,
			ifAnmShow: false,
			// 导航列表对象
			navList: [{
				title: "开发阶段声明",
				algorithmSrc: "",
				mdSrc: "./VAS开发文档.md",
				fold: true
			}, {
				title: "数据结构常用算法",
				// algorithmSrc: "./algorithms/sort/bubble_sort/index.html",
				// mdSrc: "./algorithms/sort/bubble_sort/introduce.md",
				fold: true,
				content: [{
					title: "排序",
					// algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					mdSrc: "./algorithms/sort/sort.md",
					fold: true,
					content: [{
						title: "冒泡排序",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: ""
					}, {
						title: "选择排序",
						algorithmSrc: "./algorithms/sort/selection_sort/selection_sort.html",
						mdSrc: "./algorithms/sort/selection_sort/selection_sort.md"
						// fold: ""
					}, {
						title: "插入排序",
						algorithmSrc: "./algorithms/sort/insertion_sort/insertion_sort.html",
						mdSrc: "./algorithms/sort/insertion_sort/insertion_sort.md"
						// fold: ""
					}, {
						title: "模板/组件库",
						algorithmSrc: "./algorithms/sort/mu_ban/mu_ban.html",
						mdSrc: "./algorithms/sort/mu_ban/mu_ban.md"
						// fold: ""
					}]
				}, {
					title: "查找",
					algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true,
					content: [{
						title: "顺序查找",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: ""
					}, {
						title: "二分查找",
						algorithmSrc: "./algorithms/sort/choose_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/choose_sort/bubble_sort.md"
						// fold: ""
					}]
				}, {
					title: "递归",
					algorithmSrc: "",
					mdSrc: "",
					fold: true,
					content: [{
						title: "实例——工大食堂",
						algorithmSrc: "./algorithms/recursive/recursive_demo_1/recursive_demo_1.html",
						mdSrc: "./algorithms/recursive/recursive_demo_1/recursive_demo_1.md",
						// fold: ""
					}, {
						title: "斐波那契数列",
						algorithmSrc: "./algorithms/recursive/recursive_demo_2/recursive_demo_2.html",
						mdSrc: "./algorithms/recursive/recursive_demo_2/recursive_demo_2.md",
						// fold: ""
					}]
				}, {
					title: "树",
					// algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true,
					content: [{
						title: "前序遍历",
						algorithmSrc: "./algorithms/tree/NLRCompleteBinaryTree/NLRCompleteBinaryTree.html",
						// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: ""
					},{
						title: "后序遍历",
						algorithmSrc: "./algorithms/tree/LRNCompleteBinaryTree/LRNCompleteBinaryTree.html",
						// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: ""
					}, {
						title: "二分查找",
						algorithmSrc: "./algorithms/sort/choose_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/choose_sort/bubble_sort.md"
						// fold: ""
					}]
				}, {
					title: "图论",
					// algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true
				}]
			}, {
				title: "扩展算法",
				algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
				mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
				fold: true,
				content: [{
					title: "迷宫",
					algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true,
					content: [{
						title: "迷宫生成1",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}, {
						title: "迷宫生成2",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}, {
						title: "迷宫寻路",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}]
				}, {
					title: "思维扩展",
					algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true,
					content: [{
						title: "生命游戏",
						algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}]
				}]
			}, {
				title: "其他",
				algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
				mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
				fold: true,
				content: [{
					title: "项目相关",
					algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
					mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
					fold: true,
					content: [{
						title: "项目总结"
						// ,
						// algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}, {
						title: "开发者"
						// ,
						// algorithmSrc: "./algorithms/sort/bubble_sort/bubble_sort.html",
						// mdSrc: "./algorithms/sort/bubble_sort/bubble_sort.md",
						// fold: true
					}]
				}]
			}],
			aaaa: "aaa",
			algorithmsSrc: "./algorithms/sort/bubble_sort/index.html"
		}
	},
	mounted: function() {
		// this.mdToHtml()
		this.clickNavListTitle({
			title: "开发阶段声明",
			algorithmSrc: "",
			mdSrc: "./VAS开发文档.md",
			fold: true
		}, 0)
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
		 * @param {Object} fold
		 */
		clickNavListTitle: function(lv, index1, index2, index3) {
			// 控制目录折叠展开
			if (index3 != undefined) {
				// 存在index3
				// 截止2020/5/3版本，暂时不存在【三级目录下还有内容】的情况
				if (this.navList[index1].content[index2].content[index3].fold == true) {
					this.navList[index1].content[index2].content[index3].fold = false
				} else if (this.navList[index1].content[index2].content[index3].fold == false) {
					this.navList[index1].content[index2].content[index3].fold = true
				}
			} else if (index2 != undefined) {
				console.log(lv, index1, index2, this.navList[index1].content[index2])
				// 存在index2
				if (this.navList[index1].content[index2].fold == true) {
					this.navList[index1].content[index2].fold = false
				} else if (this.navList[index1].content[index2].fold == false) {
					this.navList[index1].content[index2].fold = true
				}

			} else if (index1 != undefined) {
				// 存在index1
				if (this.navList[index1].fold == true) {
					this.navList[index1].fold = false
				} else if (this.navList[index1].fold == false) {
					this.navList[index1].fold = true
				}
			}

			// console.log(this.navList)


			if (lv.mdSrc && lv.algorithmSrc) {
				// 如果存在md说明文档，且存在动画内容：显示它们
				this.ifMdBodyShow = true
				this.ifAnmShow = true
				this.mdToHtml(lv.mdSrc)
				this.algorithmsSrc = lv.algorithmSrc
			} else if (lv.mdSrc) {
				// 如果仅存在md说明文档：显示它，跳转到md版块id，并隐藏动画版块
				this.ifMdBodyShow = true
				this.ifAnmShow = false
				$("#mdBody").html(this.mdToHtml(lv.mdSrc));
			} else if (lv.algorithmSrc) {
				// 如果仅存在动画版块：显示它，跳转到动画版块id，并隐藏md版块
				this.ifMdBodyShow = false
				this.ifAnmShow = true
				this.algorithmsSrc = lv.algorithmSrc
			} else if (!lv.mdSrc && !lv.algorithmSrc) {
				// 如果既不存在md版块，也不存在动画版块，则什么也不做
				// 不隐藏md和动画
			}

		},

		anmwrapScrolling: function() {
			// document.getElementById("anmwrap").style.scrollbar
		}
	}
})
