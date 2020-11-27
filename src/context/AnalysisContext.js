import React, { createContext, useState } from 'react';
import inzApi from '../apis/inzApi';
import chartOverflowOthers from '../utility/chartUtility/chartOverflowOthers';
import { round } from '../utility/numberUtility';

export const AnalysisContext = createContext();

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

  const clearFlags = () =>
    setState({ ...state, errorMessage: '', isApiSpendingZero: false });

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

  const getAnalysis = (periodData) => {
    if (state.loading) return;
    if (state.errorMessage) return;
    if (state.isApiSpendingZero) return;

    setState({ ...state, loading: true });

    inzApi()
      .post('analysis', periodData)
      .then((res) => {
        const withOverflow = dataWithOverlow(
          res.data.analysis.total_spending,
          sortBySpentPercent(res.data.analysis.categories)
        );
        setState({
          ...state,
          loading: false,
          totalSpending: res.data.analysis.total_spending,
          categoryData: withOverflow,
          isApiListEmpty: res.data.analysis.total_spending === 0,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false, errorMessage: err.message });
      });
    return state.categoryData;
  };

  return (
    <AnalysisContext.Provider value={{ ...state, clearFlags, getAnalysis }}>
      {props.children}
    </AnalysisContext.Provider>
  );
};
