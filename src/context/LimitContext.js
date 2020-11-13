import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

const dummyData = [
  {
    id: 2,
    duration_start: '2020-07-10',
    duration_end: '2020-07-31',
    planned_amount: 500,
    category_id: 3,
    category_name: 'food',
    info: {
      saving_rate: 'good',
      spent_amount: 1,
      duration_past: 22,
      duration_length: 22,
    },
  },
  {
    id: 3,
    duration_start: '2020-10-01',
    duration_end: '2020-10-30',
    planned_amount: 99,
    category_id: 3,
    category_name: 'food',
    info: {
      saving_rate: 'bad',
      spent_amount: 122,
      duration_past: 30,
      duration_length: 30,
    },
  },
  {
    id: 4,
    duration_start: '2020-11-01',
    duration_end: '2020-11-30',
    planned_amount: 100,
    category_id: 4,
    category_name: 'travel',
    info: {
      saving_rate: 'bad',
      spent_amount: 60,
      duration_past: 12,
      duration_length: 30,
    },
  },
  {
    id: 8,
    duration_start: '2020-11-14',
    duration_end: '2020-11-14',
    planned_amount: 200,
    category_id: 4,
    category_name: 'travel',
    info: {
      saving_rate: 'bad',
      spent_amount: 60,
      duration_past: 0,
      duration_length: 1,
    },
  },
  {
    id: 7,
    duration_start: '2020-11-09',
    duration_end: '2020-11-15',
    planned_amount: 50,
    category_id: 5,
    category_name: 'Party',
    info: {
      saving_rate: 'good',
      spent_amount: 0,
      duration_past: 4,
      duration_length: 7,
    },
  },
  {
    id: 5,
    duration_start: '2020-11-01',
    duration_end: '2020-11-30',
    planned_amount: 100,
    category_id: 6,
    category_name: 'Sport',
    info: {
      saving_rate: 'good',
      spent_amount: 0,
      duration_past: 12,
      duration_length: 30,
    },
  },
  {
    id: 6,
    duration_start: '2020-11-01',
    duration_end: '2020-11-30',
    planned_amount: 100,
    category_id: 6,
    category_name: 'Sport',
    info: {
      saving_rate: 'good',
      spent_amount: 0,
      duration_past: 12,
      duration_length: 30,
    },
  },
];

export const LimitContext = createContext();

export const LimitProvider = (props) => {
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

    setState({ ...state, list: dummyData });
    return;

    // setState({ ...state, loading: true });

    // inzApi()
    //   .get('limit')
    //   .then((res) => {
    //     setState({
    //       ...state,
    //       loading: false,
    //       list: res.data.list,
    //       isApiListEmpty: res.data.list.length === 0,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setState({ ...state, loading: false, errorMessage: err.message });
    //   });
    // return state.list;
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
    <LimitContext.Provider value={{ ...state, clearFlags, getAll, create }}>
      {props.children}
    </LimitContext.Provider>
  );
};
