import React, { useState, forwardRef } from 'react';
import { string, func } from 'prop-types';
import './index.css';

const Dropdown = forwardRef(( {country, setSelected, handleChange, err}, ref ) => {
  const [isActive, setIsActive] = useState(false);
  const options = ['Ukraine', 'USA', 'Poland', 'Finland', 'Germany'];

  const onClickByOption = (option) => {
    handleChange(option);
    setSelected(option);
    setIsActive(false);
  }

  return (
    <div className='dropdown'>
      <input ref={ref} className='hidden'/>
      <div className={`dropdown-btn ${!options.includes(country) && err ? 'err' : ''}`} onClick={() => setIsActive(!isActive)}>
        {country}
        <span
          className={`${isActive ? 'triangle-top' : 'triangle-bottom'}`}>
        </span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}
              onClick={() => onClickByOption(option)}
              className={`dropdown-item ${country === option ? 'active' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

export default Dropdown

Dropdown.propTypes = {
  'selected': string,
  'setSelected': func,
  'handleChange': func,
}
