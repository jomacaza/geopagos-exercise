import * as types from '../actions/actionTypes';

const defaultState = {
  provincesPending: false,
  provinces: [],
  provincesError: {},

  locationsPending: false,
  locations: {},
  locationsError: {},

  postFormPending: false,
  postForm: false,
  postFormError: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.GET_PROVINCES_PENDING:
      return Object.assign({}, state, {
        provincesPending: true
      });
    case types.GET_PROVINCES_FULFILLED:
      return Object.assign({}, state, {
        provincesPending: false,
        provinces: action.payload
      });
    case types.GET_PROVINCES_REJECTED:
      return Object.assign({}, state, {
        provincesPending: false,
        provincesError: action.payload
      });

    case types.GET_LOCATIONS_PENDING:
      return Object.assign({}, state, {
        locationsPending: true
      });
    case types.GET_LOCATIONS_FULFILLED:
      return Object.assign({}, state, {
        locationsPending: false,
        locations: action.payload
      });
    case types.GET_LOCATIONS_REJECTED:
      return Object.assign({}, state, {
        locationsPending: false,
        locationsError: action.payload
      });

    case types.POST_FORM_PENDING:
      return Object.assign({}, state, {
        postFormPending: true
      });
    case types.POST_FORM_FULFILLED:
      return Object.assign({}, state, {
        postFormPending: false,
        postForm: true
      });
    case types.POST_FORM_REJECTED:
      return Object.assign({}, state, {
        postFormPending: false,
        postFormError: action.payload
      });

    default:
      return state;
  }
}
