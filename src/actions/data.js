import * as types from './actionTypes';

export const getProvinces = () => {
  return {
    type: types.GET_PROVINCES,
    payload: fetch(
      'https://thingproxy.freeboard.io/fetch/https://geopagos-challenge.s3.amazonaws.com/provinces.json'
    ).then(response => response.json())
  };
};

export const getLocations = ID => {
  return {
    type: types.GET_LOCATIONS,
    payload: fetch(
      `https://thingproxy.freeboard.io/fetch/https://geopagos-challenge.s3.amazonaws.com/provinces/${ID}.json`
    ).then(response => response.json())
  };
};

export const postForm = params => {
  return {
    type: types.POST_FORM,
    payload: fetch(
      `http://www.mocky.io/v2/5bc03a8832000069006a30f2?mocky-delay=500ms`,
      {
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
  };
};
