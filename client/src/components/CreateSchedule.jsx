import React, { useState, useEffect } from 'react'
import { ScheduleForm, Schedule } from './'

import { BsInfoCircleFill } from 'react-icons/bs';

import './styles/CreateSchedule.css';

const initialSchedule = {
  id: 0,
  activeNodes: [],
  segmentApplicationRate: 0,
  lateralLength: 0,
  segmentFlow: 0,
  cycleTime: 0,
  cycles: 0,
  eventCycles: 0
}

const CreateSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className='CreateSchedule-page-wrapper'>
      <div className='CreateSchedule-page-components'>
        <div className='CreateSchedule-page-header'>
          <BsInfoCircleFill className='CreateSchedule-page-header-icon' />
          <p className='CreateSchedule-page-header-text'>Fill in the details of your schedule, and click display to display your schedule.</p>
        </div>
        <div className='CreateSchedule-page-content'>
          <ScheduleForm setSchedule={setSchedule} setLoading={setLoading} />
          <span className='CreateSchedule-page-divider'></span>
          {loading ? <p className='CreateSchedule-page-loading'>Loading...</p>
            : (schedule === initialSchedule) ? <p className='CreateSchedule-page-loading'>Waiting for input...</p>
              : <Schedule schedule={schedule} />}
        </div>
      </div>
    </div>
  )
}

export default CreateSchedule
