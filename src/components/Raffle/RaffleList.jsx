import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { PROXY } from '../../config';
//
import RaffleHeader from './RaffleHeader';
import Loading from '../Loading';
import Raffle from './Raffle';

const RaffleList = (props) => {
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [raffles, setRaffles] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (raffles.length === 0) {
      window.scrollTo(0, 0);
      setFirstLoading(true);
    }
    setLoading(true);

    axios(`${PROXY}/raffles`, {
      method: 'GET',
      headers: localStorage.access_token
        ? { Authorization: `Token ${localStorage.access_token}` }
        : {}, //header에 token을 실어 보내야 apply_or_not 확인이 가능하다
      params: { page: pageNumber },
    }).then((response) => {
      setRaffles((prev) => [...prev, ...response.data.results]);
      setHasMore(response.data.next);
      setFirstLoading(false);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const loadMore = () => {
    if (hasMore) {
      setPageNumber((prev) => prev + 1);
    }
  };
=======
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
>>>>>>> feature/raffle-temp

  return (
    <>
      {firstLoading && <Loading />}
      {firstLoading ||
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
      {firstLoading || (
        <div className="px-7">
          <button
            onClick={loadMore}
            className={
              'w-full flex justify-center items-center hover:bg-opacity-80 bg-white font-semibold rounded-lg py-3 mb-3 shadow-btn border-solid  border-black ' +
              (hasMore || 'hidden')
            }
          >
            <span className="flex text-xl">
              더보기{' '}
              {loading ? (
                <svg
                  className="ml-1 w-6 h-6 animate-spin"
                  data-darkreader-inline-stroke=""
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
                <svg
                  className="ml-1 w-6 h-6"
                  data-darkreader-inline-stroke=""
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
      )}
      <div className="pt-5"></div>
    </>
  );
};

export default RaffleList;
