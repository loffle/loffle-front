import React, { useEffect, useState } from 'react';

const Timer = ({ raffle }) => {
  const calculateTimeLeft = () => {
    let difference = '';
    if (raffle.progress === 'waiting') {
      difference = +new Date(raffle.begin_at) - +new Date();
    }
    if (raffle.progress === 'ongoing') {
      difference = +new Date(raffle.finish_at) - +new Date();
    }
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours:
          Math.floor((difference / (1000 * 60 * 60)) % 24) +
          Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
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
