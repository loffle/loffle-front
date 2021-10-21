import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import CountUp from 'react-countup';
import API from '../../API';
import { useNavigate } from 'react-router-dom';
import { PROXY } from '../../config';

const My = (props) => {
  const [info, setInfo] = useState({});
  const [MyTickets, setMyTickets] = useState({});
  const [ticketLoading, setTicketLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    var requestOptions = {
      method: 'GET',
      headers: { Authorization: `Token ${localStorage.access_token}` },
    };
    if (window.confirm('정말 로그아웃 하시겠습니까?')) {
      fetch(`${PROXY}/logout`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          localStorage.removeItem('access_token'); //localStorage token 제거
          localStorage.removeItem('access_nickname'); //localStorage token 제거
          localStorage.removeItem('access_id');
          alert(result.detail);
          window.location.reload();
        })
        .catch((error) => console.log('error', error));

      navigate('/');
    }
  };

  useEffect(() => {
    setTicketLoading(true);

    API.getMyTicket()
      .then((response) => response.json())
      .then((result) => {
        setMyTickets(result);
      })
      .catch((error) => console.log('error', error));

    API.getUser(localStorage.access_id)
      .then((response) => response.json())
      .then((result) => {
        setInfo(result);
      })
      .catch((error) => console.log('error', error));

    setTicketLoading(false);
  }, []);

  return (
    <>
      <div className="max-w-480 min-h-screen p-5">
        {/* 응모권 */}
        <span className="text-xl font-bold">내 응모권</span>
        <div className="py-3 flex justify-center">
          <span className="text-3xl font-bold text-primary align-middle">
            <CountUp
              start={0}
              end={MyTickets.num_tickets}
              delay={0.5}
              duration={0.5}
              separator=","
            />
            <span className="text-xl font-bold align-middle"> 개</span>
          </span>
        </div>

        <hr className="border-gray-border my-1" />

        <div className="text-xs text-gray mt-5 flex flex-col gap-2">
          <h1>- 응모권은 래플 참여시 차감됩니다. (응모권 1장 = 1,000원)</h1>
          <h1>- 응모권 구매는 언제든지 가능합니다.</h1>
        </div>

        <div className="flex justify-end">
          <button className="text-sm mb-2 mr-1 text-gray">더보기</button>
        </div>
        <div className="flex justify-between bg-gray-lightest rounded-lg py-4 px-5">
          <div className="flex flex-col text-center">
            <span className="text-sm">구매 내역</span>
            <span className="font-bold text-lg text-primary">
              <CountUp
                start={0}
                end={MyTickets.num_buy_tickets}
                delay={0.5}
                duration={0.5}
                separator=","
              />
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-sm">사용 내역</span>
            <span className="font-bold text-lg text-primary">
              <CountUp
                start={0}
                end={MyTickets.num_use_tickets}
                delay={0.5}
                duration={0.5}
                separator=","
              />
            </span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-sm">반환 내역</span>
            <span className="font-bold text-lg text-primary">
              <CountUp
                start={0}
                end={MyTickets.num_return_tickets}
                delay={0.5}
                duration={0.5}
                separator=","
              />
            </span>
          </div>
        </div>

        {/* 로그인 정보 */}
        <h1 className="text-xl font-bold mt-10">로그인 정보</h1>

        <div className="flex mt-4 justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray text-sm">이메일 주소</span>
            <span className="text-gray text-lg">{info.email}</span>
          </div>
          <button className="border-gray border rounded-lg w-11 h-8 flex items-center justify-center text-sm mb-2">
            변경
          </button>
        </div>
        <hr className="border-gray-border mt-3 mb-8" />

        <div className="flex mt-4 justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray text-sm">비밀번호</span>
            <span className="text-gray text-lg">{'??????'}</span>
          </div>
          <button className="border-gray border rounded-lg w-11 h-8 flex items-center justify-center text-sm mb-2">
            변경
          </button>
        </div>
        <hr className="border-gray-border mt-3 mb-8" />

        {/* 개인 정보 */}
        <h1 className="text-xl font-bold mt-10">개인 정보</h1>
        <div className="flex mt-4 justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray text-sm">이름</span>
            <span className="text-gray text-lg">{info.username}</span>
          </div>
          <button className="border-gray border rounded-lg w-11 h-8 flex items-center justify-center text-sm mb-2">
            변경
          </button>
        </div>
        <hr className="border-gray-border mt-3 mb-8" />

        <div className="flex mt-4 justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray text-sm">휴대폰 번호</span>
            <span className="text-gray text-lg">{info.phone}</span>
          </div>
          <button className="border-gray border rounded-lg w-11 h-8 flex items-center justify-center text-sm mb-2">
            변경
          </button>
        </div>
        <hr className="border-gray-border mt-3 mb-8" />

        <div className="flex justify-between">
          <button className="border-gray border rounded-lg h-8 px-1 flex items-center justify-center text-sm mb-2">
            회원 탈퇴
          </button>
          <button
            onClick={handleLogout}
            className="border-gray border rounded-lg h-8 px-2 flex items-center justify-center text-sm mb-2 ml-2"
          >
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

export default My;
