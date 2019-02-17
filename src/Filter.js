import React, { Component } from 'react'

class Filter extends Component {
	
	state = {
		dropdownState: ""
	}
/*
	componentDidMount() {
		let triggerLocationsList = document.getElementById('triggerLocationsList')
		triggerLocationsList.addEventListener('click', () => this.state.dropdownState === "" ? this.setState({dropdownState: "is-active"}) : this.setState({dropdownState: ""}))
	}
*/
	render() {

		console.log(this.props)
		const { locations } = this.props
		console.log(locations)

		return (
			<div>
				<header className="column navbar is-primary">
					<div className="is-hidden-desktop">
						<input placeholder="Choose a location" list="myLocations" id="location-choice" name="location-choice" />
						<datalist id="myLocations" style={{"margin":"auto"}}>
						{
							/* filteredResult ? filteredResult : startingLocations */
							locations.map(location => <option key={location.id}>{location.title}</option>)
						}
						</datalist>
					</div>
					<div className="is-hidden-touch">
						<span> Form for filtering results...</span>
						<i className="white fas fa-search"></i>
					</div>
				</header>
			</div>
		)
	}
}

export default Filter