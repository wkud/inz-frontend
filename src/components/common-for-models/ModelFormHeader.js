import React from 'react';
import { Button } from 'react-bootstrap';

const ModelFormHeader = ({ clearAction, headerCaption }) => {
  return (
    <div className='d-flex justify-content-between'>
      <h4 className='lead-font text-left m-0 py-1 '>{headerCaption}</h4>
      <Button
        className='p-2 px-3 my-1 align-self-center'
        variant='outline-primary'
        onClick={clearAction}
      >
        <i className='fas fa-eraser pr-sm-2' />
        <span className='d-none d-sm-inline'>Clear</span>
      </Button>
    </div>
  );
};

export default ModelFormHeader;
