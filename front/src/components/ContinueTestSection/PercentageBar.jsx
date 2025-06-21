import React from 'react';

function PercentageBar({ percentage, children }) {
  // Ensure the percentage is within the valid range (0 to 100)
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Calculate the width of the colored portion
  const coloredWidth = `${clampedPercentage}%`;

  // Determine the background style
  const backgroundStyle = {
    background: `linear-gradient(to right,rgba(155, 255, 200, 0.76) ${coloredWidth}, transparent ${coloredWidth})`,
    width: '100%',
    height: '100%', // Make sure the background covers the children's height
    overflow: 'hidden', // To clip the background within the container
    borderRadius: '20px'
  };

  return (
    <div style={backgroundStyle}>
      {children}
    </div>
  );
}

export default PercentageBar;