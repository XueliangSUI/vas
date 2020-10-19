
// 单元格
class Cell extends React.Component {
	constructor(props) {
		super(props);
		// this.state = { date: new Date() };
	}

	render() {
		return (
			<div className="cell">{this.props.number}</div>
		)
	}
}

// 查找区域
class Square extends React.Component {

	constructor(props) {
		super(props)


	}



	render() {
		return (
			<div className="square">{
				this.props.arr.map((item, index) => {
					return <Cell key={index} number={item} />
				})
			}
			</div>
		)
	}
}

// 二分查找页面整体
class BinarySearchWrap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
			abandonedArr: [],
			numberToBeFounded: 0,
			indexNow: 0,
			steps: 0,
			i: 0,
			j: 99,
			allCells: null,
			autoText: '自动'
		};
	}
	componentDidMount() {
		// 1、初始化乱序待查询区域
		let arr = []
		// 获取100个1000以下的随机数
		for (let i = 0; i < 100; i++) {
			let tnum = Math.floor(Math.random() * 1000) + 1
			let flag = false
			for (let j = 0; j < arr.length; j++) {
				if (arr[j] == tnum) {
					flag = true
				}
			}
			if (flag) {
				i--
				continue
			}
			arr.push(tnum)

		}
		console.log(arr)
		arr.sort(() => {
			return Math.random() - 0.5
		})

		// console.log(this.state.arr)
		// 2、初始化待查询数字
		let numberToBeFounded = Math.floor(Math.random() * 100)
		numberToBeFounded = arr[numberToBeFounded]
		this.setState({
			arr: arr,
			numberToBeFounded: numberToBeFounded
		})
		// 


	}
	// 给乱序待排数组排个序
	sortArr() {
		let arr = this.state.arr
		arr.sort((a, b) => {
			return a - b
		})

		this.setState({
			arr: arr
		})
	}

	// 点击下一步
	nextStep() {
		// 判断数组是否为升序
		let ifSorted = true
		for (let i = 0; i < 98; i++) {
			if (this.state.arr[i] >= this.state.arr[i + 1]) {
				// 当数组不为升序时，排一下序，并return
				ifSorted = false
				this.sortArr()
				return
			}
		}

		//判断allCells有没有值
		if (this.state.allCells == null) {
			// 若未初始化allCells则为其初始化
			this.setState({
				allCells: document.querySelectorAll(".cell")
			}, () => {
				this.nextStep()
			})
			return
			// console.log(this.state.allCells)

		}


		// 计算当前查询索引
		let indexNow = parseInt((this.state.i + this.state.j) / 2)
		this.setState({
			indexNow: indexNow
		})
		// console.log(indexNow)
		// 移除上一步查询元素的样式
		for (let item of this.state.allCells) {
			item.classList.remove('cell_on')
		}
		// 为当前查询元素添加样式
		this.state.allCells[indexNow].classList.add("cell_on")
		// 判断查询结果
		// 查找步数加一
		this.setState((state) => ({
			steps: state.steps+1
		}))
		if (this.state.numberToBeFounded == this.state.allCells[indexNow].innerText) {
			this.state.steps--
			msgQueue.pushMsgQueue({
				title: "查找完成",
				text: `二分查找已完成!`
				// ，共查找${this.state.steps+1}次。
			})

			clearInterval(window.timer)
			// this.state.steps--
			// this.setState({
			// 	steps:this.state.steps
			// })
			// return
		} else if (this.state.numberToBeFounded < this.state.allCells[indexNow].innerText) {
			// 设定遗弃数组
			let tArr = this.state.abandonedArr
			tArr.push({ i: indexNow, j: this.state.j })

			this.setState({
				j: indexNow,
				abandonedArr: tArr
			})

		} else if (this.state.numberToBeFounded > this.state.allCells[indexNow].innerText) {
			// 设定遗弃数组
			let tArr = this.state.abandonedArr
			tArr.push({ i: this.state.i, j: indexNow })
			this.setState({
				i: indexNow,
				abandonedArr: tArr
			})
		}

		// 渲染遗弃数组
		for (let item of this.state.abandonedArr) {
			// console.log(item.i, item.j)
			for (let i = item.i; i <= item.j; i++) {
				this.state.allCells[i].classList.add("cell_off")
			}
		}
		// 为当前查询元素添加样式
		this.state.allCells[indexNow].classList.add("cell_on")


	}

	// 点击自动
	autoNext() {
		if (this.state.autoText == '自动') {
			window.timer = setInterval(() => {
				this.nextStep(this.state.indexNow)
			}, 1000);
			this.setState({
				autoText: '暂停'
			})
		} else {
			this.setState({
				autoText: '自动'
			})

			clearInterval(window.timer)
		}


	}

	// 点击重置
	reset() {
		clearInterval(window.timer)

		console.log(this.state)
		// 重置查找
		if (this.state.allCells != null) {
			for (let item of this.state.allCells) {
				item.classList.remove('cell_on')
				item.classList.remove('cell_off')
			}
		}




		this.state.arr.sort(() => {
			return Math.random() - 0.5
		})
		let numberToBeFounded = Math.floor(Math.random() * 100)
		numberToBeFounded = this.state.arr[numberToBeFounded - 1]
		this.setState({
			abandonedArr: [],
			steps: 0,
			i: 0,
			j: 99,
			allCells: null,
			autoText: '自动',
			arr: this.state.arr,
			numberToBeFounded: numberToBeFounded,
			indexNow: 0
		})
	}

	render() {
		return (
			<div className="sequential_search_wrap">
				<TextLine numberToBeFounded={this.state.numberToBeFounded} steps={this.state.steps} />
				<Square arr={this.state.arr} />

				<ControlWrap autoText={this.state.autoText} autoNext={() => { this.autoNext() }} nextStep={() => { this.nextStep(this.state.indexNow) }} reset={() => { this.reset() }} />
			</div>
		);
	}
}

class TextLine extends React.Component {
	constructor(props) {
		super(props)

	}
	render() {
		return (<div className="text_line">
			<p>查找目标：{this.props.numberToBeFounded}</p>
			{/* <p>查找次数：{this.props.steps}</p> */}
		</div>
		)
	}
}

class ControlWrap extends React.Component {
	constructor(props) {
		super(props);
		// this.nextStep = this.nextStep.bind(this)
	}
	// nextStep(e) {
	// 	// e.preventDefault();
	// 	var x = document.querySelectorAll(".cell");
	// 	console.log(x[this.props.indexNow]) 
	//   }
	render() {
		return (
			<div className="ct-wrap">
				<div type="button" className="button-blue">
					<div className="" onClick={() => { this.props.autoNext() }}>
						{this.props.autoText}
					</div>
				</div>
				<div type="button" className="button-green" onClick={() => this.props.nextStep()}>
					<div className="">
						下一步
					</div>
				</div>
				<div type="button" className="button-orange" onClick={() => this.props.reset()}>
					<div className="">
						重置
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<BinarySearchWrap />,
	document.getElementById('app')
);