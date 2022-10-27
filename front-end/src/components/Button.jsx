import React from 'react';
import PropTypes from 'prop-types';

function Button({
  dataTestId, type, name, text, disabled, onClick,
}) {
  return (
    <button
      data-testid={ dataTestId }
      type={ type === 'submit' ? 'submit' : 'button' }
      name={ name }
      disabled={ disabled }
      onClick={ onClick }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default Button;
