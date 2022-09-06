import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './styles/Schedule.css';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';


const ActiveCheck = ({ rows }) => {
    const [choiceX, setChoiceX] = useState(0);
    const [choiceY, setChoiceY] = useState(0);

    return (
        <div className='check-active-wrapper'>
            <p className='check-active-text'>Active Check</p>
            <div className='check-active-select'>
                <select onChange={(e) => setChoiceX(e.target.value)}>
                    {rows[0].map((col, i) => {
                        return (
                            <option>{i}</option>
                        );
                    })}
                </select>
            </div>
            <div className='check-active-select'>
                <select onChange={(e) => setChoiceY(e.target.value)}>
                    {rows.map((row, i) => {
                        return (
                            <option>{i}</option>
                        );
                    })}
                </select>
            </div>
            <div className='check-active-icon'>
                {rows[choiceY][choiceX] ? <AiFillCheckCircle color='green' /> : <AiFillCloseCircle color='rgb(156, 16, 58)' />}
            </div>
        </div>
    );
}

const ScheduleDetails = ({ schedule }) => {
    const { segmentApplicationRate, lateralLength, segmentFlow, cycleTime, cycles, eventCycles } = { ...schedule };

    return (
        <div className='schedule-details-wrapper'>
            <Table variant='dark' striped hover bordered>
                <thead>
                    <tr>
                        <th>Segment Application Rate</th>
                        <th>Lateral Length</th>
                        <th>Segment Flow</th>
                        <th>Cycle Time</th>
                        <th>Cycles</th>
                        <th>Event Cycles</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{segmentApplicationRate} (mm/h)</td>
                        <td>{lateralLength} (m)</td>
                        <td>{segmentFlow} (l/h)</td>
                        <td>{cycleTime} (min)</td>
                        <td>{cycles}</td>
                        <td>{eventCycles}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

function Schedule({ schedule }) {
    const { activeNodes } = { ...schedule };
    return (
        <div className='schedule-components-wrapper'>
            <ActiveCheck rows={activeNodes} />
            <ScheduleDetails schedule={schedule} />
            <div className='schedule-wrapper'>
                <Table variant="dark" bordered hover responsive='sm'>
                    <thead>
                        <tr>
                            <th>Cycles\Segements</th>
                            {
                                activeNodes[0].map((col, i) => {
                                    return (<th>{i}</th>);
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeNodes.map((row, i) => {
                                return (
                                    <tr>
                                        <td>{i}</td>
                                        {
                                            row.map((col, j) => {
                                                return (
                                                    <td>
                                                        <OverlayTrigger
                                                            key='top'
                                                            placement='top'
                                                            overlay={
                                                                <Tooltip id={`tooltip-top`}>
                                                                    {`Current - ( ${j} , ${i} )`}
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <div className={activeNodes[i][j] ? 'schedule-cell-active' : 'schedule-cell-deactive'} />
                                                        </OverlayTrigger>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Schedule;