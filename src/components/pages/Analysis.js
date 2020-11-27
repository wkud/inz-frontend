import React, { useEffect, useContext } from 'react';
import { AnalysisContext } from '../../context/AnalysisContext';
import AnalysisChart from '../analysis/AnalysisChart';
import AnalysisHeader from '../analysis/AnalysisHeader';
import AnalysisPeriodForm from '../analysis/AnalysisPeriodForm';
import {
  firstDayOfCurrentMonth,
  lastDayOfCurrentMonth,
} from '../../utility/dateUtility';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const defaultFormData = {
    period_start: firstDayOfCurrentMonth(),
    period_end: lastDayOfCurrentMonth(),
  };

  const getAnalysis = (period) => {
    if (analysis.totalSpending === 0) {
      analysis.getAnalysis(period);
    }
  };
  useEffect(() => getAnalysis(defaultFormData));

  const onClick = (period) => {
    analysis.clearFlags();
    analysis.getAnalysis(period);
  };

  const noChartCaption = () =>
    analysis.loading
      ? 'Loading...'
      : analysis.errorMessage
      ? 'Cannot load category diagram due to an error'
      : 'There were no expenses in this period';

  return (
    <div className='align-self-center align-items-center chart-width'>
      <AnalysisHeader headerCaption='Analysis' />
      <AnalysisPeriodForm
        getAction={onClick}
        defaultFormData={defaultFormData}
      />
      <span className='text-center text-dark lead-font d-md-none'>
        Hover over the diagram to show additional information
      </span>
      <div className='pb-1 pb-md-2' />
      {analysis.totalSpending === 0 ? (
        <div className='chart'>{noChartCaption()}</div>
      ) : (
        <AnalysisChart categoryData={analysis.categoryData} />
      )}
    </div>
  );
};

export default Analysis;
