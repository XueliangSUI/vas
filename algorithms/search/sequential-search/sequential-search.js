function activateLasers(e) {
	e.preventDefault();
	console.log('The link was clicked.');
}
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

class SequentialSearchWrap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arr: [],
			numberToBeFounded: 0,
			indexNow: 0,
			allCells: null,
			autoText: '自动'
		};
	}
	componentDidMount() {
		// 1、初始化乱序待查询区域
		let arr = []
		for (let i = 0; i < 100; i++) {
			arr[i] = i + 1
		}
		arr.sort(() => {
			return Math.random() - 0.5
		})

		// console.log(this.state.arr)
		// 2、初始化待查询数字
		let numberToBeFounded = Math.floor(Math.random() * 100)
		this.setState({
			arr: arr,
			numberToBeFounded: numberToBeFounded
		})
		// 


	}
	// 点击下一步
	nextStep(index) {
		//判断allCells有没有值
		if (this.state.allCells == null) {
			// 若未初始化allCells则为其初始化
			this.setState({
				allCells: document.querySelectorAll(".cell")
			}, () => {
				this.nextStep(index)
			})
			return
			// console.log(this.state.allCells)

		}

		if (index - 1 >= 0) {
			this.state.allCells[index - 1].classList.remove("cell_on")
		}


		this.state.allCells[index].classList.add("cell_on")
		// console.log(this.state.allCells[index].innerText)
		// 判断查询结果
		if (this.state.numberToBeFounded == this.state.allCells[index].innerText) {
			msgQueue.pushMsgQueue({
				title: "查找完成",
				text: `顺序查找已完成，共查找${this.state.indexNow}次。`
			})
			this.setState({
				autoText: '自动'
			})
			clearInterval(window.timer)
			return
		}
		// 索引加一
		index <= 99 ? this.setState({ indexNow: this.state.indexNow + 1 }) : this.state.indexNow = 0

	}

	// 点击自动
	autoNext() {
		if (this.state.autoText == '自动') {
			window.timer = setInterval(() => {
				this.nextStep(this.state.indexNow)
			}, 200);
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
		this.setState({
			autoText: "自动"
		})
		clearInterval(window.timer)

		console.log(this.state)
		// 重置查找
		if (this.state.allCells != null) {
			for (let item of this.state.allCells ){
				item.classList.remove('cell_on')
			}
		}




		this.state.arr.sort(() => {
			return Math.random() - 0.5
		})
		let numberToBeFounded = Math.floor(Math.random() * 100)
		this.setState({
			arr: this.state.arr,
			numberToBeFounded: numberToBeFounded,
			indexNow: 0
		})
	}

	render() {
		return (
			<div className="sequential_search_wrap">
				<TextLine numberToBeFounded={this.state.numberToBeFounded} indexNow={this.state.indexNow} />
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
			<p>查找次数：{this.props.indexNow}</p>
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
	<SequentialSearchWrap />,
	document.getElementById('app')
);