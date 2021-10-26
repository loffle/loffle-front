import React, { useState, useEffect } from 'react';
import { PROXY } from '../../config';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from '../../API';
import ImageSwiper from '../Raffle/ImageSwiper';
import Timer from '../Raffle/Timer';
import Post from '../FreeBoard/Post';
import Notice from '../NoticeBoard/Notice';
import PostSkeleton from '../FreeBoard/Skeleton';
import NoticeSkeleton from '../NoticeBoard/Skeleton';
//
import profile from '../../images/profile.svg';

const Index = (props) => {
  const [loading, setLoading] = useState(true);
  const [raffle, setRaffle] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notices, setNotices] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [banner, setBanner] = useState({
    images: [
      {
        id: 1,
        src:
          'https://kream-phinf.pstatic.net/MjAyMTA5MDhfOTYg/MDAxNjMxMDg2MzMyMTAw.70_u-vKpMVi19M7Jfb962VECK-Mc971RFTaxUJbLqnMg.9teKjpAR7j9PNgYPxQQ_WQ0jNmRCz38NsLJxzuEAvC4g.JPEG/a_28335bdda0b244f7b412dce5559dba5b.jpg?type=m_2560',
      },
      {
        id: 2,
        src:
          'https://kream-phinf.pstatic.net/MjAyMTEwMTRfOTAg/MDAxNjM0MjA1NDM3NTMy.rN9SfN1ZbRGF8CzKVuyhXQH-LqogwngkN3ncPAUvhBog.WAvi55y8qwjfWWTSJOGfdvKORePW7OyNE1wVZhc_RTcg.JPEG/a_e9f290ef58ec47db8b74eee787a467c7.jpg?type=m_2560',
      },
      {
        id: 3,
        src:
          'https://kream-phinf.pstatic.net/MjAyMTEwMTRfMjQ5/MDAxNjM0MTgwMTIyODk4.pdul-HMj1dSItLsdt5_9HlB7HenlCXLUyqc-fHGIBgwg.SUVsU_U-VmDy6vurAFn7PDtUdGtYp8Vihr0zj5bR5ysg.JPEG/a_91d156f6a33f4969b0bb78195535be75.jpg?type=m_2560',
      },
    ],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    axios(`${PROXY}/raffles`, {
      method: 'GET',
    }).then((response) => {
      let tmp = response.data.results.filter(
        (value) => value.progress === 'ongoing'
      );
      setRaffle((prev) => tmp);
    });

    API.getCategory('posts')
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.results.slice(0, 3));
      })
      .catch((error) => console.log('error', error));

    API.getCategory('reviews')
      .then((response) => response.json())
      .then((result) => {
        setReviews(() => result.results);
      })
      .catch((error) => console.log('error', error));

    API.getCategory('notices')
      .then((response) => response.json())
      .then((result) => {
        setNotices(result.results.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => console.log('error', error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="max-w-480 min-h-screen">
        {/* ImageSwiper */}
        <section className="flex items-center justify-center w-full h-vw max-h-480">
          <ImageSwiper product={banner} category={'index'} />
        </section>

        {/* 응모 */}
        {raffle.length > 0 && (
          <section className="flex justify-center flex-col w-full text-center mt-10 px-5">
            <h1 className="text-3xl font-bold">현재 응모 진행중</h1>
            <div className="text-6xl font-bold mt-3">
              {loading || <Timer raffle={raffle[0]} />}
            </div>
            <Link
              to={`/raffles/${raffle[0].id}`}
              className="w-full flex justify-center items-center hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 mt-6 shadow-lg bg-primary"
            >
              구경하러 가기
            </Link>
          </section>
        )}

        <hr className="border-gray-border px-5 my-11" />

        <section className="px-5">
          <Link to={'/community/posts'}>
            <h1 className="text-lg font-bold">FREE BOARD</h1>
            <span className="text-gray text-sm">자유게시판</span>
          </Link>
          <div className="shadow-btn rounded-xl my-2">
            {loading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}
            {posts.length > 0 &&
              posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        </section>

        <hr className="border-gray-border px-5 my-11" />

        <section>
          <Link to={'/community/reviews'}>
            <div className="ml-5">
              <h1 className="text-lg font-bold">REVIEW OF WINNING</h1>
              <span className="text-gray text-sm">당첨 후기 게시판</span>
            </div>
          </Link>
          <div className="rounded-xl mt-5 w-auto">
            <div className="whitespace-nowrap overflow-x-scroll flex pr-5">
              {reviews.map((review) => (
                <Link to={`/community/reviews/${review.id}`} key={review.id}>
                  <div
                    alt="thumbnail"
                    className="w-32 h-44 rounded-lg bg-cover p-2 flex flex-col justify-between ml-5 shadow-btn"
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.5),rgba(0,0,0,0) 30%), url("https://picsum.photos/id/${review.id}/128/176")`,
                    }}
                  >
                    <img className="w-9 h-9" src={profile} alt="profile"></img>
                    <span className="text-white text-sm">@{review.user}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-border px-5 my-11" />

        <section className="px-5">
          <Link to={'/community/notices'}>
            <h1 className="text-lg font-bold">NOTICE</h1>
            <span className="text-gray text-sm">공지사항</span>
          </Link>
          <div className="shadow-btn rounded-xl my-2">
            {loading && <NoticeSkeleton />}
            {notices.map((notice) => (
              <Notice key={notice.id} notice={notice} />
            ))}
          </div>
        </section>
      </div>

      <hr className="border-gray-border px-5 mt-11" />
    </>
  );
};

export default Index;
