var app = new Vue({
	el: '#app',
	data() {
		return {
			a: 1,
			algorithmsSrc: "./algorithms/sort/bubble-sort/index.html"
		}
	},
	created: function() {
		this.mdToHtml()
	},
	methods: {
		/**
		 * md转HTML
		 */
		mdToHtml: function() {
			// 获取md文档内容
			$.get('./algorithms/sort/bubble-sort/introduce.md', function(response, status, xhr) {
				$("#anmwrap").html("<div class='markdown-body'>" + marked(response) + "</div>");
			});

		}
	}
})
