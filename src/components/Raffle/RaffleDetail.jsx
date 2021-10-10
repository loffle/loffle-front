import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate, useParams } from 'react-router-dom';
import { raffleTime } from '../../components/helpers';
//
import RaffleHeader from './RaffleHeader';
import back from '../../images/back.svg';
import ImageSwiper from './ImageSwiper';
import Candidate from './Candidate';

const RaffleDetail = ({ history }) => {
  //   const { reviewId } = useParams();
  const navigate = useNavigate(); //Naviagte hook 사용

  // eslint-disable-next-line no-unused-vars
  const [raffles, setRaffles] = useState([
    {
      id: 1,
      begin_at: '2021-10-07T20:08:02.364310+09:00',
      finish_at: '2021-10-12T20:08:02.364310+09:00',
      target_quantity: 244,
      product_id: 1,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
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

  //공유버튼 모달
  const [isCandidateModalOn, setIsCandidateModalOn] = useState(false);
  const handleCandidateModal = (e) => {
    setIsCandidateModalOn(!isCandidateModalOn);
    isCandidateModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  useEffect(() => {
    //window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isCandidateModalOn && (
        <Candidate handleCandidateModal={handleCandidateModal} />
      )}
      <div className="max-w-480 min-h-screen">
        <RaffleHeader>
          <img
            src={back}
            alt="back-button"
            onClick={() => navigate(`/raffles`)}
          />
          <h1 className="text-xl font-bold">응모하기</h1>
        </RaffleHeader>

        {/* image swiper */}
        <ImageSwiper product={product}>
          <div className="absolute z-20 -bottom-6">
            <p className="text-xl font-semibold text-center px-7">
              {product.name}
            </p>
          </div>
        </ImageSwiper>

        <div className="mt-9 px-7 pb-2 flex justify-center flex-col text-center">
          <p className=" mt-2 text-gray">{product.brand}</p>
          <p className="mt-4 text-xl font-bold">
            실시간 참여 인원 : [{' '}
            <span className="text-secondary">
              1 / {raffles[0].target_quantity}
            </span>{' '}
            명 ]
          </p>

          {/* apply raffle */}
          <Link
            to={{ pathname: `/raffles/${raffles[0].id}` }}
            className="w-full flex justify-center items-center bg-secondary hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 my-6"
          >
            <span className="text-xl">응모하기</span>
          </Link>

          {/* 실시간 응모 현황 보기 */}
          <button
            className="text-xl text-center w-full"
            onClick={() => handleCandidateModal()}
          >
            <u>실시간 응모 현황 보기</u>
          </button>

          {/* raffle detail */}
          <div className="flex justify-center">
            <div className="flex flex-col text-xs my-10 text-left xs:text-sm">
              <div>
                <span className="font-semibold">래플 응모기간</span>
                <span className="text-gray ml-2">
                  {raffleTime(raffles[0].begin_at)} -{' '}
                  {raffleTime(raffles[0].finish_at)}
                </span>
              </div>
              <div className="">
                <span className="font-semibold">당첨자 발표일</span>
                <span className="text-gray ml-2">
                  {raffleTime(raffles[0].finish_at)}
                </span>
              </div>
            </div>
          </div>

          {/* 제품 이미지 */}
          <div className="bg-secondary-light rounded-2xl">
            {product.images.map((image) => (
              <img
                key={image.id}
                className="-mt-7"
                src={image.src}
                alt="product"
              />
            ))}
          </div>

          {/* product detail */}
          <div className="">
            <div className="flex flex-col text-xs my-10 text-left xs:text-sm">
              <span className="font-bold text-base">상품 정보</span>
              <hr className="border-gray-border my-2" />
              <div className="flex justify-between mb-1">
                <span className="text-gray">브랜드</span>
                <span className="">{product.brand}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray">모델번호</span>
                <span className="">{product.serial}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray">대표색상</span>
                <span className="">{product.color}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray">출시일</span>
                <span className="">{product.release_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RaffleDetail;
