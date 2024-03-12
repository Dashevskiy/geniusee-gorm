import React, { useState } from 'react';
import { string, func } from 'prop-types';
import './index.css';

function Dropdown({ countrySelected, setSelected, handleChange, err }) {
  const [isActive, setIsActive] = useState(false);
  const options = ['Ukraine', 'USA', 'Poland', 'Finland', 'Germany'];

  const onClickByOption = (option) => {
    handleChange(option);
    setSelected(option);
    setIsActive(false);
  }

  return (
    <div className='dropdown'>
      <div className={`dropdown-btn ${!options.includes(countrySelected) && err ? 'err' : ''}`} onClick={() => setIsActive(!isActive)}>
        {countrySelected}
        <span
          className={`${isActive ? 'triangle-top' : 'triangle-bottom'}`}>
        </span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}
              onClick={() => onClickByOption(option)}
              className={`dropdown-item ${countrySelected === option ? 'active' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown

Dropdown.propTypes = {
  'selected': string,
  'setSelected': func,
  'handleChange': func,
}
