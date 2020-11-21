import React from 'react';
import { Button } from 'react-bootstrap';

const AnalysisHeader = ({ syncAction, headerCaption, children }) => { //TODO refactor this (almost same as ModelListHeader)
  return (
    <div className='d-flex justify-content-between align-content-center'>
      <h4 className='lead-font text-left m-0 pl-2 py-1'>{headerCaption}</h4>
      <div className='d-flex flex-column-reverse flex-sm-row justify-content-between align-content-end align-content-sm-center'>
        {children}
        <Button
          className='p-2 px-3 my-1 align-self-center'
          variant='outline-primary'
          onClick={syncAction}
        >
          <i className='fas fa-sync-alt pr-sm-2' />
          <span className='d-none d-sm-inline'>Synchronize</span>
        </Button>
      </div>
    </div>
  );
};

export default AnalysisHeader;
