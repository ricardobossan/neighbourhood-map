import React, { Component } from 'react';


class Map extends Component {
  /**
   * Loads Google Maps API, creates an instance of a map and an InfoWindow.
   */
  loadAPI = (mapName) => {
    /**
     * lets the user know if there's no internet connection to display the map.
     */
     navigator.onLine
     ? console.log("Online. Map should display properly")
     : window.alert("The map may not be displayed. Please check your connection.")

    // Loads API and creates a map.
    mapName = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    // Create only one instance of the InfoWindow, whose values will change as each marker is clicked.
    const infowindow = new window.google.maps.InfoWindow()
    this.loadMarkers(mapName, infowindow, this.props.locations)
  }

  /**
   * Iterate over locations and add markers to them.
   * Each marker has a click event that, when triggered, will change the InfoWindow's content.
   */
  loadMarkers = (mapName, infowindow, locations) => {
    locations.forEach((loc) => {
      const image = {
        url: "https://prnautica.com/wp-content/uploads/2015/12/map-marker-icon.png",
        size: new window.google.maps.Size(25, 25),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      const marker = new window.google.maps.Marker({
      position: { lat: loc.venue.location.lat, lng: loc.venue.location.lng },
      icon: image,
      animation: null,
      map: mapName,
      title: loc.venue.name
      })
      if(this.props.focusedLoc === loc.referralId | locations.length === 1) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => marker.setAnimation(null), 700)        
        setTimeout(() => {
          infowindow.setContent(
          `<div class="infoWindow">
            <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
            <br>
            <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
            <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
          </div>`
          )
          this.props.infoWindow == true ? infowindow.open(mapName, marker) : console.log("False")
        }, 1200)
      }
        // Method call adds Listener for changing InfoWindow's content upon click
        this.listenInfoWindowChange(mapName, marker, loc, infowindow)
      })
  }

  /**
   * Changes InfoWindow's content when that marker is clicked. Uses reverse geocoding
   */
  listenInfoWindowChange = (mapName, marker, loc, infowindow) => {
      marker.addListener('click', () => {
        infowindow.setContent(
        `<div class="infoWindow">
          <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
          <br>
          <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
          <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
        </div>`
        )
/*        this.props.infoWindow == false ? infowindow.close() : console.log('')
*/      })
/*        this.props.infoWindow == true ? infowindow.open(mapName, marker) : console.log('')
*/  }

  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCVQUeNoVu_7zHcGYSkSJ-BY1dU6hB_7gM`;
      script.async = true
      script.defer = true
      const index = document.getElementsByTagName('script')[0];
      index.parentNode.insertBefore(script, index);
      script.addEventListener('load', event => {
        this.loadAPI("map")
      })
    } else {
      this.loadAPI("map")
    }
  }

  render() {
    /**
     * Modal for when no location is returned from search
     */
    if(this.props.locations.length !== 5) {
      this.loadAPI("anotherMap")
      if(this.props.locations.length === 0) navigator.onLine
        ? window.alert("The location you're looking for was not found.")
        : window.alert("Please check your connection.")
    }

    return (
      /**
       * Renders map
       */
      <section className="map" style={{height: "95vh"}} id={this.props.id} aria-label="map"/>
    );
  }
}

export default Map