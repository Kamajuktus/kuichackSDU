import React, { useState, useEffect } from 'react';

const FloatingComponent = ({ children, floatDistance = 9, floatSpeed = 150 }) => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 - вверх, -1 - вниз

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prevPosition) => prevPosition + direction);

      if (position >= floatDistance) {
        setDirection(-1);
      } else if (position <= -floatDistance) {
        setDirection(1);
      }
    }, floatSpeed);

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, [floatDistance, floatSpeed, position]);

  const floatingStyle = {
    transform: `translateY(${position}px)`,
    transition: `transform ${floatSpeed}ms ease-in-out`,
  };

  return (
    <div style={floatingStyle}>
      {children}
    </div>
  );
};

export default FloatingComponent;