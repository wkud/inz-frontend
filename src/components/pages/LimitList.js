import React, { useContext, useEffect, useState } from 'react';
import { LimitContext } from '../../context/LimitContext';
import { ListGroup, Button } from 'react-bootstrap';
import Limit from '../model_items/Limit';
import ModelListHeader from '../common-for-models/ModelListHeader';
import LimitInfoToggleCheckbox from '../model-views-addons/LimitInfoToggleCheckbox';

const LimitList = () => {
  const limit = useContext(LimitContext);

  const getLimits = () => {
    if (limit.list.length === 0) limit.getAll();
  };
  useEffect(() => getLimits());

  const syncLimits = () => {
    limit.clearFlags(); //force try again
    limit.getAll();
  };

  const noItemsCaption = () =>
    limit.loading
      ? 'Loading...'
      : limit.errorMessage
      ? 'Cannot load expense list due to an error'
      : 'There are no items to be displayed';

  const [rateVisible, setRateVisibility] = useState(true);
  const onShowRateChange = () => setRateVisibility(!rateVisible);

  return (
    <div className='d-flex flex-column align-items-center'>
      <ModelListHeader syncAction={syncLimits} headerCaption='Limits'>
        <LimitInfoToggleCheckbox
          className='d-none d-sm-block px-3'
          checked={rateVisible}
          onChange={onShowRateChange}
        />
      </ModelListHeader>
      <div className='d-flex d-sm-none justify-content-start model-view'>
        <LimitInfoToggleCheckbox
          className='px-2'
          checked={rateVisible}
          onChange={onShowRateChange}
        />
      </div>
      <ListGroup className='model-view scroll'>
        <div className='p-0'>
          {limit.list.length === 0 ? (
            <ListGroup.Item>{noItemsCaption()}</ListGroup.Item>
          ) : (
            limit.list.map((limit) => (
              <Limit limit={limit} key={limit.id} rateVisible={rateVisible} />
            ))
          )}
        </div>
      </ListGroup>
      <Button className='text-center model-view' href='#limit/form'>
        Add new limit
      </Button>
    </div>
  );
};

export default LimitList;
