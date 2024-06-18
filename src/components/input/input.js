import React from 'react';
import './style.css';
import PropTypes from 'prop-types';


function Input({label, state, setState, placeholder, type}) {
  return (
    <div className='input-wrapper'>
      <p className='label-input'>{label}</p>
      <input 
       value={state}
       onChange={e=> {setState(e.target.value)}}
       placeholder={placeholder}
       className='custom-input'
       type={type}
      />
    </div> 
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default Input;