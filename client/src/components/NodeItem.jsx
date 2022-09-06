import React from 'react'

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const NodeItem = ({ x, y, data }) => {

  const getColor = (d) => (
    parseInt(d) > 30 ? 'red' : parseInt(d) > 20 ? 'orange' : parseInt(d) > 10 ? 'green' : parseInt(d) >= 0 ? 'yellow' : 'none'
  );

  return (

    <div className='target' x={x} y={y}>
      <OverlayTrigger
        key={'top'}
        placement={'top'}
        delay= {2000}
        overlay={
          <Tooltip id={`tooltip-${'top'}`}>
            <p>{`Current - ( ${x},${y} )`}</p>
            <p>{`data - ${data}`}</p>
            <p>{`Level - ${getColor(data)}`}</p>
          </Tooltip>
        }
      >
        <span className={`node-level-${getColor(data)}`}>
          <p className='node-item-input'>{data}</p>
        </span>        
        </OverlayTrigger>
    </div>
  );
}

export default NodeItem
