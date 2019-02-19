import React, { Component } from 'react'
import axios from 'axios'
import escRegExp from 'escape-string-regexp'
import Filter from './Filter.js'
import Map from "./Map.js"
import './App.css';

class App extends Component {

  state = {
    query: "",
    startingPlaces: [
      {venue: {location: {lat: -22.903260, lng: -43.112730}, categories: [{shortName: "Store"}], name: "Tem Tudo", description: "Utilities Shop", referralId:10}},
      {venue: {location: {lat: -22.907294, lng: -43.110322}, categories: [{shortName: "Hardware Store"}], name: "Casa Moreira e Souza", description: "Construction Shop", referralId:12}},
      {venue: {location: {lat: -22.907929, lng: -43.108769}, categories: [{shortName: "Leather Repair"}], name: "Fix Shoes and Purses", description: "Leather work", referralId:23}},
      {venue: {location: {lat: -22.903667, lng: -43.113935}, categories: [{shortName: "Drugstore"}], name: "Raia Drugstore", description: "Drugstore", referralId:34}},
      {venue: {location: {lat: -22.904811, lng: -43.111082}, categories: [{shortName: "Produce Shop"}], name: "Recanto do Jambeiro", description: "Produce Shop", referralId:45}}
    ]
  }
  handleFilter = (query) => this.setState({ query: query.trim() })

  handleDesktopClickOrEnter = (e, location) => {
    let arrayOfOneLoc = []
    arrayOfOneLoc.push(location)
    this.setState({startingPlaces: arrayOfOneLoc})
  }

  componentDidMount() {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id: "NRQZ3OTXP3KJH05HXL3RKRKRTF3WJW4MCNMHZFPIY3HKVWHH",
    client_secret: "GTDZ10LLV2HYUJBTSRWV1ULDBWKXBJDZ5EQ4HAEZTCVG4AL4",
    query: "food",
    ll: "-22.906151,-43.110378",
    v: "20190223",
    radius:1000
  }


  axios.get(endPoint + new URLSearchParams(parameters))
    .then(res => {
      this.setState({startingPlaces: res.data.response.groups[0].items}) 
    })
    .catch(err => console.log(err.response))
  }

  render() {
    const { query } = this.state

    let locations = []
    if(query.length > 0) {
      const match = new RegExp(escRegExp(query, 'i'))
      locations = this.state.startingPlaces.filter((location) => match.test(location.venue.name))
    } else {
        locations = this.state.startingPlaces
      }

    return (
      <div className="App">
        <Filter
          locations={locations}
          onFilter={this.handleFilter}
        />
        <main>
          <aside className="menu column is-3-desktop is-hidden-touch" aria-label="locations returned from the search">
            <ul className="menu-list">
              {

              locations.map(location => <li key={location.venue.name + location.referralId} onKeyPress={(event) => this.handleDesktopClickOrEnter(event, location)} onClick={(e) =>
                {
/*                  debugger
*/                  this.handleDesktopClickOrEnter(e, location)
                }}><a  tabIndex="0">{location.venue.name}</a></li>)
              }
            </ul>
          </aside>
          <Map
            id="map"
            options={{
              center: { lat: -22.906151, lng: -43.110378 },
              zoom: 15
            }}
            locations={locations}
          />         
        </main>
      </div>
    );
  }
}

export default App;
