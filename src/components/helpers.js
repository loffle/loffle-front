export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const timeWithHyphen = (value) => {
  const timeValue = new Date(value);

  const str =
    timeValue.getFullYear() +
    '-' +
    (timeValue.getMonth() + 1) +
    '-' +
    timeValue.getDate();

  return str;
};

export const raffleTime = (value) => {
  let timeValue = new Date(value); // 현재 날짜 및 시간
  let todayMonth = timeValue.getMonth() + 1;
  let todayDate = timeValue.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = week[timeValue.getDay()];
  let hours =
    timeValue.getHours() < 10
      ? `0${timeValue.getHours()}`
      : timeValue.getHours();
  let minutes =
    timeValue.getMinutes() < 10
      ? `0${timeValue.getMinutes()}`
      : timeValue.getMinutes();

  return (
    todayMonth +
    '.' +
    todayDate +
    ' (' +
    dayOfWeek +
    ') ' +
    hours +
    ':' +
    minutes
  );
};
