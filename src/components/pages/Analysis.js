import React, { useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AnalysisContext } from '../../context/AnalysisContext';
import chartColorPalette from '../../utility/chartUtility/chartColorPalette';
import { fistCharacterUpperCase } from '../../utility/stringUtility';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const getAnalysis = () => {
    if (analysis.totalSpending === 0) {
      analysis.getAnalysis();
    }
  };
  useEffect(() => getAnalysis());

  const chartReference = React.createRef();
  useEffect(() => console.log(chartReference));

  const values = () => analysis.categoryData.map((cat) => cat.spent_amount);
  const labels = () =>
    analysis.categoryData.map((cat) =>
      fistCharacterUpperCase(cat.category_name)
    );
  const bgColors = () => chartColorPalette(analysis.categoryData.length);

  var data = {
    datasets: [
      {
        data: values(),
        borderColor: '#222222',
        backgroundColor: bgColors(),
        label: 'Dataset 1',
      },
    ],
    labels: labels(),
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      // display: true,
      // text: 'Spending per category',
      // fontColor: '#ffffff',
      // fontSize: 13,
      // fontStyle: 'normal',
      // position: 'bottom',
    },
    legend: {
      position: 'right', //TODO 'bottom' on xs
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
