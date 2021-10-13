import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { raffleTime } from '../../components/helpers';
import { PROXY } from '../../config';
//
import RaffleHeader from './RaffleHeader';
import back from '../../images/back.svg';
import ImageSwiper from './ImageSwiper';
import Candidate from './Candidate';
import Loading from '../Loading';
import Apply from './Apply';
import Timer from './Timer';

const RaffleDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const { raffleId } = useParams();
  const navigate = useNavigate(); //Naviagte hook 사용

  const location = useLocation();

  const [raffle, setRaffle] = useState(
    location.state ? location.state.raffle : {}
  );
  const [product, setProduct] = useState(
    location.state
      ? location.state.product
      : {
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
        }
  );

  //실시간 응모자 리스트 모달
  const [isCandidateModalOn, setIsCandidateModalOn] = useState(false);
  const handleCandidateModal = (e) => {
    setIsCandidateModalOn(!isCandidateModalOn);
    isCandidateModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  //응모 참여 모달
  const [isApplyModalOn, setIsApplyModalOn] = useState(false);
  const handleApplyModal = (e) => {
    if (localStorage.access_token) {
      setIsApplyModalOn(!isApplyModalOn);
      isApplyModalOn //모달 켜져있을 시 스크롤 방지
        ? (document.body.style.overflow = 'unset')
        : (document.body.style.overflow = 'hidden');
    } else {
      alert('로그인이 필요한 서비스입니다!');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!location.state) {
      //받아오는 스테이트가 없을때만
      setLoading(true);

      var myHeaders = new Headers();
      if (localStorage.access_token) {
        //토큰이 있을때만 header 첨부
        myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
      }

      //라플 리스트 가져오기
      fetch(`${PROXY}/loffle/raffles/${raffleId}`, {
        method: 'GET',
        headers: myHeaders, //header에 token을 실어 보내야 apply_or_not 확인이 가능하다
      })
        .then((response) => response.json())
        .then((result) => {
          setRaffle((prev) => {
            return { ...prev, ...result };
          });
          fetchProduct(result.product);
          console.log(result);
        })
        .catch((error) => console.log('error', error));

      const fetchProduct = (productId) => {
        //제품 리스트 가져오기
        fetch(`${PROXY}/loffle/products/${productId}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((result) => {
            setProduct((prev) => {
              return { ...prev, ...result };
            });
            setLoading(false);
          })
          .catch((error) => console.log('error', error));
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isCandidateModalOn && (
        <Candidate handleCandidateModal={handleCandidateModal} />
      )}

      {isApplyModalOn && (
        <Apply
          handleApplyModal={handleApplyModal}
          handleCandidateModal={handleCandidateModal}
          raffleId={raffleId}
          raffle={raffle}
          product={product}
        />
      )}

      {loading && <Loading />}
      {loading || (
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
            <div className="absolute z-20 -bottom-4 w-full">
              <p className="text-4xl font-semibold text-center px-7">
                {product.name}
              </p>
            </div>
          </ImageSwiper>

          <div className="mt-8 px-7 pb-2 flex justify-center flex-col text-center">
            <p className=" text-gray">{product.brand}</p>
            <p className="mt-4 text-xl font-bold">
              실시간 참여 인원 : [{' '}
              <span className="text-secondary">
                {raffle.apply_count} / {raffle.target_quantity}
              </span>{' '}
              명 ]
            </p>

            {/* apply raffle */}
            <button
              onClick={() => handleApplyModal()}
              className={
                (raffle.apply_or_not ? 'bg-gray' : 'bg-secondary') +
                ' w-full flex justify-center items-center hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 my-6 shadow-lg'
              }
              disabled={raffle.apply_or_not}
            >
              <span
                className={
                  (raffle.apply_or_not ? 'text-white' : '') + ' text-xl'
                }
              >
                {raffle.apply_or_not ? '응모 완료' : '응모 하기'}
              </span>
            </button>

            {/* 실시간 응모 현황 보기 */}
            <button
              className="text-xl text-center w-full"
              onClick={() => handleCandidateModal()}
            >
              <u>실시간 응모 현황 보기</u>
            </button>

            {/* 응모 완료자 */}
            {raffle.apply_or_not && (
              <div className="text-red">
                <span className="mt-6 block">
                  정원 충족시 [추첨]을 시작합니다.
                </span>

                <Timer finishAt={raffle.finish_at} />
              </div>
            )}

            {/* raffle detail */}
            <div className="flex justify-center">
              <div className="flex flex-col text-xs my-10 text-left xs:text-sm">
                <div>
                  <span className="font-semibold">래플 응모기간</span>
                  <span className="text-gray ml-2">
                    {raffleTime(raffle.begin_at)} -{' '}
                    {raffleTime(raffle.finish_at)}
                  </span>
                </div>
                <div className="">
                  <span className="font-semibold">당첨자 발표일</span>
                  <span className="text-gray ml-2">
                    {raffleTime(raffle.finish_at)}
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
      )}
    </>
  );
};

export default RaffleDetail;
