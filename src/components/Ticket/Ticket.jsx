import React from 'react';

const Ticket = ({ handleTicketModal }) => {
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
        ></div>
      </div>
    </>
  );
};

export default Ticket;
