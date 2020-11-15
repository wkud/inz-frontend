import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import ToggleCheckbox from '../general/ToggleCheckbox';
import Limit from '../model_items/Limit';

const LimitSection = ({ headerCaption, limitList, rateVisible, toggleId }) => {
  const [visible, setVisible] = useState(headerCaption.includes('Current'));

  return (
    <>
      <div className='d-flex justify-content-between align-content-center model-view px-3'>
        <h5 className='lead-font text-left m-0 pl-2 py-1'>{headerCaption}</h5>
        <ToggleCheckbox
          clsName='pr-2 text-center'
          checked={visible}
          onChange={() => setVisible(!visible)}
          label=''
          id={toggleId}
        />
      </div>

      {visible && (limitList.length === 0
        ? <ListGroup.Item className='text-dark'>There are no items to be displayed</ListGroup.Item>
        : limitList.map((limit) => (
            <Limit limit={limit} key={limit.id} rateVisible={rateVisible} />
          )))}
    </>
  );
};

export default LimitSection;
