/**
 * # TODOS - [PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/1351/view):
 *
 * @todo
 * ## Offline Use
 *	DONE --> Made locations available offline with localStorage
 *  DONE --> add working service worker, to have offline content when there's no wifi
 *	DONE --> handle possible lack of functionality due to loss of internet connection with alerts.
 *	DONE --> Alerts for loss of connection for 0 locations and for map load are repeating themselves. Implement the same way I did for search with App.state.alreadyCalled
 *		- Search bar (mobile and desktop)
 *		- Map
 *	OPTIONAL --> Save all information about how to run the site with service worker, in order to make a guide in README.md, with references
 *  OPTIONAL --> WATCH PLAYLIST REACT SERVICE WORKER (my own)
 *	OPTIONAL --> try to get initial data from localStorage (obviously, you'll first have to set localStorage with the fetched foursquare API results)
 * @todo
 * ## FINISH
 *  DONE --> refine style
 *  DONE --> comment the whole thing
 *  DONE --> complete README
 *    DONE --> Credits due:
 *       - [Traversy Media' Youtube Channel for Crash Course on Bulma CSS Framework](https://www.youtube.com/watch?v=IiPQYQT2-wg)
 *       - [Prnautica.com, for marker icon](https://prnautica.com/wp-content/uploads/2015/12/map-marker-icon.png)
 *  --> review rubric
 *  --> send project for review
 *
 * @todo
 * ## AFTER GRADUATION, MAYBE
 *	--> add a input to choose the type of search to make, which should automatically make 2 API calls: one for google maps and another for those addresses in Foursquare.
 *
 * ## DONE
 * ## Interface Design
 *  DONE --> Make application responsive on any device
 * ## Application Functionality
 *  #### Location Filter
 *    DONE --> text input that filters as the user types, displaying results on the view (restricting markers?)
 *      DONE --> Use regular expressions as in previous projects
 *      DONE --> What is the state for the filter and aside
 *      DONE --> Where there's state for the filter and aside
 *    DONE --> (Branch: `input-datalist`) On touch viewport, use Bulma's property `datalist`, instead of a dropdown and a filter text box. See how it's done and if it works both with dropdown data and how I learned to filter
 * @todo 
 *  #### List View
 *    DONE --> _1° Requirement_: USE THE BULMA CSS FRAMEWORK! create a list view, whose state starts with all locations, but, when results are filtered, shows only these results. Mobile First! Maybe use an hamburger menu from [Bulma](https://bulma.io/documentation/components/dropdown/)
 *      DONE --> <aside> tagEvent listener for resize and conditional ternary for global.innerWidth >= 700
 *      DONE --> _1° Requirement_: [should I update classes using state, or make components with conditional rendering?](https://stackoverflow.com/questions/36403101/toggle-class-in-react/36404061)
 *      DONE --> _2° Requirement_: When a location in the List-view is clicked, it triggers it's marker's animation and infowindow
 *			DONE --> locations bar, when a location is focused, state changes, so it's infoWindow will show on true, because props true for that referral ID 'll will be passed upon it on focus
 *			DONE --> On Map.js, If there's only 1 location left, show it's InfoWindow
 *  		DONE --> If that isn't enough, back button (or get all locations again), on top of aside, to call for Squarespace API again
 *  		DONE --> On Filter.js, onChange={if(location.length === 1) new request for data and filter again based on current input value ( App.state.query | e.target.value)}
 *			OPTIONAL --> https://builtvisible.com/hierarchical-composed-state-react-js/
 *			OPTIONAL --> https://reactjs.org/docs/context.html
* @todo
 * ## Accessibility
 *  DONE --> add/modify semantic elements and, subsidiarily, `aria roles`
 * @todo
 * ## @todo MAYBE add cms, like squarespace, to retrieve locations data
 *  DONE --> implement API for locations details
    ```
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Registers service worker
 * @func
 */
serviceWorker.register()