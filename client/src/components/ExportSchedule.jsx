import React, { useState, useEffect } from 'react';

import './styles/ExportSchedule.css';

import Selecto from "react-selecto";
import Table from './Table';
import { IoReloadCircleSharp } from 'react-icons/io5';

const values = { lateralInput: 18, segmentInput: 35 };

const ExportTopBar = ({ data, segments, laterals, setLaterals, setSegments }) => {
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState(values);

  useEffect(() => {
    if (form.segmentInput !== undefined && form.lateralInput !== undefined && form.lateralInput > 0 && form.segmentInput > 0)
      setDisabled(false);
    else
      setDisabled(true);
  }, [form]);

  useEffect(() => {
    setDisabled(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    if (!disabled) {
      event.preventDefault();
      setSegments(form.segmentInput);
      setLaterals(form.lateralInput);
      setDisabled(true);
    }
  }

  const exportJson = async () => {
    let jsonToExport = createJson();
    let now = new Date();
    const fileName = "application_"+now.toLocaleDateString()+"_"+now.toLocaleTimeString();
    const json = JSON.stringify(jsonToExport);
    const blob = new Blob([json], {type: 'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const isLateralEmpty = (lateral) => {
    return data.filter((e) => e.y === lateral).filter((e) => e.data !== '').length === 0;
  }

  const createLaterals = (dateTime) => {
    const lateralsArr = []
    for (let i = 0; i < laterals; i++) {
      if (!isLateralEmpty(i)) {
        let lateral = {
          "id": i,
          "order": i,
          "creationTime": dateTime,
          "segments": createSegements(i, dateTime),
        }
        lateralsArr.push(lateral);
      }
    }
    return lateralsArr;
  }

  const createSegements = (lateral, dateTime) => {
    const segementsArr = []
    for (let i = 0; i < segments; i++) {
      let element = data.find((e) => (e.y === lateral && e.x === i));
      if (element !== undefined) {
        if (element.data !== '') {
          let segement = {
            "id": i,
            "order": i,
            "creationTime": dateTime,
            "value": element.data
          }
          segementsArr.push(segement);
        }
      }
    }
    return segementsArr;
  }

  const getDateTime = () => {
    const today = Date.now()
    return '' + new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today)
  }

  const createJson = () => {
    const blockId = 1;
    const dateTime = getDateTime();
    let application = {
      "id": 1,
      "creationTime": dateTime,
      "status": "Enabled",
      "blocks": [
        {
          "id": blockId,
          "order": blockId,
          "creationTime": dateTime,
          "laterals": createLaterals(dateTime),
        }
      ],
    };
    return application;
  }

  return (
    <div className='export-top-bar-wrapper'>
      <div className='export-top-bar-items'>
        <input value={form.lateralInput} className='export-input' name='lateralInput' type='number' placeholder='Number of Laterals' onChange={handleChange} />
        <input value={form.segmentInput} className='export-input' name='segmentInput' type='number' placeholder='Number of Segments' onChange={handleChange} />
        <div className={disabled ? 'export-button-disabled' : 'export-button'} onClick={handleSubmit}>
          <IoReloadCircleSharp size='25px' className='export-reload-icon' />
        </div>
        <button className='export-button-export' onClick={exportJson}>Export</button>
      </div>
    </div>
  );
}

const ExportSchedule = () => {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState(values.segmentInput);
  const [laterals, setLaterals] = useState(values.lateralInput);
  const [data, setData] = useState([]);
  var selectedItems = [];

  useEffect(() => {
    setLoading(true);
    const arr = [];
    for (let i = 0; i < laterals; i++) {
      for (let j = 0; j < segments; j++) {
        let element = data.find((e) => (e.x === j && e.y === i));
        if (element !== undefined)
          arr.push({ x: j, y: i, data: element.data });
        else
          arr.push({ x: j, y: i, data: '' });
      }
    }
    setData([...arr]);
  }, [segments, laterals]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const addSelected = (x, y) => {
    if (selectedItems.filter((e) => (e.x === x && e.y === y)).length === 0)
      selectedItems.push({ x: x, y: y });
  }

  const removeSelected = (x, y) => {
    selectedItems = selectedItems.filter((e) => !(e.x === x && e.y === y));
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
              addSelected(parseInt(el.getAttribute('x')), parseInt(el.getAttribute('y')));
            });
            e.removed.forEach(el => {
              el.classList.remove("selected");
              removeSelected(parseInt(el.getAttribute('x')), parseInt(el.getAttribute('y')));
            });
          }}
        />
      </div>
      <ExportTopBar data={data} segments={segments} laterals={laterals} setLaterals={setLaterals} setSegments={setSegments} />
      {loading ? 'Loading...' :
        <Table key={laterals + ',' + segments} data={data} laterals={laterals} segments={segments} setLaterals={setLaterals} setSegments={setSegments} />
      }
    </div>
  );
}

export default ExportSchedule
