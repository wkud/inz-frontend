import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { fistCharacterUpperCase } from '../../utility/stringUtility';
import LimitDuration from '../limit_page_addons/LimitDuration';
import LimitInfoProgressBar from '../limit_page_addons/LimitInfoProgressBar';
import LimitInfoSavingRateCaption from '../limit_page_addons/LimitInfoSavingRateCaption';
import { spentPercent } from '../../utility/limitUtility';

const Limit = ({ limit, rateVisible }) => {
  const isLimitFinished = () => limit.info.duration_category === 'finished';

  return (
    <ListGroup.Item>
      <Row className='d-flex flex-row justify-content-between'>
        <Col xs={6} sm={3} className='text-left'>
          {fistCharacterUpperCase(limit.category_name)}
        </Col>
        <LimitDuration
          clsName='d-none d-sm-inline'
          durationStart={limit.duration_start}
          durationEnd={limit.duration_end}
        />
        <Col xs={6} sm={3} className='text-right'>
          {`${limit.info.spent_amount} / ${limit.planned_amount}zł`}
        </Col>
        <LimitDuration
          clsName='d-sm-none'
          durationStart={limit.duration_start}
          durationEnd={limit.duration_end}
        />
      </Row>
      {rateVisible && (
        <>
          <LimitInfoProgressBar
            spentPercent={spentPercent(limit)}
            isLimitFinished={isLimitFinished()}
          />
          <Row className='small-font text-dark'>
            <Col sm={3} className='text-left'>
              {`Days passed: ${limit.info.duration_past} / ${limit.info.duration_length}`}
            </Col>
            <LimitInfoSavingRateCaption
              spentPercent={spentPercent(limit)}
              savings={limit.planned_amount - limit.info.spent_amount}
              isSavingRateGood={limit.info.saving_rate === 'good'}
              isLimitFinished={isLimitFinished()}
            />
            <Col sm={3} className='text-right'>
              total spending {spentPercent(limit)}%
            </Col>
          </Row>
        </>
      )}
    </ListGroup.Item>
  );
};

export default Limit;
