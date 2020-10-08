
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
		this.state = {
			arr: ["a", "b", "d", "e", "f"]
		}

	}
	componentDidMount() {
		let arr = []
		for (let i = 0 ;i<100;i++){
			arr[i] = i+1
		}
		this.setState({
			arr:arr
		})
    } 
	render() {
		return (
			<div className="square">{
				this.state.arr.map((item, index) => {
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
		this.state = { date: new Date() };
	}



	render() {
		return (
			<div className="sequential_search_wrap">
				<Square />
				{/* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */}
			</div>
		);
	}
}

ReactDOM.render(
	<SequentialSearchWrap />,
	document.getElementById('sequential')
);