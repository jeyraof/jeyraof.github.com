var SettingsDefault = {
	set: 8,
	duration: 20,
	rest: 10
}
var SettingsBox = React.createClass({
	getInitialState: function() {
		return {
			set: SettingsDefault.set,
			duration: SettingsDefault.duration,
			rest: SettingsDefault.rest
		}
	},
	handleSetChange: function(e) {this.setState({set: parseInt(e.target.value)});},
	handleDurationChange: function(e) {this.setState({duration: parseInt(e.target.value)});},
	handleRestChange: function(e) {this.setState({rest: parseInt(e.target.value)});},
	handleReset: function(e) {
		e.preventDefault();
		this.refs.set.getDOMNode().value = SettingsDefault.set;
		this.refs.duration.getDOMNode().value = SettingsDefault.duration;
		this.refs.rest.getDOMNode().value = SettingsDefault.rest;
	},
	handleStart: function(e) {
		e.preventDefault();
		console.log(this.state);
	},
	render: function() {
		return (
			<div className="card-box settings">
				<h3 className="title">운동 설정</h3>
				<ul>
					<li className="input-text">
						<label>총 세트</label>
						<input type="text" defaultValue={this.state.set} ref="set" onChange={this.handleSetChange}/>
					</li>
					<li className="input-text">
						<label>세트당 운동 시간 (초)</label>
						<input type="text" defaultValue={this.state.duration} ref="duration" onChange={this.handleDurationChange}/>
					</li>
					<li className="input-text">
						<label>세트간 휴식 시간 (초)</label>
						<input type="text" defaultValue={this.state.rest} ref="rest" onChange={this.handleRestChange}/>
					</li>
				</ul>
				<div className="right-btn-group">
					<button onClick={this.handleStart}>시작</button>
					<button onClick={this.handleReset}>리셋</button>
				</div>
			</div>
		);
	}
});

var CountDownBox = React.createClass({
	render: function() {
		return (
			<div className="card-box count-down">
				{this.props.time}
			</div>
		);
	}
});

function ReactAppend(a, t) {
	var reactBoxWrap = t;
	var reactBox = document.createElement('div');
	reactBox.className = 'react-box';
	t.appendChild(reactBox);

	React.render(a, reactBox);
}
ReactAppend(<SettingsBox />, document.getElementById('react-boxes'));
