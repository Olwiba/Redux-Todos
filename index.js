import React from 'react'
import { render as renderDom } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

const ADDTASK = 'ADDTASK'
const addTask = (task) => { return {type: ADDTASK, task: task}}

const REMOVETASK = 'REMOVETASK'
const removeTask = (howMuch) => { return {type: REMOVETASK, task: task}}

class Counter extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		input: "",
		todos: ["eat food"]
		}
	}


	handleTodos = () => {
		let newArray = this.state.todos.slice()
		newArray.push(this.state.input) 
		this.setState({todos: newArray})
		this.props.dispatch(this.state.todos)
	}

	handleChange = (e) => {
		this.setState({
			input: e.target.value
		})
	}

	conponentsDidMount = () => {
		this.props.dispatch(this.state.todos)
	}

	render() {
		console.log('______________-',  this.state.input )
		const {todos} = this.state
		return (
			<div>
			<h2>Add some tasks: </h2>
			<input type="text" placeholder="Enter Task" id="task" onChange={this.handleChange}/>
			<button onClick={this.handleTodos}>Add</button>
			<h2>Tasks:</h2>
			<ul>
				{todos.map((todo, i) => {
					return (
						<div key={i}>
						<li id={i}>{todo}</li>
						<button onClick={this.handleTodos}>Remove</button>
						</div>
						)
				})}
			</ul>
			</div>
		)
	}
}

const countReducer = (todos = {todos: []}, action) => {
	switch (action.type) {
		case 'ADDTASK':
			return Object.assign({}, todos, {
				todos: action.task
			})
		case 'REMOVETASK':
			return todos - action.amount
		default: return todos
	}
}

const loggerMiddleware = createLogger()
const store = createStore(
	countReducer,
	applyMiddleware(
		loggerMiddleware
	)
)

const redraw = () => {

	renderDom(
		<Counter todos={store.getState()} dispatch={store.dispatch} />,
		 document.getElementById('app'))
}


store.subscribe(redraw)
redraw()
