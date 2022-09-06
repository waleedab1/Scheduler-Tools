import React from 'react'

import { NodeItem } from './';

import { AiOutlinePlusCircle } from 'react-icons/ai';

const HeaderNode = ({ content }) => {

  return (
    <div className='table-header-node'>
      <p className='node-item-input'>{content}</p>
    </div>
  );
}

const AddNode = () => {

  return (
    <div className='table-add'>
      <p className='table-add-content'><AiOutlinePlusCircle size='30px'/></p>
    </div>
  );
}

const Row = ({ segments, laterals, setLaterals, setSegments, row, y }) => { 

  const addSegment = () => {
    setSegments(parseInt(segments) + 1);
  }

  const addLateral = () => {
    setLaterals(parseInt(laterals) + 1);
  }

  const getSegmentArray = () => {
    let arr = [];
    for (let i = 0; i < segments; i++) {
      arr.push(i);
    }
    return arr;
  }

  return (
    <div>
      {
        y === -1 ?
          <div className='row-wrapper'>
            <HeaderNode content='L/S' />
            {
              (getSegmentArray().map((e) => (<HeaderNode content={e} />)))
            }
            <div onClick={addSegment}>
              <AddNode/>
            </div>
          </div> :
          <div className='row-wrapper'>
            <HeaderNode content={y} />
            {
              row.map((e) =>
                (<NodeItem key={e.x + ',' + e.y} y={e.y} x={e.x} data={e.data} />))
            }
        </div>
      }
      {
          y === laterals - 1 ? 
          <div onClick={addLateral}>
              <AddNode/>
          </div> : <></>
      }
    </div>
  );
}

export default Row
