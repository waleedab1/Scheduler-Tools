import React, { useState } from 'react';

import './ExportSchedule.css';

import Selecto from "react-selecto";

const NodeItem = ({ x, y, data }) => {

  return (
    <div className='target' x={x} y={y}>
      <p className='node-item-input'>{data}</p>
    </div>
  );
}

const Row = ({ segments }) => {

  return (
    <div className='row-wrapper'>
      {
        segments.map((e) => {
          return (<NodeItem key={e.x+','+e.y} y={e.y} x={e.x} data={e.data}/>);
        })
      }
    </div>
  );
}

const ExportSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState(4);
  const [laterals, setLaterals] = useState(10);
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const initData = () => {
    [...Array(segments).keys()].map((x) => {
      return [...Array(laterals).keys()].map((y) => {
      return data.push({x: x, y: y, data: x + ' ' + y})
      });
    });
    setLoading(false);
  }

  const displayData = () => {
    console.log(data);
  }

  const getRow = (y) => {
    let row = [];
    data.map((e) => (e.y === y ? row.push(e) : ''));
    return row;
  }

  const addSelected = (x, y) => {
    if (selectedItems.filter((e) => (e.x === x && e.y === y)).length === 0)
      selectedItems.push({ x: x, y: y });
  }

  const removeSelected = (x, y) => {
    setSelectedItems([...selectedItems.filter((e) => !(e.x === x && e.y === y))]);
  }

  const handleEnter = () => {
    let value = prompt("Please enter amount");
    selectedItems.map((e) => {
      let index = data.findIndex((node) => (node.x === e.x && node.y === e.y))
      data[index].data = value;
    });
    setData([...data]);
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (selectedItems.length === 0)
        alert('You have not selected any item to update.')
      else
        handleEnter();
    }
  }

  return (
    <div className='export-page-wrapper' onKeyDown={_handleKeyDown} tabIndex="0">
      <div>
        <Selecto
          // The container to add a selection element
          container={document.body}
          // The area to drag selection element (default: container)
          dragContainer={window}
          // Targets to select. You can register a queryselector or an Element.
          selectableTargets={[".target", document.querySelector(".target2")]}
          // Whether to select by click (default: true)
          selectByClick={true}
          // Whether to select from the target inside (default: true)
          selectFromInside={true}
          // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
          continueSelect={false}
          // Determines which key to continue selecting the next target via keydown and keyup.
          toggleContinueSelect={"shift"}
          // The container for keydown and keyup events
          keyContainer={window}
          // The rate at which the target overlaps the drag area to be selected. (default: 100)
          hitRate={100}
          onSelect={e => {
            e.added.forEach(el => {
              el.classList.add("selected");
              addSelected(parseInt(el.getAttribute('x')),parseInt(el.getAttribute('y')));
            });
            e.removed.forEach(el => {
              el.classList.remove("selected");
              removeSelected(parseInt(el.getAttribute('x')), parseInt(el.getAttribute('y')));
            });
          }}
        />
      </div>
      <button onClick={initData}/>
      <div>
      {
        loading ? 'Loading...' : 
        [...Array(laterals).keys()].map((y) => {
          return <Row segments={getRow(y)}/>
        })
      }
            <button onClick={displayData}/>
      </div>
    </div>
  );
}

export default ExportSchedule
