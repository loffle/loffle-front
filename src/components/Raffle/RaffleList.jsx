import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { PROXY } from '../../config';
//
import RaffleHeader from './RaffleHeader';
import Loading from '../Loading';
import Raffle from './Raffle';

const RaffleList = (props) => {
  const [loading, setLoading] = useState(false);
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    var myHeaders = new Headers();
    if (localStorage.access_token) {
      //토큰이 있을때만 header 첨부
      myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
    }

    //라플 리스트 가져오기
    fetch(`${PROXY}/raffles`, {
      method: 'GET',
      headers: myHeaders, //header에 token을 실어 보내야 apply_or_not 확인이 가능하다
    })
      .then((response) => response.json())
      .then((result) => {
        setRaffles(result.results);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      {loading && <Loading />}
      {loading ||
        (raffles.length > 0 && (
          <div className="max-w-480 min-h-screen">
            <RaffleHeader>
              <h1 className="text-xl font-bold">응모하기</h1>
            </RaffleHeader>

            {raffles.map((raffle) => (
              <Raffle key={raffle.id} raffle={raffle} />
            ))}
          </div>
        ))}
    </>
  );
};

export default RaffleList;
