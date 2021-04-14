import React, {useState} from 'react';
import {Form, Button, Card, Col, Row, Modal} from 'react-bootstrap';
import DatePicker from 'react-date-picker';

function DCAForm() {
    const [amount, setAmount] = useState(100);
    const [currency, setCurrency] = useState("Bitcoin");
    const [interval, SetInverval] = useState(31)
    const [date, setDate] = useState(new Date(2021, 1, 1));
    const [show, setShow] = useState(false);

    function showData(){
        handleShow();
    }

    function handleAmount(event) {
        const num = Number(event.target.value);
        setAmount(num)
    }
    function handleCurrency(event) {
        setCurrency(event.target.value);
    }
    function handleInterval(event) {
        setInterval(event.target.value);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card style={{ width: '24rem', 'box-shadow': '0 0 450px 450px #fdeaf1', 'border-radius': '10%', border: '0px'}}>
                <Card.Body>
                    <Card.Title>DCA Calculator</Card.Title>
                    <br />
                    <Card.Text>
                        <Form>
                            <Form.Group as={Row} controlId="formAmount">
                                <Form.Label column sm="4">If I bought </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="number" placeholder="100" onChange={handleAmount}
                                    style={{'border-radius': '20px', width: '100%'}}
                                    />
                                </Col>
                                <Form.Label column sm="2">USD</Form.Label>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="formCurrency">
                                <Form.Label column sm="4">Worth of</Form.Label>
                                <Col sm="8">
                                <Form.Control as="select" onChange={handleCurrency}
                                style={{'border-radius': '20px', width: '100%'}}
                                >
                                    <option>Bitcoin</option>
                                    <option>Ethereum</option>
                                </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formInterval">
                                <Form.Label column sm="4">Every</Form.Label>
                                <Col sm="8">
                                <Form.Control as="select" onChange={handleInterval}
                                style={{'border-radius': '20px', width: '100%'}}
                                >
                                    <option>Day</option>
                                    <option>Week</option>
                                    <option selected>Month</option>
                                    <option>Year</option>
                                </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formDate">
                                <Form.Label column sm="4">Starting</Form.Label>
                                <Col sm="8">
                                    <DatePicker
                                    onChange={setDate}
                                    value={date}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="Div-Center">
                            <Button variant="primary" onClick={showData}
                            style={{'border-radius': '20px', width: '100%'}}
                            >
                                <h5>I would have</h5>
                            </Button>
                            </div>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="resultModal">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Results</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Today, I would have <b>X</b> {currency} (<b>Y</b> USD).
                        <br />
                        I would have bought {currency} <b>Z</b> times.
                        <br />
                        Total amount spent: <b>M</b>.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default DCAForm
