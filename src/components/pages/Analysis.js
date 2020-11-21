import React, { useEffect, useContext } from 'react';
import { AnalysisContext } from '../../context/AnalysisContext';
import AnalysisChart from '../analysis/AnalysisChart';
import AnalysisHeader from '../analysis/AnalysisHeader';

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
      <AnalysisChart categoryData={analysis.categoryData} />
    </div>
  );
};

export default Analysis;
