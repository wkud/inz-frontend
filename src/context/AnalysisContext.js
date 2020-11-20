import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';
import chartOverflowOthers from '../utility/chartUtility/chartOverflowOthers';
import { round } from '../utility/numberUtility';

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
    isApiSpendingZero: false,
    totalSpending: 0,
    categoryData: [],
    values: [],
    labels: [],
    bgColors: [],
  });

  const clearFlags = () => setState({ ...state, errorMessage: '', isApiSpendingZero: false, });

  const sortBySpentPercent = (list) =>
    list.sort(
      (catData1, catData2) => catData2.spent_percent - catData1.spent_percent
    );

  const dataWithOverlow = (totalSpending, categoryData) =>
    chartOverflowOthers(
      8,
      categoryData,
      (cat) => cat.spent_amount,
      (label, value) => {
        return {
          spent_amount: value,
          category_name: label,
          spent_percent:
            totalSpending === 0 ? 0 : round((value / totalSpending) * 100, 2),
        };
      }
    );

  const getAnalysis = () => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiSpendingZero) return;

    const withOverflow = dataWithOverlow(
      dummyData.total_spending,
      sortBySpentPercent(dummyData.categories)
    );
    setState({
      ...state,
      totalSpending: dummyData.total_spending,
      categoryData: withOverflow,
      isApiSpendingZero: dummyData.total_spending === 0,
    });

    // setState({ ...state, loading: true });

    // inzApi()
    //   .get('category/analysis')
    //   .then((res) => {
    //      const withOverflow = dataWithOverlow(
    //        res.data.analysis.total_spending,
    //        sortBySpentPercent(res.data.analysis.categories)
    //      );
    //     setState({
    //       ...state,
    //       loading: false,
    //       totalSpending: res.data.analysis.total_spending,
    //       categoryData: withOverflow,
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
