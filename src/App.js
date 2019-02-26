import React, { Component } from 'react'
import axios from 'axios'
import escRegExp from 'escape-string-regexp'
import Filter from './Filter.js'
import Map from "./Map.js"
import './App.css';

/**
 * Main component. Hub for components.
 * @class
 */
class App extends Component {

  state = {
    startingPlaces: [],
    query: "",
    alreadyCalled: false,
    badConnectionCalled: false,
    infoWindow: false,
    focusedLoc: ""
  }

  // First, call API for locations
  componentDidMount() {
    this.getDetailsAPI()
    }

  /**
   * Calls the Foursquare API, with the locations.
   * @method
   */
  getDetailsAPI = () => {
    if(localStorage.locations) {
      this.setState({startingPlaces: JSON.parse(localStorage.locations)})
      return
    }
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
      localStorage.setItem("locations", JSON.stringify(res.data.response.groups[0].items))
      this.setState({startingPlaces:res.data.response.groups[0].items}) 
   })
    .catch(err => console.log(err.response))
  }

  /**
   * Once there's user input in the searchbar (Filter.js), it's value is lifted up to this main component, saved in state as 'query', be later used to filter through locations.
   * @method
   */
  handleFilter = (query) => {
    this.setState({ query: query.trim(), alreadyCalled: false, badConnectionCalled: false})
  }

  /**
   * Ensures that the infowindow is shown only in the location currently on focus (passed in as argument) in the sidebar menu of the location list, in the desktop viewport.
   * @method
   */
  handleLocFocus = (location) => {
    this.setState({focusedLoc: location.referralId, infoWindow: true})
  }

  /**
   * Ensures that once a location on the sidebar (desktop viewport) loses focus, it's infowindow will no longer show.
   * @method
   */
  handleBlur = (location) => this.setState({infoWindow: false})

  /**
   * Pressing or clicking a location on the sidebar menu (viewport desktop) will selecte it, so only that will be shown on the sidebar.
   * @method
   */
  handleLocButtonInput = (location) => {
    let arrayOfOneLoc = []
    arrayOfOneLoc.push(location)
    this.setState({startingPlaces: arrayOfOneLoc})
  }

  /**
   * Click or press on the back button restores full locations list on the sidebar menu (desktop viewport).
   * @method
   */
  handleBackButtonInput = () => {
    this.setState({query: "", alreadyCalled: false, badConnectionCalled: false})
    this.getDetailsAPI()
  }

  /**
   * 
   * @method
   */
  handleDatalistFocus = () => {
    this.setState({infoWindow: true})
  }

  /**
   *
   * @method
   */
  handleDatalistBlur = () => {
    this.setState({infoWindow: false})
  }

  /**
   *
   * @method
   */
  handleAlreadyCalled = () => this.setState({alreadyCalled: true})

  /**
   *
   * @method
   */
  handleBadConnectionCalled = () => this.setState({badConnectionCalled: true})

  render() {

    const { query } = this.state
    let locations = []
    if(query.length > 0) {
      const match = new RegExp(escRegExp(query, 'i'))
      locations = this.state.startingPlaces.filter((location) => match.test(location.venue.name))
    } else {
        locations = this.state.startingPlaces
      }
      /* Call handlers to alert to the user if a online word search finds no locations, if the search for that word wasn't just made */
      if(query.length !== 0 && navigator.onLine === true && locations.length === 0 && this.state.alreadyCalled === false) {
        window.alert("The location you're looking for was not found.")
        this.handleAlreadyCalled()
      /* Call handlers to alert to the user if a offline word search finds no locations, if the search for that word wasn't just made */
      } else if(query.length !== 0 && navigator.onLine === false && locations.length === 0 && this.state.badConnectionCalled === false) {
        window.alert("Please check your connection.")
        this.handleBadConnectionCalled()
      }      

    return (
      <div className="App">
        <Filter
          locations={locations}
          onFilter={this.handleFilter}
          handleDatalistFocus={this.handleDatalistFocus}
          handleDatalistBlur={this.handleDatalistBlur}
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
            mapId="map"
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
