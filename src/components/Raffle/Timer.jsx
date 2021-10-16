import React, { useEffect, useState } from 'react';

const Timer = ({ finishAt }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(finishAt) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours:
          Math.floor((difference / (1000 * 60 * 60)) % 24) +
          Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <>
      <span>
        {timeLeft['hours'] < 10 ? `0${timeLeft['hours']}` : timeLeft['hours']}
      </span>
      <span className="mb-2 mx-1">{':'}</span>
      <span>
        {timeLeft['minutes'] < 10
          ? `0${timeLeft['minutes']}`
          : timeLeft['minutes']}
      </span>
      <span className="mb-2  mx-1">{':'}</span>
      <span>
        {timeLeft['seconds'] < 10
          ? `0${timeLeft['seconds']}`
          : timeLeft['seconds']}
      </span>
    </>
  );
};

export default Timer;
