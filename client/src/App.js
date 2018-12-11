import React, { Component } from 'react'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			events: [],
			event: {
				name: 'Peter Hyatt',
				date: '2018-10-04',
				birthday: '1',
				content: 'This is a birthday event'
			}
		}
	}
	
	getEvents = () => {
		fetch('http://localhost:3005/events')
		.then(response => response.json())
		.then(response => this.setState({ events: response }))
		// .then(() => console.log(this.state.events))
		.catch(error => console.error(error))
	}
	
	addEvent = () => {
		const { event } = this.state
		fetch(`http://localhost:3005/events/add/?name=${event.name}&date=${event.date}&birthday=${event.birthday}&content=${event.content}`)
		.then(this.getEvents)
		.catch(error => console.error(error))
		this.setState({
			event: {
				name: 'Peter Hyatt',
				date: '2018-10-04',
				birthday: '1',
				content: 'This is a birthday event'
			} 
		})
	}

	componentDidMount() {
		this.getEvents()
	}		
	
	renderEvents = ({ id, name, date, birthday, content }) => 
		<div key={id}>
			<ul>
				{name} {date} {birthday} {content}
			</ul>
		</div>


	render() {
		const { events, event } = this.state
		return (
			<div className="App">
				<div>
					<input 
						value={event.name} 
						placeholder={'Name'}
						onChange={e => this.setState({event: { ...event, name: e.target.value }})} 
						/>
					<input 
						value={event.date} 
						placeholder={'Date'}
						onChange={e => this.setState({event: { ...event, date: e.target.value }})} 
						/>
					<input 
						value={event.birthday} 
						placeholder={'Birthday? 0/1'}
						onChange={e => this.setState({event: { ...event, birthday: e.target.value }})} 
						/>
					<input 
						value={event.content} 
						placeholder={'Content'}
						onChange={e => this.setState({event: { ...event, content: e.target.value }})} 
					/>
					<button onClick={this.addEvent}>
						Add event
					</button>
				</div>
				{events.map(this.renderEvents)}
			</div>
		)
	}
}

export default App
