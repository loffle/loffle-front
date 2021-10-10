import React, { useEffect, useState } from 'react';
import { PROXY } from '../../config';
//
import ticket from '../../images/ticket.svg';
import Ticket from '../Ticket/Ticket';
//

const RaffleHeader = ({ children }) => {
  //ticket Modal
  const [isTicketModalOn, setIsTicketModalOn] = useState(false);
  const handleTicketModal = (e) => {
    setIsTicketModalOn(!isTicketModalOn);
    isTicketModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  const [ticketList, setTicketList] = useState([]);
  const [numOfTickets, setNumOfTickets] = useState(0);
  const [ticketLoading, setTicketLoading] = useState(false);

  useEffect(() => {
    setTicketLoading(true);

    fetch(`${PROXY}/loffle/tickets`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setTicketList(result);
      })
      .catch((error) => console.log('error', error));

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`);

    fetch(`${PROXY}/account/users/${localStorage.access_id}/ticket`, {
      //id 하드코딩 되어있음!!!
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        setNumOfTickets(result.num_of_tickets);
      })
      .catch((error) => console.log('error', error));

    setTicketLoading(false);
  }, []);

  return (
    <>
      {ticketLoading ||
        (isTicketModalOn && (
          <Ticket
            handleTicketModal={handleTicketModal}
            ticketList={ticketList}
            numOfTickets={numOfTickets}
            setNumOfTickets={setNumOfTickets}
          />
        ))}
      <header className="flex items-center justify-between p-5 h-14 border-b border-gray-border">
        {children}
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
    </>
  );
};

export default RaffleHeader;
