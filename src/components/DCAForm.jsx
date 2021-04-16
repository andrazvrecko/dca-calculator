import React, {useState} from 'react';
import {Form, Button, Card, Col, Row, Modal, Dropdown} from 'react-bootstrap';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CurrencyDropdown from './CurrencyDropdown';
import IntervalDropdown from './IntervalDropdown';
import './DatePicker.scss';
import './Calendar.scss';

function DCAForm() {
    const [amount, setAmount] = useState(100);
    const [currency, setCurrency] = useState("Bitcoin");
    const [dcaInterval, setDcaInverval] = useState(31)
    const [date, setDate] = useState(new Date(2021, 1, 1));
    const [show, setShow] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [currencyChart, setCurrencyChart] = useState(-1);
    const [minDate, setMinDate] = useState(1367107200000);

    function getData(curr){
        console.log("Updating price chart...");
        const link = 'https://api.coingecko.com/api/v3/coins/'+curr.toLowerCase()+'/market_chart?vs_currency=USD&days=max';
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => {
            const obj = JSON.parse(result).prices; 
            setMinDate(obj[0][0]);
            setCurrency(obj);
        }, (error) => {setCurrency(-1)});
    }

    function showData(){
        handleShow();
    }

    function handleAmount(event) {
        const num = Number(event.target.value);
        setAmount(num)
    }
    function handleCurrency(event) {
        setCurrency(event);
        getData(event);
    }
    function handleInterval(event) {
        setDcaInverval(event);
    }

    function handleInputFocus(event){
        setInputFocus(true);
    }

    function handleInputBlur(event){
        setInputFocus(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Card style={{ width: '24rem', 'boxShadow': '0 0 450px 450px #fdeaf1', 'borderRadius': '10%', border: '0px'}}>
                <Card.Body>
                    <Card.Title>Dollar Cost Average Calculator</Card.Title>
                        <Form>
                            <Form.Group as={Row} controlId="formAmount">
                                <Form.Label column sm="4">If I bought </Form.Label>
                                <Col sm="8">
                                <div className={inputFocus ? "divInputFocus" : "divInput"}>
                                    <input class="input-field" onFocus={handleInputFocus} onBlur={handleInputBlur} type="number" placeholder="100" name="usrnm"></input>
                                    <label><b>USD</b></label>
                                </div>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formCurrency">
                                <Form.Label column sm="4">Worth of</Form.Label>
                                <Col sm="8">
                                    <CurrencyDropdown currentChanged={handleCurrency} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formInterval">
                                <Form.Label column sm="4">Every</Form.Label>
                                <Col sm="8">
                                    <IntervalDropdown currentChanged={handleInterval} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formDate">
                                <Form.Label column sm="4">Starting</Form.Label>
                                <Col sm="8">
                                    <DatePicker
                                    onChange={setDate}
                                    value={date}
                                    minDate={new Date(minDate)}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="Div-Center">
                            <Button variant="primary" onClick={getData}
                            style={{'borderRadius': '20px', width: '100%'}}
                            >
                                <h5>I would have</h5>
                            </Button>
                            </div>
                        </Form>
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
