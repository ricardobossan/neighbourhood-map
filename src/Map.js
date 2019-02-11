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
    this.props.locations.map((location) => {
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
   * Changes InfoWindow's content when that marker is clicked.
   * @todo style and apply reverse geocoding, to retrieve the lat/lng correspondent's address
   * @todo reverse geocoding request (fetch?) to receive `formatted_address`, 
   * e.g.: https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452
&location_type=ROOFTOP&result_type=street_address&key=YOUR_API_KEY
   */
  listenInfoWindowChange(map, marker, location, infowindow) {
    marker.addListener('click', () => {
      infowindow.setContent(`content: <div>${location.title}</div><br><div>${location.description}</div><br><div>Address(reverse geocoding - Learn API)</div>`)
      infowindow.open(map, marker)
      // Closes the InfoWindow if clicked anywhere else on the map.
      map.addListener('click', () => infowindow.close())
    })
  }

  componentDidMount() {

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCVQUeNoVu_7zHcGYSkSJ-BY1dU6hB_7gM`;
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
    const { locations } = this.props
    console.log(this.props, locations)
    return (
      <div className="map" style={{height: "90vh"}} id={this.props.id} />
    );
  }
}

export default Map