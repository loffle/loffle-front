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
  const [raffles, setRaffles] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (raffles.length === 0) {
      window.scrollTo(0, 0);
      setFirstLoading(true);
    }
    setLoading(true);

    var myHeaders = new Headers();
    if (localStorage.access_token) {
      //토큰이 있을때만 header 첨부
      myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
    }

    axios(`${PROXY}/raffles`, {
      method: 'GET',
      headers: myHeaders, //header에 token을 실어 보내야 apply_or_not 확인이 가능하다
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
