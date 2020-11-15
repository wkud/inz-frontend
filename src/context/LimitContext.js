import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';
import { spentPercent } from '../utility/limitUtility';

export const LimitContext = createContext();

export const LimitProvider = (props) => {
  const [state, setState] = useState({
    current: [],
    upcoming: [],
    finished: [],
    loading: false,
    errorMessage: '',
    isApiListEmpty: false,
  });

  const sortBySpendingPercent = (list) =>
    list.sort((l1, l2) => spentPercent(l2) - spentPercent(l1));

  const clearFlags = () =>
    setState({ ...state, errorMessage: '', isApiListEmpty: false });

  const isLocalListEmpty = () =>
    Math.max(
      state.current.length,
      state.upcoming.length,
      state.finished.length
    ) === 0;

  const getAll = () => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiListEmpty) return;

    setState({ ...state, loading: true });

    inzApi()
      .get('limit')
      .then((res) => {
        setState({
          ...state,
          loading: false,
          current: sortBySpendingPercent(res.data.current),
          upcoming: sortBySpendingPercent(res.data.upcoming),
          finished: sortBySpendingPercent(res.data.finished),
          isApiListEmpty:
            Math.max(
              res.data.current.length,
              res.data.upcoming.length,
              res.data.finished.length
            ) === 0,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
    return state.list;
  };

  const create = (newLimitData) => {
    setState({ ...state, loading: true });

    inzApi()
      .post('limit', newLimitData)
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          loading: false,
          list: [
            ...state.list,
            {
              ...newLimitData,
              id: res.data.id,
              category_name: res.data.category_name, //TODO get 'info' field in response
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
  };

  return (
    <LimitContext.Provider
      value={{ ...state, clearFlags, getAll, create, isLocalListEmpty }}
    >
      {props.children}
    </LimitContext.Provider>
  );
};
