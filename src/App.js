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
      {venue: {location: {lat: -22.903260, lng: -43.112730}, categories: [{shortName: "Store"}], name: "Tem Tudo", description: "Utilities Shop"}, referralId:10},
      {venue: {location: {lat: -22.907294, lng: -43.110322}, categories: [{shortName: "Hardware Store"}], name: "Casa Moreira e Souza", description: "Construction Shop"}, referralId:12},
      {venue: {location: {lat: -22.907929, lng: -43.108769}, categories: [{shortName: "Leather Repair"}], name: "Fix Shoes and Purses", description: "Leather work"}, referralId:23},
      {venue: {location: {lat: -22.903667, lng: -43.113935}, categories: [{shortName: "Drugstore"}], name: "Raia Drugstore", description: "Drugstore"}, referralId:34},
      {venue: {location: {lat: -22.904811, lng: -43.111082}, categories: [{shortName: "Produce Shop"}], name: "Recanto do Jambeiro", description: "Produce Shop"}, referralId:45}
    ],
    focusedLoc: "",
    infoWindow: false
  }

  getDetailsAPI = () => {
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

  handleFilter = (query) => {
    this.state.startingPlaces.length === 1 ? this.getDetailsAPI() : console.log('')
    this.setState({ query: query.trim() })
  }

  handleLocFocus = (location) => {
/*    debugger
*/    this.setState({focusedLoc: location.referralId, infoWindow: true})
  }

  handleBlur = (location) => this.setState({infoWindow: false})

  handleLocButtonInput = (location) => {
    let arrayOfOneLoc = []
    arrayOfOneLoc.push(location)
    this.setState({startingPlaces: arrayOfOneLoc})
  }

  handleBackButtonInput = () => {
    this.setState({query: ""})
    this.getDetailsAPI()
  }

  componentDidMount() {
    this.getDetailsAPI()
  }

  render() {
    const { query} = this.state

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
          <aside className="menu column is-2-desktop is-hidden-touch" style={{overflowY: "scroll", scrollBehavior: "smooth"}} aria-label="locations returned from the search">
            <ul className="menu-list">
              {

              locations.map(location => <li
                key={location.venue.name + location.referralId}
                onFocus={() => this.handleLocFocus(location)}
                onBlur={() => this.handleBlur(location)}
                onKeyPress={() => this.handleLocButtonInput(location)}
                onClick={() => this.handleLocButtonInput(location)}>
                <a tabIndex="0">{location.venue.name}</a></li>)
              }
              <li>
                <button className="button is-small is-danger"
                onKeyPress={() => this.handleBackButtonInput()}
                onClick={() => this.handleBackButtonInput()}

                style={(locations.length === 5 | locations.length === 11 | locations.length === 30)
                  ? {display:"none", tabIndex: 0}
                  : {tabIndex: 0}}>Back</button>
              </li>
            </ul>
          </aside>
          <Map
            id="map"
            options={{
              center: { lat: -22.906151, lng: -43.110378 },
              zoom: 15
            }}
            locations={locations}
            focusedLoc={this.state.focusedLoc}
            infoWindow={this.state.infoWindow}
          />         
        </main>
      </div>
    );
  }
}

export default App;
