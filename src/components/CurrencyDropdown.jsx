import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import {CustomButton} from './StyledComponents';

function CurrencyDropdown(props) {
    const [deviceId, setDeviceId] = useState("Bitcoin");
    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <CustomButton
        className="" variant="outline-primary"
        href=""
        ref={ref}
        style={{'borderRadius': '20px', width: '100%'}}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        >
        <b>{children} &#x25bc;</b>
        </CustomButton>
    ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) => 
                true ,
            )}
          </ul>
        </div>
      );
    },
  );
  if(props.numOfConnected <= 0){
    return(<h4>No Devices are connected</h4>)
  }
  else{
    return(
      <Dropdown  onSelect={(e) => {setDeviceId(e); props.currentChanged(e)}}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {deviceId}
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="Bitcoin" style={{'backgroundColor': "white", 'color':'black'}} active><img src="/images/bitcoin.png" alt="logo" className="iconImage"></img>Bitcoin</Dropdown.Item>
          <Dropdown.Item eventKey="Ethereum" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/ethereum.png" alt="logo" className="iconImage"></img>Ethereum</Dropdown.Item>
          <Dropdown.Item eventKey="Dogecoin" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/doge.png" alt="logo" className="iconImage"></img>Doge</Dropdown.Item>
          <Dropdown.Item eventKey="Binancecoin" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/binance.png" alt="logo" className="iconImage"></img>Binance Coin</Dropdown.Item>
          <Dropdown.Item eventKey="XRP" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/xrp.png" alt="logo" className="iconImage"></img>XRP</Dropdown.Item>
          <Dropdown.Item eventKey="Cardano" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/cardano.png" alt="logo" className="iconImage"></img>Cardano</Dropdown.Item>
          <Dropdown.Item eventKey="Polkadot" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/polkadot.png" alt="logo" className="iconImage"></img>Polkadot</Dropdown.Item>
          <Dropdown.Item eventKey="Litecoin" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/litecoin.png" alt="logo" className="iconImage"></img>Litecoin</Dropdown.Item>
          <Dropdown.Item eventKey="Uniswap" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/uniswap.png" alt="logo" className="iconImage"></img>Uniswap</Dropdown.Item>
          <Dropdown.Item eventKey="Chainlink" style={{'backgroundColor': "white", 'color':'black'}} ><img src="/images/chainlink.png" alt="logo" className="iconImage"></img>Chainlink</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CurrencyDropdown
