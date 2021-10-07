import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PROXY } from '../../config';

const Ticket = ({
  handleTicketModal,
  ticketList,
  numOfTickets,
  setNumOfTickets,
}) => {
  const { register, handleSubmit } = useForm();

  const [buyLoading, setBuyLoading] = useState(false);

  const onSubmit = (data) => {
    setBuyLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`);

    fetch(`${PROXY}/loffle/ticket/${data.ticket}/buy`, {
      method: 'POST',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.ok) {
          console.log('티켓 구매 성공✅');
          const quantity = ticketList.filter(
            (ticket) => ticket.id === +data.ticket
          )[0].quantity;
          setNumOfTickets((prev) => prev + quantity);
        }
        setBuyLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      {/* blank header - no touch */}
      <header
        className="max-w-480 mx-auto h-14 fixed inset-0 z-50"
        onClick={(e) => e.stopPropagation()}
      ></header>
      <div
        className="max-w-480 mx-auto h-screen top-14 flex items-center justify-center fixed inset-0 bg-modal z-50"
        onClick={handleTicketModal}
      >
        <div
          className="absolute top-0 px-5 py-4 w-full h-11/12 rounded-b-xl bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xl font-bold">내 응모권</span>
          <div className="py-3 flex justify-center">
            <span className="text-3xl font-bold text-primary align-middle">
              {numOfTickets}
              <span className="text-xl font-bold align-middle"> 개</span>
            </span>
          </div>

          <hr className="border-gray-border my-1" />

          <div className="text-xs text-gray mt-5 mb-8 flex flex-col gap-2">
            <h1>- 응모권은 래플 참여시 차감됩니다. (응모권 1장 = 1000원)</h1>
            <h1>- 응모권 구매는 언제든지 가능합니다.</h1>
          </div>

          <span className="text-xl font-bold">응모권 구매</span>
          {/* ticket list */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {ticketList &&
              ticketList.map((ticket) => (
                <div className="my-4 mx-2" key={ticket.id}>
                  <label className="inline-flex w-full items-center justify-between">
                    <input
                      type="radio"
                      {...register('ticket', { required: true })}
                      className="form-radio h-5 w-5 text-primary"
                      name="ticket"
                      value={ticket.id}
                      defaultChecked
                    />
                    <span className="w-1/4 text-l text-gray-dark">
                      {ticket.quantity} 장
                    </span>
                    <span className="w-1/3 text-l text-gray-dark">
                      {ticket.price} 원
                    </span>
                  </label>
                </div>
              ))}

            <hr className="border-gray-border my-1" />

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              <span>
                {buyLoading ? (
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
                ) : (
                  '구매 하기'
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Ticket;
