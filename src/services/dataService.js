//data initialization
var data = require("../data/clients.json")
var mapOfCountries = _createMapfromData(data.Customers, 'Country', 'City')
var mapOfCities = _createMapfromData(data.Customers, 'City', 'CompanyName')
var mapOfCompaniesByAddress = _createMapfromData(data.Customers, 'CompanyName', 'Address')

function loadData(){     
    return Promise.resolve(_sortData(mapOfCountries));
}

function getCitiesByCountry(country = 'USA'){
   let cities =  mapOfCountries[country];
   let mapCityByCountry = {}
   cities.forEach(city => {
    mapCityByCountry[city] = mapOfCities[city]
   });
   return Promise.resolve(_sortData(mapCityByCountry));
}

function getCompaniesByCity(city='Portland') {
    return Promise.resolve(mapOfCities[city])
}

function getAddressByCompany(company) {
    return Promise.resolve(mapOfCompaniesByAddress[company])
}

export default {
    loadData,
    getCitiesByCountry,
    getCompaniesByCity,
    getAddressByCompany,
}

//internal functions

function _sortData(mapObj) {
        
              let sortable = [];
              for (var key in mapObj) {
                sortable.push([key, mapObj[key]]);
              }
        
              sortable.sort((a, b) => {
                return b[1].length - a[1].length;
              });
        
              return sortable;
}

function _createMapfromData(data, key, value) {

    return data.reduce((acc, cust) => {
        if (!acc[cust[key]]) acc[cust[key]] = [cust[value]];
        if (acc[cust[key]]) {
            if(!acc[cust[key]].includes(cust[value])) acc[cust[key]].push(cust[value])
        };
        return acc;
      }, {});
}


