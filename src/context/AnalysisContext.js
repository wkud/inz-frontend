import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';

export const AnalysisContext = createContext();

const dummyData = {
  total_spending: 272,
  categories: [
    {
      category_name: 'food',
      spent_amount: 24,
      spent_percent: 8.82,
    },
    {
      category_name: 'travel',
      spent_amount: 60,
      spent_percent: 22.06,
    },
    {
      category_name: 'Party',
      spent_amount: 36,
      spent_percent: 13.24,
    },
    {
      category_name: 'Sport',
      spent_amount: 120,
      spent_percent: 44.12,
    },
    {
      category_name: 'Dinner',
      spent_amount: 30,
      spent_percent: 11.03,
    },
    {
      category_name: 'no category',
      spent_amount: 2,
      spent_percent: 0.74,
    },
    {
      category_name: 'no category2',
      spent_amount: 2,
      spent_percent: 0.74,
    },
    {
      category_name: 'no category3',
      spent_amount: 2,
      spent_percent: 0.74,
    },
    {
      category_name: 'no category4',
      spent_amount: 2,
      spent_percent: 0.74,
    },
  ],
};

export const AnalysisProvider = (props) => {
  const [state, setState] = useState({
    list: [],
    loading: false,
    errorMessage: '',
    totalSpending: 0,
    isApiSpendingZero: false,
    categoryData: [],
  });

  const clearFlags = () => setState({ ...state, errorMessage: '' });

  const sortBySpentPercent = (list) =>
    list.sort(
      (catData1, catData2) => catData2.spent_percent - catData1.spent_percent
    );

  const getAnalysis = () => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiSpendingZero) return;

    setState({
      ...state,
      totalSpending: dummyData.total_spending,
      categoryData: sortBySpentPercent(dummyData.categories),
      isApiListEmpty: dummyData.total_spending === 0,
    });

    // setState({ ...state, loading: true });

    // inzApi()
    //   .get('category/analysis')
    //   .then((res) => {
    //     setState({
    //       ...state,
    //       loading: false,
    //       totalSpending: res.data.analysis.total_spending,
    //       categoryData: sortBySpentPercent(res.data.analysis.categories),
    //       isApiListEmpty: res.data.analysis.total_spending === 0,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setState({ ...state, loading: false, errorMessage: err.message });
    //   });
    return state.list;
  };

  return (
    <AnalysisContext.Provider value={{ ...state, clearFlags, getAnalysis }}>
      {props.children}
    </AnalysisContext.Provider>
  );
};
