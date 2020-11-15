import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';
import { spentPercent } from '../utility/limitUtility';

const dummyData = {
  current: [
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
        duration_past: 13,
        duration_length: 30,
        duration_category: 'current',
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
        duration_past: 5,
        duration_length: 7,
        duration_category: 'current',
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
        duration_past: 13,
        duration_length: 30,
        duration_category: 'current',
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
        duration_past: 13,
        duration_length: 30,
        duration_category: 'current',
      },
    },
    {
      id: 9,
      duration_start: '2020-11-01',
      duration_end: '2020-11-30',
      planned_amount: 400,
      category_id: 7,
      category_name: 'Dinner',
      info: {
        saving_rate: 'good',
        spent_amount: 0,
        duration_past: 13,
        duration_length: 30,
        duration_category: 'current',
      },
    },
  ],
  upcoming: [
    // {
    //   id: 8,
    //   duration_start: '2020-11-14',
    //   duration_end: '2020-11-14',
    //   planned_amount: 200,
    //   category_id: 4,
    //   category_name: 'travel',
    //   info: {
    //     saving_rate: 'bad',
    //     spent_amount: 60,
    //     duration_past: 0,
    //     duration_length: 1,
    //     duration_category: 'upcoming',
    //   },
    // },
  ],
  finished: [
    {
      id: 2,
      duration_start: '2020-07-10',
      duration_end: '2020-07-31',
      planned_amount: 500,
      category_id: 3,
      category_name: 'food',
      info: {
        saving_rate: 'good',
        spent_amount: 0,
        duration_past: 22,
        duration_length: 22,
        duration_category: 'finished',
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
        duration_category: 'finished',
      },
    },
  ],
};

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

    setState({
      ...state,
      current: sortBySpendingPercent(dummyData.current),
      upcoming: sortBySpendingPercent(dummyData.upcoming),
      finished: sortBySpendingPercent(dummyData.finished),
    }); //TODO sort by duration_end (late first)
    return;

    // setState({ ...state, loading: true });

    // inzApi()
    //   .get('limit')
    //   .then((res) => {
    //     setState({
    //       ...state,
    //       loading: false,
    //       list: res.data.list, //TODO sort by duration_end (late first)
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
    <LimitContext.Provider
      value={{ ...state, clearFlags, getAll, create, isLocalListEmpty }}
    >
      {props.children}
    </LimitContext.Provider>
  );
};
