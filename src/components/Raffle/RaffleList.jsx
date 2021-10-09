import React, { useEffect, useState } from 'react';
import { PROXY } from '../../config';
//
import ticket from '../../images/ticket.svg';
import Ticket from '../Ticket/Ticket';
//

const RaffleList = (props) => {
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

  const [raffles, setRaffles] = useState([
    {
      id: 1,
      begin_at: '2021-10-07T20:08:02.364310+09:00',
      finish_at: '2021-10-11T20:08:02.364310+09:00',
      target_quantity: 244,
      product_id: 1,
    },
  ]);

  const [product, setProduct] = useState([
    {
      id: 1,
      name: 'New Balance 992 Made in USA Grey (D Standard)',
      size: '270',
      brand: 'New Balance',
      serial: 'M992GR',
      color: 'GREY',
      release_date: '20/04/13',
      images: [
        'https://kream-phinf.pstatic.net/MjAyMDEwMjJfMTkz/MDAxNjAzMzMzOTc3MTk3.MCPenPSGEGkKSFTaXdrqquhYCj1mEyS_C00TqOh6Tt8g.-foh7sqpLXFTgA7LcCibg6MpBZdPjUAiiZDaxAgFgdAg.PNG/p_23523_1_ffc24989c6514ea986ab45bb99fd185f.png?type=l',
        'https://kream-phinf.pstatic.net/MjAyMTA2MTBfNzgg/MDAxNjIzMjkzNDY0NjQz.bZesafa-Ue_9j_GVgSbDOn2oztRyrhfOtRlDK99RPiIg.C5yL03GT0dfjdN22a6teAAu-t71AKNpF9P3NF0ouaCEg.PNG/p_6430f41e30904f6db47f922a9a661514.png?type=l',
        'https://kream-phinf.pstatic.net/MjAyMTA2MTBfNTEg/MDAxNjIzMjkzNjQyNzc5.g9aG-vgc8cQnKQjeSlYJL1LlxUysCMep3AlQyiqc7SIg.1khk259nJf4u2miraN3PWX6aNbQpo7SIM9itNZ_euLgg.PNG/p_6c10d5b4be024655a54cf551743dbdeb.png?type=l',
      ],
    },
  ]);

  useEffect(() => {
    setTicketLoading(true);

    fetch(`${PROXY}/loffle/ticket`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setTicketList(result);
      })
      .catch((error) => console.log('error', error));

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`);

    fetch(`${PROXY}/account/user/1/ticket`, {
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
