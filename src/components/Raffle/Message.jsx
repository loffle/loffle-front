import React from 'react';
import { raffleTime } from '../helpers';

const Message = ({
  handleMessageModal,
  handleApplyModal,
  handleCandidateModal,
  raffle,
  product,
  ordinalNumber,
  givenNumbers,
}) => {
  const handleCandidate = () => {
    handleMessageModal();
    handleApplyModal();
    handleCandidateModal();
  };

  return (
    <div className="max-w-480 mx-auto flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 z-60">
      {/* 345*185 */}
      <div
        className="flex flex-col gap-2 px-5 py-4 w-9/12 max-w-280 rounded-t-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg font-bold">[ {product.name} ]</h1>
        <pre className="text-sm">
          {console.log(givenNumbers)}
          {raffle.progress === 'ongoing' &&
            `${ordinalNumber}번 째로 응모 완료되었습니다.`}
          {raffle.progress === 'done' &&
            givenNumbers?.length > 0 &&
            '[1차 추첨 명단에] 포함되셨습니다! \n 부여받은 번호는 아래와 같습니다.'}
          {raffle.progress === 'done' &&
            givenNumbers === undefined &&
            `아쉽게도 ${localStorage.access_nickname} 님은 \n[1차 추첨 명단]에 들지 못하셨습니다. \n다음에 다시 도전해주세요.`}
        </pre>
        {raffle.progress === 'ongoing' && (
          <span className="text-sm text-gray-light">
            당첨자 발표 : {raffleTime(raffle.announce_date_time)}
          </span>
        )}
        {/* 공 보여주기 */}
        {raffle.progress === 'done' && givenNumbers?.length > 0 && (
          <div className="flex justify-center">
            <div className="flex flex-wrap mt-1 gap-2">
              {givenNumbers.map((number) => (
                <div
                  key={number}
                  className="flex justify-center items-center bg-gray-darkest w-10 h-10 rounded-full text-white text-lg font-bold shadow-btn"
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {raffle.progress === 'ongoing' && (
        <div className="w-9/12 max-w-280 text-white text-sm xs:text-base">
          <button
            className="w-1/2 py-3 rounded-bl-lg bg-gray"
            onClick={handleMessageModal}
          >
            닫기
          </button>
          <button
            className="w-1/2 py-3 rounded-br-lg bg-gray-activate"
            onClick={handleCandidate}
          >
            응모 내역 확인
          </button>
        </div>
      )}
      {raffle.progress === 'done' && (
        <div className="w-9/12 max-w-280 text-white text-sm xs:text-base">
          <button
            className="w-full py-3 rounded-b-lg bg-gray-900"
            onClick={handleMessageModal}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
