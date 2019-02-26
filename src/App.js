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
    // Holds full list of locations.
    startingPlaces: [],
    // Holds currently typed value on the searchbar (both desktop and mobile viewports).
    query: "",
    // When set to 'true' (by this.handleAlreadyCalled() method), prevent's infinite alerts.
    alreadyCalled: false,
    // When set to 'true' (by this.handleBadConnectionCalled() method), prevent's infinite alerts.
    badConnectionCalled: false,
    // When set to 'true' (by this.handleLocFocus() and this.handleDatalistFocus() methods), show's infowindow.
    infoWindow: false,
    // Sets it's value to the focused location's referral ID on the sidemenu bar (<aside>)
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
   * Shows the infowindow of the last selected location once the datalist is focused (mobile viewport).
   * @method
   */
  handleDatalistFocus = () => {
    this.setState({infoWindow: true})
  }

  /**
   * Hides the infowindow once the datalist lose focus (mobile view).
   * @method
   */
  handleDatalistBlur = () => {
    this.setState({infoWindow: false})
  }

  /**
   * Stop alerts from being infinitelly called on the same query value on the search bar, when there's no matching location stored.
   * @method
   */
  handleAlreadyCalled = () => this.setState({alreadyCalled: true})

  /**
   * Stop alerts from being infinitelly called on the same query value on the search bar, when there's no matching location stored and there's also no connection detected.
   * @method
   */
  handleBadConnectionCalled = () => this.setState({badConnectionCalled: true})

  render() {

    const { query } = this.state

    // Uses RegEx to filter searchbox's input (both on mobile and desktop viewports)
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
      } else if (query.length !== 0 && navigator.onLine === false && locations.length === 0 && this.state.badConnectionCalled === false) {
        window.alert("Please check your connection.")
        this.handleBadConnectionCalled()
      }      

    // <Filter>: Custom React Component for searchbox (desktop) and datalist (mobile), located in the header.
    // <Filter locations>: Passes locations filtered true on this.state.query (searchbar's user input value).
    // <aside>: Sidebar menu for displaying filtered locations.
    // Locations.map(): Iterates over filtered locations to make them buttons for displaying the respective infowindow.
    // button[className="buttonButton is-small is-danger]: Button For displaying the full location list again on the sidebar menu.
    // button[className="buttonButton is-small is-danger].style: Ensures the back button is not shown when the sidebar menu shows all stored locations.
    // <Map>: Custom React Component for displaying the map.
    // <Map locations>: Passes locations filtered true on this.state.query (searchbar's user input value).
    // <Map focusedLoc>: Passes the location's referral id that is currently selected on the sidebar menu (desktop view) so the bounce animation can be shown on the respective marker.
    // <Map infoWindow>: Passes infowindow's status (true/false, i.e.: open/closed)
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
                style={(locations.length === 11 | locations.length === 30)
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
