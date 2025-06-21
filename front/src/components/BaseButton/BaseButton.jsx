import React from 'react';
import styles from './styles.module.css'; // Create this CSS module

function BaseButton({ children, onClick, disabled, className, ...rest }) {
  const buttonClasses = `${styles.baseButton} ${className || ''}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

BaseButton.defaultProps = {
  onClick: () => {}, // Default empty function for onClick
  disabled: false,
  className: '',
};

export default BaseButton;