import React from 'react';

const AnalysisHeader = ({ headerCaption, children }) => { //TODO refactor this (almost same as ModelListHeader)
  return (
    <div className='d-flex justify-content-between align-content-center'>
      <h4 className='lead-font text-left m-0 py-1'>{headerCaption}</h4>
      <div className='d-flex flex-column-reverse flex-sm-row justify-content-between align-content-end align-content-sm-center'>
        {children}
      </div>
    </div>
  );
};

export default AnalysisHeader;
