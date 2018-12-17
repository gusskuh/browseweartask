import React, { Component } from 'react';
import './home.css';
import NavBar from './components/NavBar/NavBar.js';
import Cities from './components/Cities/Cities.js';
import Countries from './components/Countries/Countries.js';
import Companies from './components/Companies/Companies.js';
import dataService from './services/dataService.js';
import Geocode from "react-geocode";
import ReactMap from './components/ReactMap/ReactMap.js'
Geocode.setApiKey('AIzaSyDOfrPRKmzX0iX63U8l0ufgU1mo8ZL53do');

class Home extends Component {
  render() {
    return (
      this.state.cities && this.state.countries && this.state.companies && (
        <div className="home-cmp">
          <NavBar />
          <div className="container">
            <div className="lists-container">
                <Countries setCountry={this.setCountry.bind(this)} data={this.state.countries} selectedCountry={this.state.selectedCountry}/>
                <Cities setCity={this.setCity.bind(this)} data={this.state.cities} selectedCity={this.state.selectedCity}/>
                <Companies setCompany={this.setCompany.bind(this)} data={this.state.companies} selectedCompany={this.state.selectedCompany}/>
            </div>
            <div className="map-container">
                <ReactMap 
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDOfrPRKmzX0iX63U8l0ufgU1mo8ZL53do"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `300px` }} />}
                  mapElement={<div style={{ height: `84%` }} />}
                  center = {this.state.center}
                  selectedAddress = {this.state.selectedAddress}
                  selectedCompany = {this.state.selectedCompany}
                />
            </div>
          </div>
        </div>
      )
    );
  }

  
  state = {
    countries: null,
    cities: null,
    selectedCity: 'Portland',
    selectedCompany: '',
    selectedCountry: '',
    selectedAddress: '89 Chiaroscuro Rd.',
    companies: null,
    cmpTxt: 'Lonesome Pine Restaurant',
    center: {
        lat: 46.3570213,
        lng: -93.8630016
      },
  };

  setCountry(country){
    this.setState({selectedCountry:country})
      dataService.getCitiesByCountry(country)
        .then( cities => {
            this.setState({cities, selectedCity:cities[0][0]})
            dataService.getCompaniesByCity(cities[0][0])
            .then(companies => {
                this.setState({companies})
            }) 
        })
  }

  setCity(city) {
    this.setState({selectedCity:city})
      dataService.getCompaniesByCity(city)
        .then(companies => {
            this.setState({companies})
        })
  }

  setCompany(company){
    let q = company +', ' + this.state.selectedCity
    this.setState({selectedCompany:company})
    dataService.getAddressByCompany(company)
      .then(address => {
          this.setState({selectedAddress: address})
      })
      Geocode.fromAddress(q).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({cmpTxt:company, center:{lat,lng}})
        },
        error => {
          console.error(error,'Something went wrong!');
        }
      );
      
  }


  componentDidMount() {
  
    dataService.loadData()
        .then(countries => {
            this.setState({ countries, selectedCountry:countries[0][0] })
        })

    dataService.getCitiesByCountry()
        .then(cities => {
            this.setState({ cities})
        })
    dataService.getCompaniesByCity()
        .then(companies => {
            this.setState({ companies, selectedCompany: companies[0] })
        })    
  }
}

export default Home;
