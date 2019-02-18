/**
 * # TODOS - [PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/1351/view):

 * @todo 
 *   #### List View
 *     DONE --> _1° Requirement_: USE THE BULMA CSS FRAMEWORK! create a list view, whose state starts with all locations, but, when results are filtered, shows only these results. Mobile First! Maybe use an hamburger menu from [Bulma](https://bulma.io/documentation/components/dropdown/)
 *       DONE --> <aside> tagEvent listener for resize and conditional ternary for global.innerWidth >= 700
 *       
 *     DONE --> _1° Requirement_: [should I update classes using state, or make components with conditional rendering?](https://stackoverflow.com/questions/36403101/toggle-class-in-react/36404061)
 *     --> _2° Requirement_: When a location in the List-view is clicked, it triggers it's marker's animation and infowindow
 * @todo
 * ## Accessibility
 *   --> add/modify semantic elements and, subsidiarily, `aria roles`
 * @todo
 * ## Offline Use
 *   --> add working service worker, to have offline content when there's no wifi
 * @todo
 * ## @todo MAYBE add cms, like squarespace, to retrieve locations data
 *   #### New Subtask
 *      --> 
 * @todo
 * ## FINISH
 *   --> refine style
 *   --> comment the whole thing
 *   --> complete README
 *     --> Credits due:
 *       - [Traversy Media' Youtube Channel for Crash Course on Bulma CSS Framework](https://www.youtube.com/watch?v=IiPQYQT2-wg)
 *   --> review rubric
 *   --> send project for review
 *
 * ## DONE
 * @todo OK
 * ## Interface Design
 *   DONE --> Make application responsive on any device
 * ## Application Functionality
 *   #### Location Filter
 *     DONE --> text input that filters as the user types, displaying results on the view (restricting markers?)
 *       DONE --> Use regular expressions as in previous projects
 *       DONE --> What is the state for the filter and aside
 *       DONE --> Where there's state for the filter and aside
 *     DONE --> (Branch: `input-datalist`) On touch viewport, use Bulma's property `datalist`, instead of a dropdown and a filter text box. See how it's done and if it works both with dropdown data and how I learned to filter
    ```
 */

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

  /*
   * Add 5 locations with lat/lng, title and description values
   */
/*  startingLocations = [
      {venue: {location: {lat: -22.903260, lng: -43.112730}, name: "Tem Tudo", description: "Utilities Shop", id:"0"}},
      {venue: {location: {lat: -22.907294, lng: -43.110322}, name: "Casa Moreira e Souza", description: "Construction Shop", id:"1"}},
      {venue: {location: {lat: -22.907929, lng: -43.108769}, name: "Fix Shoes and Purses", description: "Leather work", id:"2"}},
      {venue: {location: {lat: -22.903667, lng: -43.113935}, name: "Raia Drugstore", description: "Drugstore", id:"3"}},
      {venue: {location: {lat: -22.904811, lng: -43.111082}, name: "Recanto do Jambeiro", description: "Produce Shop", id:"4"}}
    ]
*/
  handleFilter = (query) => this.setState({ query: query.trim() })

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
      console.log(res)
      this.setState({startingPlaces: res.data.response.groups[0].items}) 
    })
    .catch(err => console.log(err.response))

/*  this.setState({startingPlaces: foursquareAPI.getAPI()})
*/  }

  render() {

/*    let locations = this.state.filteredLocations.length === 0 ? this.startingPlaces : this.state.filteredLocations
    const { query } = this.state
*/
    const { query, startingPlaces } = this.state
    console.log(this.state)
/*    this.state.startingPlaces.length > 0 ? console.log(this.state.startingPlaces) : console.log("logs nothing")
*/    

    let locations = []
    if(query.length > 0) {
      const match = new RegExp(escRegExp(query, 'i'))
      locations = this.state.startingPlaces.filter((location) => match.test(location.venue.name))
    } else {
        locations = this.state.startingPlaces
      }
      console.log(locations)

    return (
      <div className="App">
        <Filter
          locations={locations}
          onFilter={this.handleFilter}
        />
        <main>
          <aside className="menu column is-3-desktop is-hidden-touch">
            <ul className="menu-list">
              {
              locations.map(location => <li key={location.venue.name + location.referralId}><a>{location.venue.name}</a></li>)
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
