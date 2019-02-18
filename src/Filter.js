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
		const { query, onFilter } = this.props

		return (
			<div>
				<header className="column navbar is-primary">
					<div className="is-hidden-desktop">
						<input defaultValue="" value={query} onChange={(event) => onFilter(event.target.value)} placeholder="Input is case sensitive" list="myLocations" id="location-choice" name="location-choice" />
						<datalist id="myLocations" style={{"margin":"auto"}}>
						{
							/* filteredResult ? filteredResult : startingLocations */
							this.props.locations.map(location => <option key={location.referralId + location.venue.name}>{location.venue.name}</option>)
						}
						</datalist>
					</div>
					<input className="is-hidden-touch" defaultValue="" value={query} onChange={(event) => onFilter(event.target.value)} placeholder="Input is case sensitive" type="text" name="location-choice" />

				</header>
			</div>
		)
	}
}

export default Filter