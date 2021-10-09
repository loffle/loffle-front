import React, { useEffect, useState } from 'react';
import { PROXY } from '../../config';
//
import ticket from '../../images/ticket.svg';
import Ticket from '../Ticket/Ticket';
//
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
// import Swiper core and required modules
import SwiperCore, { Scrollbar } from 'swiper';
import Timer from './Timer';
// install Swiper modules
SwiperCore.use([Scrollbar]);

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
      finish_at: '2021-10-12T20:08:02.364310+09:00',
      target_quantity: 244,
      product_id: 1,
    },
  ]);

  const [product, setProduct] = useState({
    id: 1,
    name: 'New Balance 992 Made in USA Grey (D Standard)',
    size: '270',
    brand: 'New Balance',
    serial: 'M992GR',
    color: 'GREY',
    release_date: '20/04/13',
    images: [
      {
        id: 1,
        src:
          'https://kream-phinf.pstatic.net/MjAyMTA2MTBfNTEg/MDAxNjIzMjkzNjQyNzc5.g9aG-vgc8cQnKQjeSlYJL1LlxUysCMep3AlQyiqc7SIg.1khk259nJf4u2miraN3PWX6aNbQpo7SIM9itNZ_euLgg.PNG/p_6c10d5b4be024655a54cf551743dbdeb.png?type=l',
      },
      {
        id: 2,
        src:
          'https://kream-phinf.pstatic.net/MjAyMTA2MTBfNzgg/MDAxNjIzMjkzNDY0NjQz.bZesafa-Ue_9j_GVgSbDOn2oztRyrhfOtRlDK99RPiIg.C5yL03GT0dfjdN22a6teAAu-t71AKNpF9P3NF0ouaCEg.PNG/p_6430f41e30904f6db47f922a9a661514.png?type=l',
      },
      {
        id: 3,
        src:
          'https://kream-phinf.pstatic.net/MjAyMDEwMjJfMTkz/MDAxNjAzMzMzOTc3MTk3.MCPenPSGEGkKSFTaXdrqquhYCj1mEyS_C00TqOh6Tt8g.-foh7sqpLXFTgA7LcCibg6MpBZdPjUAiiZDaxAgFgdAg.PNG/p_23523_1_ffc24989c6514ea986ab45bb99fd185f.png?type=l',
      },
    ],
  });

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
      <div className="max-w-480 min-h-screen">
        <header className="flex items-center justify-between p-5 h-14 border-b border-gray-border">
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

        {/* image swiper */}
        <div className=" bg-secondary-light pb-8 relative">
          <div className="px-5 py-1 m-5 bg-white absolute z-20 rounded-full shadow-md text-secondary">
            진행중
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-11/12 h-11/12">
              <Swiper
                scrollbar={{
                  hide: true,
                }}
                className="mySwiper bg-secondary-light"
              >
                {product.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img src={image.src} alt="product" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* timer */}
          <div className="text-6xl font-medium w-full absolute z-20 -bottom-8">
            <div className="flex items-center justify-center">
              <Timer finishAt={raffles[0].finish_at} />
            </div>
          </div>
        </div>

        <div className="mt-12 px-7 pb-2">
          <p className="text-xl font-medium text-center">{product.name}</p>
          <p className=" mt-2 text-gray block text-center">{product.brand}</p>
          <p className="mt-4 text-xl font-bold text-center block">
            실시간 참여 인원 : [{' '}
            <span className="text-secondary">
              1 / {raffles[0].target_quantity}
            </span>{' '}
            명 ]
          </p>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-secondary hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 my-6"
          >
            <span className="text-xl">응모하기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RaffleList;
