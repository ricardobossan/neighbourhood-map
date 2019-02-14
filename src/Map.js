import React, { Component } from 'react';

class Map extends Component {

  /**
   * Loads Google Maps API, creates an instance of a map and an InfoWindow.
   */
  loadAPI() {

    // Loads API and creates a map.
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    // Create only one instance of the InfoWindow, whose values will change as each marker is clicked.
    const infowindow = new window.google.maps.InfoWindow()
    this.loadMarkers(map, infowindow)
  }

  /**
   * Iterate over locations and add markers to them.
   * Each marker has a click event that, when triggered, will change the InfoWindow's content.
   */
  loadMarkers(map, infowindow) {
    this.props.locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title
      })
      // Method call adds Listener for changing InfoWindow's content upon click
      this.listenInfoWindowChange(map, marker, location, infowindow)
    })
  }

  /**
   * Changes InfoWindow's content when that marker is clicked. Uses reverse geocoding
   */
  listenInfoWindowChange(map, marker, location, infowindow) {
    let formattedAddress = ''
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({"location": {"lat": location.lat, "lng": location.lng}}, response => {
      formattedAddress = response[0].formatted_address
    })
      marker.addListener('click', () => {
        infowindow.setContent(
        `<div class="infoWindow">
          <div class="infoWindowHeader"><strong>${location.title}</strong></div>
          <br>
          <div><strong>Description:</strong> ${location.description}</div>
          <div><strong>Address:</strong> ${formattedAddress}</div>
        </div>`
        )
        infowindow.open(map, marker)
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
      this.loadAPI()
    }
  }

  render() {
/*    // @todo OPTION add a event listener for adding and aside element when the page resized to a mobile viewport
    window.addEventListener("resize", () => (window.innerWidth | global.innerWidth) <= 700 ? console.log("It worked") : null)
*/    const { locations } = this.props
    console.log(this.props, locations)
    return (
      <div className="map" style={{height: "90vh"}} id={this.props.id} />
    );
  }
}

export default Map