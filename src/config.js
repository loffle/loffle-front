const PROXY =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '192.168.219.103'
    ? ''
    : '/proxy';

const PROGRESS_LIST = {
  waiting: {
    name: '대기중',
    progressColor: 'secondary',
    textColor: '',
    btnColor: 'secondary',
    liveOrTotal: '실시간',
  },
  ongoing: {
    name: '진행중',
    progressColor: 'primary',
    textColor: '',
    btnColor: '',
    liveOrTotal: '실시간',
  },
  done: {
    name: '응모 종료',
    progressColor: 'gray-deactivate',
    textColor: 'text-gray-deactivate',
    btnColor: 'gray-activate',
    liveOrTotal: '총',
  },
  failed: {
    name: '응모 실패',
    progressColor: 'gray-deactivate',
    textColor: 'text-gray-deactivate',
    btnColor: 'gray-deactivate',
    liveOrTotal: '총',
  },
};

const PICK_COLOR = (progress, applyOrNot) => {
  if (progress === 'failed') return '#A39F9F'; //배포시 issue 해결
  if (progress === 'ongoing') {
    // applyOrNot 조건은 함수 필요해서
    if (applyOrNot) {
      return '#A6A6A6';
    }
    return '#3C4875';
  }
};

export { PROXY, PROGRESS_LIST, PICK_COLOR };
