import React, { useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AnalysisContext } from '../../context/AnalysisContext';
import chartColorPalette from '../../utility/chartUtility/chartColorPalette';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
// import { Parser as HtmlToReactParser } from 'html-to-react';

const Analysis = () => {
  const analysis = useContext(AnalysisContext);

  const getAnalysis = () => {
    if (analysis.totalSpending === 0) {
      analysis.getAnalysis();
    }
  };
  useEffect(() => getAnalysis());

  // const chartReference = React.createRef();
  // useEffect(() => {
  //   console.log(chartReference);
  //   if (!!chartReference) {
  //     console.log(chartReference.current.chartInstance);
  //     chartReference.current.chartInstance.generateLegend();
  //   }
  // });

  // const htmlParser = new HtmlToReactParser();

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
        position: isSmall ? 'bottom' : 'right',
        align: isSmall ? 'start' : 'center',
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
      // legendCallback: (chart) => {
      //   const renderLabels = (chart) => {
      //     const { data } = chart;
      //     return data.datasets[0].data
      //       .map(
      //         (_, i) =>
      //           `<div>
      //               <div id="legend-${i}-item" class="legend-item">
      //                 <span style="background-color:
      //                   ${data.datasets[0].backgroundColor[i]}">
      //                   &nbsp;&nbsp;&nbsp;&nbsp;
      //                 </span>
      //                 ${
      //                   data.labels[i] &&
      //                   `<span class="label">${data.labels[i]}: $${data.datasets[0].data[i]}</span>`
      //                 }
      //               </div>
      //           </div>
      //         `
      //       )
      //       .join('');
      //   };
      //   return `
      //     <div class="chartjs-legend d-flex flex-column">
      //       ${renderLabels(chart)}
      //     </div>`;
      // },
    };
  };
  return (
    <>
      <div className='chart align-self-center d-none d-md-block'>
        <Pie data={data} options={options(false)} />
        {/* <Pie data={data} options={options(false)} ref={chartReference} /> */}
      </div>
      <div className='chart align-self-center d-md-none'>
        <Pie data={data} options={options(true)} />
        {/* <Pie data={data} options={options(true)} ref={chartReference} /> */}
        {/* {!!chartReference.current &&
          htmlParser.parse(
            chartReference.current.chartInstance.generateLegend()
          )} */}
      </div>
    </>
  );
};

export default Analysis;
