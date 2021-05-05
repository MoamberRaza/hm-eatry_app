import React from 'react';

const initialState = {
  isLoading: false,
  isSelected: null,
  restaurantSelected: null,
  foodList: null,
  user: null,
  forLogin: true,
  // isEN: true,
};

const reducer = (state, action) => {
  let payload = action.payload;
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: payload};
    case 'currentlyView':
      return {...state, isSelected: payload};
    case 'restaurantSelect':
      return {...state, restaurantSelected: payload};
    // case 'setRestName':
    //   return {...state, restName: payload};
    case 'setFoodList':
      return {...state, foodList: payload};
    case 'saveInfo':
      return {...state, user: payload};
    case 'forLogin':
      return {...state, forLogin: payload};
    // case 'changeLN':
    //   return {...state, isEN: payload};
    default:
      return state;
  }
};
export const loading = (dispatch) => (e) => {
  return dispatch({type: 'loading', payload: e});
};
export const onSelection = (dispatch) => (item, name) => {
  return dispatch({type: 'currentlyView', payload: {item, name}});
};
export const onSelectRestuarant = (dispatch) => (item, name) => {
  return dispatch({
    type: 'restaurantSelect',
    payload: item ? {item, name} : null,
  });
};
// export const setRestaurantName = (dispatch) => (name) => {
//   return dispatch({
//     type: 'setRestName',
//     payload: name,
//   });
// };
export const setFoodList = (dispatch) => (data) => {
  return dispatch({type: 'setFoodList', payload: data});
  // return dispatch({
  //   type: 'setFoodList',
  //   payload: data.sort((x) => new Date(x.name.date) - Date.now()),
  // });
};
export const saveUserInfo = (dispatch) => (data) => {
  return dispatch({type: 'saveInfo', payload: data});
};
export const forLogin = (dispatch) => (e) => {
  return dispatch({type: 'forLogin', payload: e});
};
// export const changeLN = (dispatch) => (e) => {
//   return dispatch({type: 'changeLN', payload: e});
// };
const actions = {
  loading,
  onSelection,
  onSelectRestuarant,
  setFoodList,
  saveUserInfo,
  forLogin,
  // setRestaurantName,
  // changeLN,
};
export const Context = React.createContext();
export const Provider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  let boundAction = {};
  for (let key in actions) {
    boundAction[key] = actions[key](dispatch);
  }

  return (
    <Context.Provider value={{...state, boundAction}}>
      {children}
    </Context.Provider>
  );
};
