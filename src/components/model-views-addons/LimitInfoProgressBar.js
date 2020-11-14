import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const LimitInfoProgressBar = ({spentPercent, isLimitFinished}) => {
  return (
    <div className='pt-2'>
      <ProgressBar>
        <ProgressBar
          className='progress-bar-font'
          variant={
            spentPercent > 100
              ? 'danger'
              : isLimitFinished
              ? 'success'
              : 'primary'
          }
          animated
          label={`spent ${spentPercent}%`}
          now={spentPercent}
        />
      </ProgressBar>
    </div>
  );
};

export default LimitInfoProgressBar;
