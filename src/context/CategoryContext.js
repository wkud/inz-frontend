import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [state, setState] = useState({
    list: [],
    loading: false,
    errorMessage: '',
    isApiListEmpty: false,
  });

  const clearFlags = () =>
    setState({ ...state, errorMessage: '', isApiListEmpty: false });

  const getAll = () => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiListEmpty) return;

    setState({ ...state, loading: true });

    inzApi()
      .get('category')
      .then((res) => {
        setState({
          ...state,
          loading: false,
          list: res.data.list,
          isApiListEmpty: res.data.list.length === 0,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
    return state.list;
  };

  const create = (newCategoryData) => {
    setState({ ...state, loading: true });

    inzApi()
      .post('category', newCategoryData)
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          list: [...state.list, { ...newCategoryData, id: res.data.id }],
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
  };

  return (
    <CategoryContext.Provider value={{ ...state, clearFlags, getAll, create }}>
      {props.children}
    </CategoryContext.Provider>
  );
};
