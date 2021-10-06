import React, { useState } from 'react';
//
import ticket from '../../images/ticket.svg';
import Ticket from '../Ticket/Ticket';

const RaffleList = (props) => {
  //ticket Modal
  const [isTicketModalOn, setIsTicketModalOn] = useState(false);
  const handleTicketModal = (e) => {
    setIsTicketModalOn(!isTicketModalOn);
    isTicketModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  return (
    <>
      {isTicketModalOn && <Ticket handleTicketModal={handleTicketModal} />}
      <div className="max-w-480 min-h-screen">
        <header className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">응모하기</h1>
          <div className="flex items-center">
            <button onClick={() => handleTicketModal()}>
              <img
                className="w-6 h-6 animate-pulse"
                src={ticket}
                alt="ticket-button"
              />
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default RaffleList;
