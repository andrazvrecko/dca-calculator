import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Col, Row, Modal} from 'react-bootstrap';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import CurrencyDropdown from './CurrencyDropdown';
import IntervalDropdown from './IntervalDropdown';
import '../style/DatePicker.scss';
import '../style/Calendar.scss';

function DCAForm() {
    const [amount, setAmount] = useState(100);
    const [currency, setCurrency] = useState("Bitcoin");
    const [dcaInterval, setDcaInverval] = useState("Month")
    const [date, setDate] = useState(new Date(2021, 1, 1));
    const [show, setShow] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const [currencyChart, setCurrencyChart] = useState(-1);
    const [minDate, setMinDate] = useState(1367107200000);
    const [numOfBuys, setNumOfBuys] = useState(0);
    const [totalUsdSpent, setTotalUsdSpent] = useState(0);
    const [totalCryptoBought, setTotalCryptoBought] = useState(0);
    const [usdVal, setUsdVal] = useState(0);

    function getData(curr){
        console.log("Updating price chart for "+curr+"...");
        const link = 'https://api.coingecko.com/api/v3/coins/'+curr.toLowerCase()+'/market_chart?vs_currency=USD&days=max';
        const requestOptions = {
            method: 'GET'
        };
        fetch(link, requestOptions).then(res=>res.text()).then(result => {
            const obj = JSON.parse(result).prices; 
            setMinDate(obj[0][0]);
            setCurrencyChart(obj);
        }, (error) => {setCurrencyChart(-1)});
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

    const handleInputChange = (event) =>{
        setAmount(Number(event.target.value))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {calculate(); setShow(true);}

    useEffect(() => {
        if(currencyChart === -1){
            getData("Bitcoin");
        }
    });

    const getIndex = () => {
        const startTimestamp = date.getTime()
        const firstTimestamp = currencyChart[0][0];
        const days = (startTimestamp - firstTimestamp) / 86400000
        return Math.ceil(days);
    }

    const getInterval = () => {
        switch(dcaInterval){
            default: return 31;
            case "Month": return 31;
            case "Day": return 1;
            case "Year": return 365
            case "Week": return 7;
        }
    }
    const getCryptoAmount = (index) => {
        let cryptoAmount = amount / currencyChart[index][1];
        return cryptoAmount;
    }

    const calculate = () => {       
        let buyCounter = 0;
        let totalAmountCrypto = 0;
        let totalAmountUsd = 0;

        let currIndex = getIndex();

        const endIndex = currencyChart.length;
        const buyInterval = getInterval();


        while (currIndex < endIndex) {
            //Add USD value
            totalAmountUsd += amount;
            
            //Add crypto value
            totalAmountCrypto += getCryptoAmount(currIndex);

            currIndex += buyInterval;
            buyCounter += 1;
        }
        setTotalCryptoBought(totalAmountCrypto);
        setTotalUsdSpent(totalAmountUsd);
        setNumOfBuys(buyCounter);
        setUsdVal(currencyChart[currencyChart.length-1][1]*totalAmountCrypto);
    }

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
                                    <input className="input-field" onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} type="number" placeholder="100" name="usrnm"></input>
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
                                    maxDate={new Date()}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="Div-Center">
                            <Button variant="primary" onClick={handleShow}
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
                        Today, I would have <b>{totalCryptoBought}</b> {currency} (<b>{usdVal}</b> USD).
                        <br />
                        I would have bought {currency} <b>{numOfBuys}</b> times.
                        <br />
                        Total amount spent: <b>{totalUsdSpent}</b> USD.
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
