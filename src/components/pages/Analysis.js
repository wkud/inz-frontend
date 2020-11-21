import React, { useEffect, useContext } from 'react';
import { AnalysisContext } from '../../context/AnalysisContext';
import AnalysisChart from '../analysis/AnalysisChart';
import AnalysisHeader from '../analysis/AnalysisHeader';
import AnalysisPeriodForm from '../analysis/AnalysisPeriodForm';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const getAnalysis = () => {
    if (analysis.totalSpending === 0) {
      analysis.getAnalysis();
    }
  };
  useEffect(() => getAnalysis());

  return (
    <div className='align-self-center align-items-center'>
      <AnalysisHeader syncAction={getAnalysis} headerCaption='Analysis' />
      <span className='text-left d-flex mid-font pb-1 text-wrap'>
        Enter start and end date of period, you want to analyze
      </span>
      <AnalysisPeriodForm />
      <span className='text-center text-dark lead-font pb-1'>
        Hover over the diagram to show additional information
      </span>
      <AnalysisChart categoryData={analysis.categoryData} />
    </div>
  );
};

export default Analysis;
