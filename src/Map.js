import React, { Component } from 'react';

class Map extends Component {

  /**
   * Loads Google Maps API, creates an instance of a map and an InfoWindow.
   */
  loadAPI(mapName) {

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
  loadMarkers(mapName, infowindow, locations) {
    console.log(locations)
    locations.forEach((loc) => {
      const marker = new window.google.maps.Marker({
      position: { lat: loc.venue.location.lat, lng: loc.venue.location.lng },
      map: mapName,
      title: loc.venue.name
      })
      // Method call adds Listener for changing InfoWindow's content upon click
      this.listenInfoWindowChange(mapName, marker, loc, infowindow)
    })
  }

  /**
   * Changes InfoWindow's content when that marker is clicked. Uses reverse geocoding
   */
  listenInfoWindowChange(mapName, marker, loc, infowindow) {
    const geocoder = new window.google.maps.Geocoder()
      marker.addListener('click', () => {
        infowindow.setContent(
        `<div class="infoWindow">
          <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
          <br>
          <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
          <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
        </div>`
        )
        infowindow.open(mapName, marker)
      })      
  }

  componentDidMount() {

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCVQUeNoVu_7zHcGYSkSJ-BY1dU6hB_7gM`;
      script.async = true
      script.defer = true
      const index = document.getElementsByTagName('script')[0];
      index.parentNode.insertBefore(script, index);
      script.addEventListener('load', event => {
        this.loadAPI()
      })
    } else {
      this.loadAPI("map")
    }
  }

  render() {
/*    // @todo OPTION add a event listener for adding and aside element when the page resized to a mobile viewport
    window.addEventListener("resize", () => (window.innerWidth | global.innerWidth) <= 700 ? console.log("It worked") : null)
*/
    if(this.props.locations.length != 5) {
      this.loadAPI("anotherMapName")
      if(this.props.locations.length === 0) window.alert("The location you're looking for was not found.")
    }

    const { locations } = this.props
    console.log(this.props)
    return (
      <div className="map" style={{height: "95vh"}} id={this.props.id} />
    );
  }
}

export default Map