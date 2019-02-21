import React, { Component } from 'react'

class Filter extends Component {
	
	render() {

		const { query, onFilter } = this.props

		return (
			<div tabIndex="-1">
				<header className="column navbar is-primary">
					<div className="is-hidden-desktop" aria-live="assertive" aria-atomic="true" >
						<input onFocus={() => this.props.handleDatalistFocus()} onBlur={() => this.props.handleDatalistBlur()} defaultValue="" value={query} onChange={(event) => onFilter(event.target.value)} placeholder="Input is case sensitive" list="myLocations" id="location-choice" name="location-choice" aria-label="Search locations (Case Sensitive" />
						<datalist id="myLocations" style={{"margin":"auto"}}>
						{
							/* filteredResult ? filteredResult : startingLocations */
							this.props.locations.map(location => <option key={location.referralId + location.venue.name}>{location.venue.name}</option>)
						}
						</datalist>
					</div>
					<input className="is-hidden-touch" defaultValue="" value={query} onChange={(event) => onFilter(event.target.value)} placeholder="Input is case sensitive" type="text" name="location-choice" aria-label="Search Locations (Case Sensitive" />

				</header>
			</div>
		)
	}
}

export default Filter