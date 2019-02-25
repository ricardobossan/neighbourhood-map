import React, { Component } from 'react';


class Map extends Component {
  /**
   * Loads Google Maps API, creates an instance of a map and an InfoWindow.
   */
  loadAPI = () => {

    // Loads API and creates a map.
    const map = new window.google.maps.Map(
      document.getElementById(this.props.mapId),
      this.props.options);

    window.map = map

    // Create only one instance of the InfoWindow, whose values will change as each marker is clicked.
  }

  /**
   * Iterate over locations and add markers to them.
   * Each marker has a click event that, when triggered, will change the InfoWindow's content.
   */
  loadMarkers = (map, locations) => {
    const infowindow = new window.google.maps.InfoWindow()
    infowindow.close()
    window.markers.forEach(marker => marker.setMap(null))
    const image = {
      url: "https://prnautica.com/wp-content/uploads/2015/12/map-marker-icon.png",
      size: new window.google.maps.Size(25, 25),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25)
    };

    locations.forEach((loc, i) => {
      window.markers.push(i = new window.google.maps.Marker({
      position: { lat: loc.venue.location.lat, lng: loc.venue.location.lng },
      icon: image,
      animation: null,
      map: map,
      title: loc.venue.name
      }))
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
          </div>`
          )
          this.props.infoWindow == true ? infowindow.open(map, i) : console.log("False")
          infowindow.length = 1
        }, 1200)
      }
        // Method call adds Listener for changing InfoWindow's content upon click
        this.listenInfoWindowChange(map, i, loc, infowindow)
      })
    console.log(window.markers)
  }

  /**
   * Changes InfoWindow's content when that marker is clicked. Uses reverse geocoding
   */
  listenInfoWindowChange = (map, marker, loc, infowindow) => {
    marker.addListener('click', () => {
      infowindow.setContent(
      `<div class="infoWindow">
        <div class="infoWindowHeader"><strong>${loc.venue.name}</strong></div>
        <br>
        <div><strong>Description:</strong> ${loc.venue.categories[0].shortName}</div>
        <div><strong>Address:</strong> ${loc.venue.location.formattedAddress[0]}, ${loc.venue.location.formattedAddress[1]}</div>
      </div>`
      )
      this.loadMarkers(window.map, this.props.locations)
    })
  }

  componentDidMount() {
    window.markers = []
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

  componentDidUpdate(prevProps) {
    if(this.props.locations !== prevProps.locations) {
      setTimeout(() => this.loadMarkers(window.map, this.props.locations), 1000)
      
    }
  }

  render() {
    /**
     * lets the user know if there's no internet connection to display the map.
     */
    setTimeout(() => {
    if(navigator.onLine === false) {
      this.props.onMapCalled()
    }  
      
    }, 5000)
/*    setTimeout(() => {

    this.loadMarkers(window.map, this.props.locations)

    }, 1000)
*/

    /**
     * ATENTION!!!!
     */
    // Ensures the markers and infowindows are reloaded when the locations are first updated


    return (
      /**
       * Renders map
       */
      <section className={this.props.mapId} style={{height: "95vh"}} id={this.props.mapId} aria-label={this.props.mapId}/>
    );
  }
}

export default Map