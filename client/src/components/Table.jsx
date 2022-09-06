import React, { useEffect } from 'react';

import { Row } from './';

import './styles/Table.css';

const Table = ({ data, laterals, segments, setLaterals, setSegments }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
      }, []);

    const getLateralArray = () => {
        let arr = [];
        for (let i = 0; i < laterals; i++) {
            arr.push(i);
        }
        return arr;
    }

    const getRow = (y) => {
        let row = [];
        row = data.filter((e) => e.y === y);
        console.log(row);
        return row;
    }

    return (
        <div className='table-wrapper'>
                <div>
                    <Row key={'row' + -1} y={-1} segments={segments} laterals={laterals} setLaterals={setLaterals} setSegments={setSegments} row={[]} />
                    {
                        getLateralArray().map((y) =>
                        (
                            <Row key={'row' + y} y={y} segments={segments} laterals={laterals} setLaterals={setLaterals} setSegments={setSegments} row={getRow(y)} />
                        ))
                    }
                </div>
        </div>
    )
}

export default Table
