import React, { Component } from 'react';

class Map extends Component {

  loadAPI() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.loadMarkers(map)
  }

  /**
   * Iterate over locations and add markers to them
   */
  loadMarkers(map) {
    this.props.locations.map((location) => {
      const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title
      })    
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