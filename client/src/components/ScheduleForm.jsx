import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './styles/ScheduleForm.css';

const axios = require('axios');

const baseURL = 'http://localhost:8080';


const initialState = {
    blockSize: 0,
    eventTime: 0,
    applicationResolution: 0,
    emitterFlow: 0,
    emitterSpacing: 0,
    lateralSpacing: 0,
    segmentLength: 0,
    nodesInLateral: 0,
    irrigationEventApplication: 0
};

function ScheduleForm({ setSchedule, setLoading }) {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        getSchedule();
    }

    const getSchedule = async () => {
        return await axios.post(`${baseURL}/schedule`, form)
            .then(function (response) {
                setSchedule(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className='form-wrapper'>
            <Form onSubmit={handleSubmit} className='form-items'>
                <Form.Group className="mb-3" controlId="formBasicText" >
                    <Form.Label>Block Size</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Block Size" name='blockSize' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (Ha)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Irrigation Event Application</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Irrigation Event Application" name='irrigationEventApplication' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (mm)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Event Time" name='eventTime' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (h)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Application Resolution</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Application Resolution" name='applicationResolution' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (mm)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Emitter Flow</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Emitter Flow" name='emitterFlow' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (l/h)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Emitter Spacing</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Emitter Spacing" name='emitterSpacing' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (m)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Lateral Spacing</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Lateral Spacing" name='lateralSpacing' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (m)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Segment Length</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Segment Length" name='segmentLength' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        Unit ~ (m)
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Nodes In Lateral</Form.Label>
                    <Form.Control type='number' step="0.01" placeholder="Nodes In Lateral" name='nodesInLateral' onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        The number of nodes in a lateral.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select id="activeSelect">
                        <option>Uniform Schedule</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                        The algotithm used in the creation of the schedule.
                    </Form.Text>
                </Form.Group>
                <Button variant="success" type="submit">
                    Display
                </Button>
            </Form>
        </div>
    );
}

export default ScheduleForm;
