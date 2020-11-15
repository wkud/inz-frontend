import React, { useContext, useEffect, useState } from 'react';
import { LimitContext } from '../../context/LimitContext';
import { ListGroup, Button } from 'react-bootstrap';
import ModelListHeader from '../common-for-models/ModelListHeader';
import LimitSection from '../model-views-addons/LimitSection';
import ToggleCheckbox from '../general/ToggleCheckbox';

const LimitList = () => {
  const limit = useContext(LimitContext);

  const getLimits = () => {
    if (limit.isLocalListEmpty()) limit.getAll();
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
        <ToggleCheckbox
          clsName='d-none d-sm-block px-3'
          checked={rateVisible}
          onChange={onShowRateChange}
          label='Show saving rate'
          id='showSavingRateToggle'
          />
      </ModelListHeader>
      <div className='d-flex d-sm-none justify-content-start model-view'>
        <ToggleCheckbox
          clsName='px-2'
          checked={rateVisible}
          onChange={onShowRateChange}
          label='Show saving rate'
          id='showSavingRateToggle'
          />
      </div>
      <ListGroup className='model-view scroll'>
        <div className='p-0 pb-1'>
          {limit.isLocalListEmpty() ? (
            <ListGroup.Item>{noItemsCaption()}</ListGroup.Item>
          ) : (
            <>
              <LimitSection
                headerCaption='Current limits'
                limitList={limit.current}
                rateVisible={rateVisible}
                toggleId='currentLimitsToggle'
              />
              <LimitSection
                headerCaption='Upcoming limits'
                limitList={limit.upcoming}
                rateVisible={rateVisible}
                toggleId='upcomingLimitsToggle'
              />
              <LimitSection
                headerCaption='Finished limits'
                limitList={limit.finished}
                rateVisible={rateVisible}
                toggleId='finishedLimitsToggle'
              />
            </>
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
