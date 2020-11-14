import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const LimitInfoProgressBar = ({
  spentPercent,
  durationPercent,
  isSavingRateGood,
}) => {

  const nowValue = (index) => {
    let value = []
    if (isSavingRateGood)
      value = [spentPercent, Math.abs(durationPercent-spentPercent)]
    else if(spentPercent <= 100)
      value = [durationPercent, Math.abs(durationPercent-spentPercent)]
    else
      value = [100, spentPercent-100]
    return value[index]
  }

  if (isSavingRateGood)
    return (
      <ProgressBar>
        <ProgressBar className='progress-bar-font' variant='primary' striped label={`spent ${nowValue(0)}%`} now={nowValue(0)}/>
        <ProgressBar className='progress-bar-font' variant='success' striped animated label={`savings ${nowValue(1)}%`} now={nowValue(1)}/>
      </ProgressBar>
    );
  else if(spentPercent <= 100) return <ProgressBar>
    <ProgressBar className='progress-bar-font' variant='primary' striped label={`spent ${nowValue(0)}%`} now={nowValue(0)}/>
    <ProgressBar className='progress-bar-font' variant='danger' striped animated label={`excess ${nowValue(1)}%`} now={nowValue(1)}/>
  </ProgressBar>
  else return <ProgressBar>
    <ProgressBar className='progress-bar-font' variant='primary' striped animated label='spent 100%' now={nowValue(0)}/>
    <ProgressBar className='progress-bar-font' variant='danger' striped animated label={`excess ${nowValue(1)}%`} now={nowValue(1)}/>
  </ProgressBar>

};

export default LimitInfoProgressBar;
