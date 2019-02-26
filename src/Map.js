/**
 * @file Map.js
 */

import React, { Component } from 'react';

/**
 * Displays the map, markers and dynamically modified infowindow.
 * @class
 */
class Map extends Component {

  state = {
    // state set to make sure that when the value is set to true, the alert for possible non rendering due to network connectivety problems is not infinitelly recalled.    
    mapWasCalled: false
  }

  /**
   * Loads and instance of google.maps.Map, from the Google Maps API.
   * @method
   */
  loadAPI = () => {

    // Loads API and creates a map.
    const map = new window.google.maps.Map(
      document.getElementById(this.props.mapId),
      this.props.options);
    window.map = map

  }

  /**
   * Iterate over locations and add markers to them. When a location is selected, either on the sidebar menu or in a searchbox, the instance of google.maps.InfoWindow will show and it's content will be set to the corresponding marker's location.
   * @method
   */
  loadMarkers = (map, locations) => {
    // Creates an instance of google.maps.InfoWindow.
    const infowindow = new window.google.maps.InfoWindow()
    // Closes previously generated instances of google.maps.InfoWindow.
    infowindow.close()
    // Sets previous generated instances of google.maps.Marker to a null map value, so they will not be displayed when it's time to call newer instances of it.
    window.markers.forEach(marker => marker.setMap(null))
    // Sets a custom marker icon.
    const image = {
      url: "https://prnautica.com/wp-content/uploads/2015/12/map-marker-icon.png",
      size: new window.google.maps.Size(25, 25),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };
    // Creates new markers for filtered, pressed or clicked locations.
    locations.forEach((loc, i) => {
      window.markers.push(i = new window.google.maps.Marker({
      position: { lat: loc.venue.location.lat, lng: loc.venue.location.lng },
      icon: image,
      animation: null,
      map: map,
      title: loc.venue.name
      }))
      // Ensures that, either if a sidebar menu location is focused, pressed or clicked, or if there's only one filtered location left, it's InfoWindow is shown on the correspondent marker, with the correspondent data. The respective marker should do a bouncing animation.
      if(this.props.focusedLoc === loc.referralId | locations.length === 1) {
        i.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => i.setAnimation(null), 700)        
        setTimeout(() => {
          infowindow.setContent(
          `<div class="infoWindow">
            <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
            <br>
            <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
            <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
            <div><strong>Provided by: </strong>SquareSpace</div>
          </div>`
          )
          this.props.infoWindow == true ? infowindow.open(map, i) : console.log("False")
        }, 1200)
      }

      // Method call adds Listener for changing InfoWindow's content upon click
      this.listenInfoWindowChange(map, i, loc, infowindow)
    })
  }

  /**
   * Changes InfoWindow's content when that marker is clicked.
   */
  listenInfoWindowChange = (map, marker, loc, infowindow) => {
    marker.addListener('click', () => {
      infowindow.setContent(
      `<div class="infoWindow">
        <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
        <br>
        <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
        <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
        <div><strong>Provided by: </strong>SquareSpace</div>

      </div>`
      )
    })
  }

  componentDidMount() {
    window.markers = []
    // Ensures that google.maps exists on closure, before calling methods that rely on it.
    if (!window.google) {
      // Creates a script for loading google maps CDN.
      const script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCVQUeNoVu_7zHcGYSkSJ-BY1dU6hB_7gM`;
      script.async = true
      script.defer = true
      const index = document.getElementsByTagName('script')[0];
      index.parentNode.insertBefore(script, index);
      // Loads the map, when the script for google maps is loaded.
      script.addEventListener('load', event => {
        this.loadAPI()
      })
    } 
  }
  render() {
    // lets the user know if there's no internet connection to display the map.
    if(navigator.onLine === false && this.state.mapWasCalled === false) {
        window.alert("No connection detected. The map may not display properly")
        this.setState({mapWasCalled: true})      
    }  
    // Reloads markers after each rerender, with it's updated locations
    setTimeout(() => {
      this.loadMarkers(window.map, this.props.locations)
    }, 1000)

    return (
      <section className={this.props.mapId} style={{height: "95vh"}} id={this.props.mapId} aria-label={this.props.mapId}/>
    );
  }
}

/**
 * @exports Map
 */
export default Map