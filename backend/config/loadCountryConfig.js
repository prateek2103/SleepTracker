const iso3166 = require("mobitel-iso-3166-countries");

const COUNTRIES = {};

exports.loadCountries = () => {
  iso3166.list.forEach((r) => {
    COUNTRIES[r.country] = r.alpha2;
  });
};

exports.getCountryCode = (countryName) => {
  return COUNTRIES[countryName];
};
