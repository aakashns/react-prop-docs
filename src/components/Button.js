import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick, disabled }) => (
  <button
    type="button"
    className="btn btn-primary"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  label: "OK",
  onClick: () => {},
  disabled: false
};

Button.propDescriptions = {
  label: "Label of the button",
  onClick: "The click handler",
  disabled: "Whether to disable the button"
};

window.Button = Button;

export default Button;
