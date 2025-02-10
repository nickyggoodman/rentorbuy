import React from 'react';
import './Switch.css';

function Switch() {
  return (
    <>
      <input
        className="switch-checkbox"
        id={'switch-new'}
        type="checkbox"
      />

      <label 
        className="switch-label"
        htmlFor={'switch-new'}
      >
        <span className={'switch-button'} />
      </label>
    </>
  )
} 

export default Switch;
