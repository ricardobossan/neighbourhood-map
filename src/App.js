import React, { Component } from 'react';
import Map from "./Map.js"
import './App.css';

class App extends Component {

  render() {

    const locations = []

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
          />
        </main>
      </div>
    );
  }
}

export default App;
