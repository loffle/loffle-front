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
    btnColor: 'primary',
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

export { PROXY, PROGRESS_LIST };
