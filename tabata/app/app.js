var SettingsDefault = {
	set: 8,
	duration: 20,
	rest: 10
}

var SettingsStore = {
	set: 0,
	current: 0,
	duration: 0,
	rest: 0
}

function exerciseLoop() {
	if (SettingsStore.set > SettingsStore.current) {
		SettingsStore.current += 1;
		var message = '총 ' + SettingsStore.set + ' 세트중,\n ' + SettingsStore.current + '번째 세트입니다.';
		ReactAppend(<CountDownBox countDownTime={SettingsStore.duration} message={message} type='exercise' />);
	} else {
		ReactAppend(<MessageBox message='모든 운동이 끝났습니다!' />);
	}
}

var Sound = {
	near: new Audio('static/sound/near.wav'),
	done: new Audio('static/sound/done.wav')
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
		SettingsStore.set = this.state.set;
		SettingsStore.current = 0;
		SettingsStore.duration = this.state.duration;
		SettingsStore.rest = this.state.rest;

		exerciseLoop();
	},
	render: function() {
		return (
			<div className="card-box settings">
				<h3 className="title">운동 설정</h3>
				<ul>
					<li className="input-text">
						<label>총 세트</label>
						<input type="number" defaultValue={this.state.set} ref="set" onChange={this.handleSetChange}/>
					</li>
					<li className="input-text">
						<label>세트당 운동 시간 (초)</label>
						<input type="number" defaultValue={this.state.duration} ref="duration" onChange={this.handleDurationChange}/>
					</li>
					<li className="input-text">
						<label>세트간 휴식 시간 (초)</label>
						<input type="number" defaultValue={this.state.rest} ref="rest" onChange={this.handleRestChange}/>
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
	getInitialState: function() {
		return {
			countDownTime: this.props.countDownTime,
			restTime: this.props.restTime,
			status: 'doing'
		};
	},
	componentDidMount: function() {
		this.timer = setInterval(this.tick, 1000);
	},
	afterAction: function() {
		if (this.props.type === 'exercise') {
			var message = '세트가 끝났습니다!\n 휴식을 취하세요.';
			ReactAppend(<CountDownBox countDownTime={SettingsStore.rest} type='rest' message={message} />);
		} else if (this.props.type === 'rest') {
			exerciseLoop();
		}
	},
	tick: function() {
		var before = this.state.countDownTime;
		if (before === 1) {
			this.setState({
				countDownTime: '끝',
				status: 'done'
			});
			Sound.done.load();
			Sound.done.play();
			clearInterval(this.timer);

			this.afterAction();
		} else if (before < 5) {
			this.setState({
				countDownTime: before - 1,
				status: 'near'
			});
			Sound.near.load();
			Sound.near.play();

		} else {
			this.setState({countDownTime: before - 1});
		}
	},
	render: function() {
		return (
			<div className="card-box count-down padding-15">
				<div className="message">
					<pre>{this.props.message.toString()}</pre>
				</div>
				<span className="time" data-status={this.state.status}>{this.state.countDownTime}</span>
			</div>
		);
	}
});

var MessageBox = React.createClass({
	render: function() {
		return (
			<div className="card-box message-box">
				<div className="message">{this.props.message}</div>
			</div>
		)
	}
});

function ReactAppend(a) {
	var reactBoxWrap = document.getElementById('react-boxes');
	var reactBox = document.createElement('div');
	reactBox.className = 'react-box';
	reactBoxWrap.appendChild(reactBox);

	React.render(a, reactBox);
	$('html,body').animate({scrollTop: $(reactBox).offset().top}, 'slow');
}
ReactAppend(<SettingsBox />);
