import React, { useState } from 'react';
import API from '../../API';
//
import back from '../../images/back.svg';
import Message from './Message';

const Apply = ({
  handleApplyModal,
  handleCandidateModal,
  raffleId,
  raffle,
  setRaffle,
  product,
  location,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordinalNumber, setOrdinalNumber] = useState(10000); //테스트용

  //응모 참여 모달
  const [isMessageModalOn, setIsMessageModalOn] = useState(false);
  const handleMessageModal = (e) => {
    setIsMessageModalOn(!isMessageModalOn);
  };

  const onChange = () => {
    setIsChecked((prev) => !prev);
  };

  const onClick = () => {
    setLoading(true);

    API.applyRaffle(raffleId)
      .then((response) => {
        if (response.ok) return response.json();
        //[issue 해결] response.ok 하면 return을 꼭 해주자!
        else {
          if (response.status === 400) {
            throw new Error('소유한 티켓이 없습니다.');
          }
        }
      })
      .then((result) => {
        console.log(result);
        setOrdinalNumber(result.ordinal_number);
        handleMessageModal();
        setRaffle({
          ...raffle,
          apply_or_not: true,
        });
        window.history.replaceState(null, '');
        //[issue 해결] location.state 날리기 -> 새로고침시 이전 state 남아있는거 날리기 -> raffle reload
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isMessageModalOn && (
        <Message
          handleMessageModal={handleMessageModal}
          handleApplyModal={handleApplyModal}
          handleCandidateModal={handleCandidateModal}
          raffle={raffle}
          product={product}
          ordinalNumber={ordinalNumber}
        />
      )}
      <div
        className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
        onClick={handleApplyModal}
      >
        <div
          className="absolute bottom-0 px-5 py-4 w-full rounded-t-xl bg-white"
          onClick={(e) => e.stopPropagation()}
          style={{ height: '92%' }}
        >
          <header className="flex justify-between">
            <img src={back} alt="back-button" onClick={handleApplyModal} />
            <h1 className="text-lg font-bold">응모하기</h1>
            <div></div>
          </header>
          <div className="flex flex-col text-xs text-gray-500 gap-3 py-6">
            <h1 className="font-bold text-gray-700 text-base">주의사항</h1>

            <hr className="border-gray-border my-2" />

            <span className="font-bold">- 응모시 응모권 1장이 차감됩니다.</span>
            <span>
              - 래플은 선착순이 아닌 무작위 추첨제 + 로또 당첨 번호로
              진행됩니다.
            </span>
            <span>- 당첨자 본인만 물품 수령을 할 수 있습니다.</span>
            <span>- 래플 상품은 한정 상품으로 교환/환불이 불가능합니다.</span>
            <span>
              - 마이페이지 &gt; 래플 응모 내역에서 당첨 여부 확인이 가능합니다.
            </span>

            <hr className="border-gray-border my-2" />

            <label className="flex w-full items-center my-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-secondary"
                name="ticket"
                onChange={onChange}
              />
              <span
                className={
                  'text-sm ml-3 xs:text-base ' +
                  (isChecked ? 'text-gray-dark' : 'text-gray-400')
                }
              >
                안내사항을 확인하였으며 이에 동의합니다.
              </span>
            </label>

            {/* apply raffle */}
            <button
              onClick={onClick}
              className={
                (isChecked ? '' : 'bg-opacity-50') +
                ' w-full flex justify-center items-center bg-secondary hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 mt-4'
              }
              disabled={!isChecked}
            >
              <span className="text-xl flex items-center">
                응모 하기
                {loading && (
                  <svg
                    className="ml-1 w-6 h-6 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
