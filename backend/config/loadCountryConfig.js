const iso3166 = require("mobitel-iso-3166-countries");

const COUNTRIES = {};

exports.loadCountries = () => {
  iso3166.list.forEach((r) => {
    COUNTRIES[r.country] = r.alpha2;
  });

  console.log("country codes loaded successfully");
};

exports.getCountryCode = (countryName) => {
  return COUNTRIES[countryName];
};
