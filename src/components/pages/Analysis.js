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
  const options = (isSmall) => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
      },
      legend: {
        position: isSmall ? 'bottom' : 'right', //TODO 'bottom' on xs
        align: isSmall ? 'start' : 'center', //TODO 'start' on xs
        labels: {
          fontColor: '#ffffff',
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const i = tooltipItem.index;
            return `${data.labels[i]}: ${analysis.categoryData[i].spent_percent}%, ${data.datasets[0].data[i]}zł`;
          },
        },
      },
    };
  };
  return (
    <>
      <div className='chart align-self-center d-none d-md-block'>
        <Pie data={data} options={options(false)} />
      </div>
      <div className='chart align-self-center d-md-none'>
        <Pie data={data} options={options(true)} />
      </div>
    </>
  );
};

export default Analysis;
