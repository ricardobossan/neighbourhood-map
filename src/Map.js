import React, { Component } from 'react';

class Map extends Component {

  loadAPI() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.loadMarker(map)
  }

  loadMarker(map) {
    const marker = new window.google.maps.Marker({
    position: { lat: -22.905015, lng: -43.111642 },
    map: map,
    title: 'Icaraí'
    })    
  }

  componentDidMount() {

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCVQUeNoVu_7zHcGYSkSJ-BY1dU6hB_7gM`;
      const index = document.getElementsByTagName('script')[0];
      index.parentNode.insertBefore(script, index);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      script.addEventListener('load', event => {
        this.loadAPI()
      })
    } else {
      this.loadAPI()
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="map" style={{height: "90vh"}} id={this.props.id} />
    );
  }
}

export default Map