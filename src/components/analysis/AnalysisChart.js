import React from 'react';
import { Pie } from 'react-chartjs-2';
import chartColorPalette from '../../utility/chartUtility/chartColorPalette';
import { fistCharacterUpperCase } from '../../utility/stringUtility';

const Analysis = ({ categoryData }) => {
  const values = () => categoryData.map((cat) => cat.spent_amount);
  const labels = () =>
    categoryData.map((cat) => fistCharacterUpperCase(cat.category_name));
  const bgColors = () => chartColorPalette(categoryData.length);

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
        display: !isSmall,
        position: 'right',
        align: 'center',
        labels: {
          fontColor: '#ffffff',
        },
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const i = tooltipItem.index;
            return `${data.labels[i]}: ${categoryData[i].spent_percent}%, ${data.datasets[0].data[i]}zł`;
          },
        },
      },
    };
  };
  return (
    <div className='align-self-center'>
      <div className='chart d-none d-md-block'>
        <Pie data={data} options={options(false)} />
      </div>
      <div className='chart d-md-none'>
        <Pie data={data} options={options(true)} />
      </div>
    </div>
  );
};

export default Analysis;
