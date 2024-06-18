import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function Button({text, onClick, blue, disabled}) {
  return (
    <div>
      <button className={blue? 'btn btn-blue': 'btn'} onClick={onClick} disabled={disabled}>{text}</button>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  blue: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;