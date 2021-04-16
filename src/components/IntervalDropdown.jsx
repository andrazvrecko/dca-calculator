import React, {useState} from 'react';
import {Dropdown, FormControl, Button} from 'react-bootstrap';
import {CustomButton} from './StyledComponents';


function CurrencyDropdown(props) {
    const [deviceId, setDeviceId] = useState("Month");
    // The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <CustomButton
            className="dropdownButton"
            href=""
            ref={ref}
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
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) => 
                !value || child.props.children.toLowerCase().startsWith(value.toLowerCase()),
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
    <>
      <Dropdown  onSelect={(e) => {setDeviceId(e); props.currentChanged(e)}}>
        <Dropdown.Toggle as={CustomToggle}>
          {deviceId}
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="Day" style={{'backgroundColor': "white", 'color':'black'}} >Day</Dropdown.Item>
          <Dropdown.Item eventKey="Week" style={{'backgroundColor': "white", 'color':'black'}} >Week</Dropdown.Item>
          <Dropdown.Item eventKey="Month" style={{'backgroundColor': "white", 'color':'black'}} active>Month</Dropdown.Item>
          <Dropdown.Item eventKey="Year" style={{'backgroundColor': "white", 'color':'black'}} >Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
    );
  }
}

export default CurrencyDropdown
