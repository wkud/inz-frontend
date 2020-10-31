import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

const dummyData = [
  {
    id: 3,
    name: 'food',
    user_id: 3,
  },
  {
    id: 4,
    name: 'travel',
    user_id: 3,
  },
];

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [state, setState] = useState({
    list: [],
    loading: false,
    errorMessage: '',
    isApiListEmpty: false,
  });

  const clearFlags = () => setState({ ...state, errorMessage: '', isApiListEmpty: false });

  const getAll = () => {
    //TODO
    setState({ ...state, list: dummyData });
    //isApiListEmpty = res.data.list.length === 0
    return state.list;
  };

  const create = (newCategoryData) => {
    console.log(newCategoryData); //TODO
  };

  return (
    <CategoryContext.Provider value={{ ...state, clearFlags, getAll, create }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
