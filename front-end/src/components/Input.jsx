import React from 'react';
import PropTypes from 'prop-types';

function Input({
  dataTestId, label, type, name, value, onChange, checked, placeholder,
}) {
  return (
    <label htmlFor={ name }>
      { label }
      <input
        id={ name }
        data-testid={ dataTestId }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        checked={ checked }
        placeholder={ placeholder }
        min="0"
      />
    </label>
  );
}

Input.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  checked: false,
  placeholder: '',
};

export default Input;
