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
    <div className='align-self-center align-items-center chart-width'>
        <AnalysisHeader syncAction={getAnalysis} headerCaption='Analysis' />
        <AnalysisPeriodForm />
        <span className='text-center text-dark lead-font d-md-none'>
          Hover over the diagram to show additional information
        </span>
        <div className='pb-1 pb-md-2' />
      <AnalysisChart categoryData={analysis.categoryData} />
    </div>
  );
};

export default Analysis;
