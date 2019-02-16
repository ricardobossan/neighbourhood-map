/**
 * # TODOS - [PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/1351/view):

 * @todo 
 * ## Application Functionality
 *   #### Location Filter
 *     --> (Branch: `input-datalist`) On touch viewport, use Bulma's property `datalist`, instead of a dropdown and a filter text box. See how it's done and if it works both with dropdown data and how I learned to filter
 *     --> text input that filters as the user types, displaying results on the view (restricting markers?)
 *   #### List View
 *     --> _1° Requirement_: USE THE BULMA CSS FRAMEWORK! create a list view, whose state starts with all locations, but, when results are filtered, shows only these results. Mobile First! Maybe use an hamburger menu from [Bulma](https://bulma.io/documentation/components/dropdown/)
 *       --> Bulma><nav className="nav-menu is-active"></nav>
 *       or
 *       --> <aside> tagEvent listener for resize and conditional ternary for global.innerWidth >= 700
 *       
 *     --> _1° Requirement_: [should I update classes using state, or make components with conditional rendering?](https://stackoverflow.com/questions/36403101/toggle-class-in-react/36404061)
 *     --> _2° Requirement_: When a location in the List-view is clicked, it triggers it's marker's animation and infowindow
 * @todo
 * ## Accessibility
 *   add/modify semantic elements and, subsidiarily, `aria roles`
 * @todo
 * ## Offline Use
 *   add working service worker, to have offline content when there's no wifi
 * @todo
 * ## @todo MAYBE add cms, like squarespace, to retrieve locations data
 *   #### New Subtask
 *      --> 
 * @todo
 * ## FINISH
 *   --> If app needs to be faster, try replacing triggerLocationsList by a simple <select> element
 *   --> comment the whole thing
 *   --> complete README
 *     --> Credits due:
 *       - [Traversy Media' Youtube Channel for Crash Course on Bulma CSS Framework](https://www.youtube.com/watch?v=IiPQYQT2-wg)
 *   --> review rubric
 *   --> upon project submission, leave `note` for the reviewer: 
    ```
    Understood that could just hardcode information about locations, instead of making API requests to services like Square Space, due to project specification in `Application Architecture`: `There are at least 5 locations in the model. These **may be hard-coded** **_or_** retrieved from a data API.`
 *
 * ## DONE
 * @todo OK
 * ## Interface Design
 *   --> Make application responsive on any device
    ```
 */

import React, { Component } from 'react';
import Filter from './Filter.js'
import Map from "./Map.js"
import './App.css';

class App extends Component {

  render() {

    /**
     * Add 5 locations with lat/lng, title and description values
     */
    const locations = [
      {title: "Tem Tudo", description: "Utilities Shop", lat: -22.903260, lng: -43.112730},
      {title: "Casa Moreira e Souza", description: "Construction Shop", lat: -22.907294, lng: -43.110322},
      {title: "Fix Shoes and Purses", description: "Leather work", lat: -22.907929, lng: -43.108769},
      {title: "Raia Drugstore", description: "Drugstore", lat: -22.903667, lng: -43.113935},
      {title: "Recanto do Jambeiro", description: "Produce Shop", lat: -22.904811, lng: -43.111082}
    ]

    return (
      <div className="App">
        <Filter />
        <main>
          <aside className="menu column is-3-desktop is-hidden-touch">
            <p className="menu-label">
              General
            </p>
            <ul className="menu-list">
              <li><a>Dashboard</a></li>
              <li><a>Customers</a></li>
            </ul>
            <p className="menu-label">
              Administration
            </p>
            <ul className="menu-list">
              <li><a>Team Settings</a></li>
              <li>
                <a className="is-active">Manage Your Team</a>
                <ul>
                  <li><a>Members</a></li>
                  <li><a>Plugins</a></li>
                  <li><a>Add a member</a></li>
                </ul>
              </li>
              <li><a>Invitations</a></li>
              <li><a>Cloud Storage Environment Settings</a></li>
              <li><a>Authentication</a></li>
            </ul>
            <p className="menu-label">
              Transactions
            </p>
            <ul className="menu-list">
              <li><a>Payments</a></li>
              <li><a>Transfers</a></li>
              <li><a>Balance</a></li>
            </ul>
          </aside>
          <Map
            id="map"
            options={{
              center: { lat: -22.906151, lng: -43.110378 },
              zoom: 15.2
            }}
            locations={locations}
          />
        </main>
      </div>
    );
  }
}

export default App;
