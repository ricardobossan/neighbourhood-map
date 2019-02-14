import React, { Component } from 'react'

class Filter extends Component {
	
	state = {
		dropdownState: ""
	}

	componentDidMount() {
		let triggerLocationsList = document.getElementById('triggerLocationsList')
		triggerLocationsList.addEventListener('click', () => this.state.dropdownState == "" ? this.setState({dropdownState: "is-active"}) : this.setState({dropdownState: ""}))
	}

	render() {
		return (
			<div>
				<div className="column button is-primary">
					<div className="">
						<span> Form for filtering results...</span>
						<i className="white fas fa-search"></i>
					</div>
				</div>
				<div className={new String(`dropdown ${this.state.dropdownState}`)} style={{"display": "flex", "justify-content": "space-around","width":"100vw","min-width":"100vw"}}>
				  <div className="dropdown-trigger">
				    <button id="triggerLocationsList" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
				      <span>Location Results</span>
				      <span className="icon is-small">
				        <i className="fas fa-angle-down" aria-hidden="true"></i>
				      </span>
				    </button>
				  </div>
				  <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{"width":"100vw","min-width":"100vw"}}>
				    <div className="dropdown-content">
				      <a href="#" className="dropdown-item">
				        Dropdown item
				      </a>
				      <a className="dropdown-item">
				        Other dropdown item
				      </a>
				      <a href="#" className="dropdown-item">
				        Active dropdown item
				      </a>
				      <a href="#" className="dropdown-item">
				        Other dropdown item
				      </a>
				      <hr className="dropdown-divider"/>
				      <a href="#" className="dropdown-item">
				        With a divider
				      </a>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
}

export default Filter