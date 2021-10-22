const countries = require('../_data/countries');
const states = require('../_data/states');
const cities = require('../_data/cities');

exports.getCountries = (req, res, next) => {
  const data = countries.map((country) => ({
    id: country.id,
    label: country.name,
    phone_code: country.phone_code,
  }));

  res.json(data);
};

exports.getStates = (req, res, next) => {
  const data = states.map(({ id, name, country_id }) => ({
    id,
    name,
    country_id,
  }));

  res.json(data);
};

exports.getStatesByCountryId = (req, res, next) => {
  const data = states
    .filter(({ country_id }) => country_id == req.params.cid)
    .map(({ id, name }) => ({ id, label: name }));
  res.json(data);
};

exports.getCitiesByStateId = (req, res, next) => {
  const data = cities
    .filter(({ state_id }) => state_id == req.params.sid)
    .map(({ id, name }) => ({ id, label: name }));

  res.json(data);
};

exports.getCities = (req, res, next) => {
  // return res.json(cities);
  const data = cities.map(({ id, name, state_id, state_code, country_id }) => ({
    id,
    name,
  }));
  console.log('Length', data.length);
  res.json(data);
};
