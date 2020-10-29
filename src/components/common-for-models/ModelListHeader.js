import React from 'react';
import { Button } from 'react-bootstrap';

const ModelListHeader = ({syncButtonOnClick, headerCaption}) => {
  return (
    <div className='d-flex justify-content-between'>
      <h4 className='lead-font text-left m-0 pl-2 py-1'>{headerCaption}</h4>
      <Button
        className='p-2 px-3 my-1 align-self-center'
        variant='outline-primary'
        onClick={syncButtonOnClick}
      >
        <i class='fas fa-sync-alt' />
      </Button>
    </div>
  );
};

export default ModelListHeader;
