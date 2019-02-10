import React, { Component } from 'react';
import Map from "./Map.js"
import './App.css';

class App extends Component {

  render() {

    /**
     * Add 5 locations with lat/lng, title and description values
     */
    const locations = [
      {title: "Tem Tudo", description: "Utilities Shop", lat: -22.903260, lng: -43.112730},
      {title: "Casa Moreira e Souza", description: "Construction Shop", lat: -22.907294, lng: -43.110322},
      {title: "Fix Shoes and Purses", description: "Leather work", lat: -22.907929, lng: -43.108769},
      {title: "Raia Drugstore", description: "Drugstore", lat: -22.903667, lng: -43.113935},
      {title: "Recanto do Jambeiro", description: "Produce Shop", lat: -22.904811, lng: -43.111082}
    ]

    return (
      <div className="App">
        <header className="header">
        {/*
        <FilterText />
      */}
        </header>
        <main>
         <Map
            id="map"
            options={{
              center: { lat: -22.906151, lng: -43.110378 },
              zoom: 15.2
            }}
            locations={locations}
          />
        </main>
      </div>
    );
  }
}

export default App;
