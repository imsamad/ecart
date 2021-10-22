import React from 'react';

import SelectField from './SelectField';
import axios from 'axios';
import { TextField } from '@mui/material';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const fetcher = async (val, id) => {
  let url = `${apiUrl}/data/`;
  switch (val) {
    case 'S':
      url += `states/${id}`;
      break;
    case 'C':
      url += `cities/${id}`;
      break;
    default:
      url += 'countries';
  }
  const { data } = await axios(url);
  return data;
};
const initState = (label) => ({
  data: [],
  value: { id: '', label: '' },
  display: `Select ${label}`,
});

const CountryField = () => {
  const initCountry = initState('Country');
  const initStates = initState('State');
  const initCities = initState('City');

  const [mobile, setMobile] = React.useState('');

  const [country, setCountry] = React.useState(initCountry);
  React.useEffect(() => {
    (async () => {
      setter(await fetcher(), setCountry, initCountry);
    })();
  }, []);

  const [state, setState] = React.useState(initStates);
  React.useEffect(() => {
    if (country?.value?.id) {
      (async () => {
        const data = await fetcher('S', country.value.id);
        setter(data, setState, initStates);
        setMobile(`+${country.value.phone_code}  `);
      })();
    } else {
      setState(initStates);
      setMobile('');
    }
  }, [country]);

  const [cities, setCities] = React.useState(initCities);

  React.useEffect(() => {
    if (state?.value?.id) {
      (async () => {
        const data = await fetcher('C', state.value.id);
        setter(data, setCities, initCities);
      })();
    } else {
      setCities(initCities);
    }
  }, [state]);

  function setter(data, setter, init) {
    if (data.length) {
      setter({
        data,
        value: data[0],
        display: `${data[0].label}`,
      });
    } else {
      setter(init);
    }
  }
  const getProps = (value, data, setter) => ({
    inputLabel: `Select a ${value}`,
    id: value,
    name: value,
    options: data.data,
    value: data.value,
    onChange: (_event, newValue) => {
      setter((prev) => ({ ...prev, value: newValue }));
    },
    inputValue: data.display,
    onInputChange: (_event, newDisplayValue) => {
      setter((prev) => ({ ...prev, display: newDisplayValue }));
    },
    getOptionLabel: (option) => `${option.label}`,
  });

  return (
    <>
      <SelectField
        {...getProps('country', country, setCountry)}
        getOptionLabel={(option) => `${option.label} (+${option.phone_code})`}
      />
      <SelectField {...getProps('state', state, setState)} />
      <SelectField {...getProps('city', cities, setCities)} />
      <TextField
        label="Mobile No *"
        type="text"
        fullWidth
        margin="normal"
        size="small"
        onChange={(val) => setMobile(val.target.value)}
        value={mobile}
        name="mobileNo"
      />
    </>
  );
};
export default CountryField;
