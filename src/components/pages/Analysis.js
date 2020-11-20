import React, { useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AnalysisContext } from '../../context/AnalysisContext';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
import chartColorPalette from '../analysis_page_addons/chartColorPalette';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const getAnalysis = () => {
    console.log('get');
    if (analysis.totalSpending === 0) analysis.getAnalysis();
    console.log(values());
    console.log(labels());
    console.log(bgColors());
  };
  useEffect(() => getAnalysis());

  const analysisData = () => analysis.categoryData;

  const values = () => analysisData().map((cat) => cat.spent_amount);
  const labels = () =>
  analysisData().map((cat) =>
      fistCharacterUpperCase(cat.category_name)
    );
  const bgColors = () => chartColorPalette(analysisData().length);

  // const labels = () => {
  //   chartOverflowOthers(
  //     8,
  //     'category_name',
  //     'spent_amount',
  //     analysis.categoryData.map((catData) =>
  //       fistCharacterUpperCase(catData.category_name)
  //     )
  //   );
  // };
  // const data = analysis.

  const chartReference = React.createRef();
  useEffect(() => console.log(chartReference));

  var data = {
    datasets: [
      {
        data: [10, 10, 415, 10, 310], //TODO replace
        borderColor: '#222222',
        backgroundColor: [
          '#2f4b7c',
          '#665191',
          '#a05195',
          '#d45087',
          '#f95d6a',
        ], //TODO replace
        label: 'Dataset 1',
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'], //TODO replace
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
