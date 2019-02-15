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
			<header className="column navbar is-primary">
				<div>
					<div className="">
							<div className={new String(`dropdown is-hidden-desktop ${this.state.dropdownState}`)} style={{"z-index":"1000"}}>
								<div className="dropdown-trigger is-hidden-desktop">
								  <button id="triggerLocationsList" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								    <span>List</span>
								    <span className="icon is-small">
								      <i className="fas fa-angle-down" aria-hidden="true"></i>
								    </span>
								  </button>
								</div>
						  <div className="dropdown-menu is-hidden-desktop" id="dropdown-menu" role="menu">
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
						<div className="">
							<span> Form for filtering results...</span>
							<i className="white fas fa-search"></i>
						</div>
					</div>
				</div>
			</header>
		)
	}
}

export default Filter