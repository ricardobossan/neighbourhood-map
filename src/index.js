/**
 * # TODOS - [PROJECT SPECIFICATION](https://review.udacity.com/#!/rubrics/1351/view):

 * @todo
 *  --> filter.js onChange={if(location.length === 1) new request for data and all logic inside filter again}
 *  --> if that isn't enough,back button (or get all locations again), on top of aside, to call for Squarespace API again
 * ## Offline Use
 *  --> WATCH PLAYLIST REACT SERVICE WORKER (my own)
 *  --> add working service worker, to have offline content when there's no wifi
 * @todo
 * ## FINISH
 *  --> refine style
 *  --> comment the whole thing
 *  --> complete README
 *    --> Credits due:
 *       - [Traversy Media' Youtube Channel for Crash Course on Bulma CSS Framework](https://www.youtube.com/watch?v=IiPQYQT2-wg)
 *       - [Prnautica.com, for marker icon](https://prnautica.com/wp-content/uploads/2015/12/map-marker-icon.png)
 *  --> review rubric
 *  --> send project for review
 *
 * ## DONE
 * @todo OK
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
/*import * as serviceWorker from './serviceWorker';
*/
ReactDOM.render(<App />, document.getElementById('root'));

/**
 * Registers service worker
 */
/*navigator.serviceWorker
	.register('./sw.js').then(reg => console.log('Service Worker: registered', reg)
	)
	.catch((err) => {
		console.log(err);
	});
*/
/*Antes era algo assim, criado na CLI pelo create-react-app*/
/*serviceWorker.unregister()*/