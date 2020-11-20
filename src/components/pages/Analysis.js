import React, { useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AnalysisContext } from '../../context/AnalysisContext';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
import chartColorPalette from '../analysis_page_addons/chartColorPalette';
import chartOverflowOthers from '../analysis_page_addons/chartOverflowOthers';
import { round } from '../../utility/numberUtility';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const getAnalysis = () => {
    if (analysis.totalSpending === 0) analysis.getAnalysis();
    values(); //TODO remove
  };
  useEffect(() => getAnalysis());

  //TODO ERROR dont use this if total spending === 0 (divide by 0)
  const analysisData = () =>
    chartOverflowOthers(
      8,
      analysis.categoryData,
      (cat) => cat.spent_amount,
      (label, value) => {
        return {
          spent_amount: value,
          category_name: label,
          spent_percent: round((value / analysis.totalSpending) * 100, 2),
        };
      }
    );

  const values = () => analysisData().map((cat) => cat.spent_amount);
  const labels = () =>
    analysisData().map((cat) => fistCharacterUpperCase(cat.category_name));
  const bgColors = () => chartColorPalette(analysisData().length);

  const chartReference = React.createRef();
  useEffect(() => console.log(chartReference));

  var data = {
    datasets: [
      {
        data: values(), //TODO replace
        borderColor: '#222222',
        backgroundColor: bgColors(), //TODO replace
        label: 'Dataset 1',
      },
    ],
    labels: labels(), //TODO replace
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Spending per category',
      fontColor: '#ffffff',
      fontSize: 13,
      fontStyle: 'normal',
      position: 'bottom',
    },
    legend: {
      align: 'center', //TODO 'start' on xs
      labels: {
        fontColor: '#ffffff',
      },
    },
  };
  return (
    <div className='chart align-self-center'>
      <Pie ref={chartReference} data={data} options={options} />
    </div>
  );
};

export default Analysis;
