import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  UPDATE_ROLL,
  POST_USER,
  ADDSHOPPING,
  GET_ALL_FOODS,
  GET_FILTER_FOODS,
  SEARCH,
  GET_DETAILS,
  POST_FOOD,
  GET_ALL_USERS,
  GET_USER,
  FAVORITES,
} from "./Constantes";

export const postUser = (payload) => async (dispatch) => {
  try {
    const accessoriesCreated = await axios.post(`users`, payload);
    return dispatch({
      type: POST_USER,
      payload: accessoriesCreated,
    });
  } catch (e) {
    console.log(e);
  }
};
export const getUser = (mail) => async (dispatch) => {
  try {
    const { data } = await axios.get(`users?mail=${mail}`);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`users`);
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const postFood = (payload) => async (dispatch) => {
  try {
    const foodsCreated = await axios.post(`foods`, payload);
    return dispatch({
      type: POST_FOOD,
      payload: foodsCreated,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateRoll = (payload) => async (dispatch) => {
  try {
    return dispatch({
      type: UPDATE_ROLL,
      payload: payload,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllFoods = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`foods`);
    dispatch({
      type: GET_ALL_FOODS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getfilterFoods = (payload) => {
  return {
    type: GET_FILTER_FOODS,
    payload,
  };
};
export function getDetail(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`foods/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setSearch = (payload) => {
  return {
    type: SEARCH,
    payload,
  };
};

export const shopping = (payload) => {
  const data = reactLocalStorage.get("Shopping").split(",");
  const dataCant = reactLocalStorage.get("ShoppingCant").split(",");
  let dataupdate = [];
  let dataCantupdate = [];
  if (data.includes(payload)) {
    const pos = data.indexOf(payload);
    dataCant[pos] = "delete";
    dataupdate = data.filter((id) => id !== payload);
    dataCantupdate = dataCant.filter((val) => val !== "delete");
  } else {
    data.push(payload);
    dataCant.push("1");
    dataupdate = data;
    dataCantupdate = dataCant;
  }
  reactLocalStorage.set("Shopping", dataupdate);
  reactLocalStorage.set("ShoppingCant", dataCantupdate);

  return {
    type: ADDSHOPPING,
    payload: data,
  };
};

export const favorites = (payload) => {
  return {
    type: FAVORITES,
    payload,
  };
};
export const putFood = (payload) => async (dispatch) => {
  try {
    const foodEdited = await axios.put(`foods`, payload);
    console.log("respoinse", foodEdited);
    return dispatch({
      type: "PUT_FOOD",
      payload: foodEdited,
    });
  } catch (error) {
    console.log(error);
  }
};
