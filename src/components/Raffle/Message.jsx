import React from 'react';
import { raffleTime } from '../helpers';

const Message = ({
  handleMessageModal,
  handleApplyModal,
  handleCandidateModal,
  raffle,
  product,
  ordinalNumber,
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
        className="flex flex-col gap-2 px-5 py-4 w-9/12 rounded-t-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-lg font-bold">[ {product.name} ]</h1>
        <span className="text-sm">
          {ordinalNumber}번 째로 응모 완료되었습니다.
        </span>
        <span className="text-sm text-gray-light">
          당첨자 발표 : {raffleTime(raffle.announce_date_time)}
        </span>
        <div className="flex"></div>
      </div>
      <div className="w-9/12 text-white text-sm xs:text-base">
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
    </div>
  );
};

export default Message;
