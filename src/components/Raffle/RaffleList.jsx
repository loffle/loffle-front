import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { PROXY } from '../../config';
//
import RaffleHeader from './RaffleHeader';
import Loading from '../Loading';
import Raffle from './Raffle';

const RaffleList = (props) => {
  const [loading, setLoading] = useState(false);
  const [raffles, setRaffles] = useState([
    {
      id: 31,
      url: 'https://loffle.cf/raffles/4',
      user: 'leeyongjoo',
      product_preview: {
        id: 2,
        name: '[waiting] 응모 대기',
        brand: '[waiting] 응모 대기',
        url: 'https://loffle.cf/products/2',
      },
      apply_count: 0,
      apply_or_not: false,
      start_date_time: '2021-10-22T20:49:36.194218+09:00',
      end_date_time: '2021-10-23T20:49:36.194218+09:00',
      announce_date_time: '2021-10-23T21:00:00.194218+09:00',
      target_quantity: 999,
      created_at: '2021-10-13T17:58:41.611786+09:00',
      modified_at: '2021-10-13T17:58:41.611786+09:00',
      progress: 'waiting',
    },
    {
      id: 32,
      url: 'https://loffle.cf/raffles/4',
      user: 'leeyongjoo',
      product_preview: {
        id: 2,
        name: '[ongoing] 응모 진행중',
        brand: '[ongoing] 응모 진행중',
        url: 'https://loffle.cf/products/2',
      },
      apply_count: 1,
      apply_or_not: false,
      start_date_time: '2021-10-18T20:49:36.194218+09:00',
      end_date_time: '2021-10-22T20:49:36.194218+09:00',
      announce_date_time: '2021-10-23T21:00:00.194218+09:00',
      target_quantity: 999,
      created_at: '2021-10-13T17:58:41.611786+09:00',
      modified_at: '2021-10-13T17:58:41.611786+09:00',
      progress: 'ongoing',
    },
    {
      id: 33,
      url: 'https://loffle.cf/raffles/4',
      user: 'leeyongjoo',
      product_preview: {
        id: 1,
        name: '[closed] 응모 종료',
        brand: '[closed] 응모 종료',
        url: 'https://loffle.cf/products/2',
      },
      apply_count: 1,
      apply_or_not: false,
      start_date_time: '2021-10-18T20:49:36.194218+09:00',
      end_date_time: '2021-10-18T20:49:36.194218+09:00',
      announce_date_time: '2021-10-23T21:00:00.194218+09:00',
      target_quantity: 999,
      created_at: '2021-10-13T17:58:41.611786+09:00',
      modified_at: '2021-10-13T17:58:41.611786+09:00',
      progress: 'closed',
    },
    {
      id: 34,
      url: 'https://loffle.cf/raffles/4',
      user: 'leeyongjoo',
      product_preview: {
        id: 2,
        name: '[canceled] 응모 취소',
        brand: '[canceled] 응모 취소',
        url: 'https://loffle.cf/products/2',
      },
      apply_count: 1,
      apply_or_not: false,
      start_date_time: '2021-10-18T20:49:36.194218+09:00',
      end_date_time: '2021-10-18T20:49:36.194218+09:00',
      announce_date_time: '2021-10-23T21:00:00.194218+09:00',
      target_quantity: 999,
      created_at: '2021-10-13T17:58:41.611786+09:00',
      modified_at: '2021-10-13T17:58:41.611786+09:00',
      progress: 'canceled',
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // setLoading(true);

    // var myHeaders = new Headers();
    // if (localStorage.access_token) {
    //   myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
    // }

    // //라플 리스트 가져오기
    // fetch(`${PROXY}/raffles`, {
    //   method: 'GET',
    //   headers: myHeaders, //header에 token을 실어 보내야 apply_or_not 확인이 가능하다
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     //setRaffles(result.results);
    //     //let value = result.results;
    //     setRaffles((prev) => {
    //       return [...prev, ...result.results];
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => console.log('error', error));
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
