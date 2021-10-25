import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { raffleTime } from '../../components/helpers';
import { PROGRESS_LIST } from '../../config';
import API from '../../API';
//
import RaffleHeader from './RaffleHeader';
import back from '../../images/back.svg';
import ImageSwiper from './ImageSwiper';
import Candidate from './Candidate';
import Loading from '../Loading';
import Apply from './Apply';
import Timer from './Timer';
import Message from './Message';

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

  const [givenNumbers, setGivenNumbers] = useState([]);

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
      if (window.confirm('로그인 화면으로 이동할까요?✨')) {
        navigate('/login');
      }
    }
  };

  //결과 확인 모달
  const [isResultModalOn, setIsResultModalOn] = useState(false);
  const handleResultModal = (e) => {
    if (localStorage.access_token) {
      setIsResultModalOn(!isResultModalOn);
      isResultModalOn //모달 켜져있을 시 스크롤 방지
        ? (document.body.style.overflow = 'unset')
        : (document.body.style.overflow = 'hidden');
    } else {
      if (window.confirm('로그인 화면으로 이동할까요?✨')) {
        navigate('/login');
      }
    }
  };

  const fetchGivenNumber = (progress, applyOrNot) => {
    if (progress === 'done' && applyOrNot === true) {
      //응모 done && 사용자가 응모를 한 상태
      API.getGivenNumber(raffleId)
        .then((response) => response.json())
        .then((result) => {
          const tmp = result.filter(
            (obj) => obj.user === localStorage.access_nickname
          )[0]?.given_numbers; //결과가 있으면 저장 없으면 pass
          setGivenNumbers(tmp);
        })
        .catch((error) => console.log('error', error));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.state) {
      //받아오는 스테이트가 없을때만
      setLoading(true);

      //라플 가져오기
      API.getRaffle(raffleId)
        .then((response) => response.json())
        .then((result) => {
          setRaffle((prev) => {
            return { ...prev, ...result };
          });
          setLoading(false); //제품 가져오기에 두기에 너무 로딩이 길다
          fetchProduct(result.product_preview.id);
          fetchGivenNumber(result.progress, result.apply_or_not);
        })
        .catch((error) => console.log('error', error));

      const fetchProduct = (productId) => {
        //제품 가져오기
        API.getProduct(productId)
          .then((response) => response.json())
          .then((result) => {
            setProduct((prev) => {
              return { ...prev, ...result };
            });
          })
          .catch((error) => console.log('error', error));
      };
    } else {
      //받아오는 스테이트가 있을때
      fetchGivenNumber(raffle.progress, raffle.apply_or_not);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PROGRESS_FUNCTION = {
    ongoing: () => handleApplyModal(),
    done: () => {
      handleResultModal();
    },
  };

  return (
    <>
      {isCandidateModalOn && (
        <Candidate
          handleCandidateModal={handleCandidateModal}
          raffle={raffle}
          raffleId={raffleId}
        />
      )}

      {isApplyModalOn && (
        <Apply
          handleApplyModal={handleApplyModal}
          handleCandidateModal={handleCandidateModal}
          raffleId={raffleId}
          raffle={raffle}
          setRaffle={setRaffle}
          product={product}
        />
      )}

      {isResultModalOn && (
        <Message
          handleMessageModal={handleResultModal}
          raffle={raffle}
          product={product}
          givenNumbers={givenNumbers}
        />
      )}

      {loading && <Loading />}
      {loading ||
        (JSON.stringify(raffle) !== '{}' && ( //빈 객체인지 확인
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
            <div className=" bg-secondary-light pb-8 relative">
              <div
                className={
                  'px-5 py-1 m-5 bg-white absolute z-20 rounded-full shadow-md text-' +
                  PROGRESS_LIST[raffle.progress].progressColor
                }
              >
                {PROGRESS_LIST[raffle.progress].name}
              </div>
              <div className="flex items-center justify-center ">
                <div className="w-11/12 h-11/12">
                  <ImageSwiper product={product} />
                </div>
              </div>
              <div className="absolute z-20 -bottom-4 w-full">
                <p className="text-4xl font-semibold text-center px-7">
                  {product.name}
                </p>
              </div>
            </div>

            <div className="mt-8 px-7 pb-2 flex justify-center flex-col text-center">
              <p className=" text-gray">{product.brand}</p>
              <p className="mt-4 text-xl font-bold">
                {PROGRESS_LIST[raffle.progress].liveOrTotal} 참여 인원 : [{' '}
                <span
                  className={
                    'text-' + PROGRESS_LIST[raffle.progress].progressColor
                  }
                >
                  {raffle.apply_count} / {raffle.target_quantity}
                </span>{' '}
                명 ]
              </p>

              {/* apply raffle */}
              <button
                onClick={PROGRESS_FUNCTION[raffle.progress]}
                className={
                  // (raffle.apply_or_not
                  //   ? 'bg-gray'
                  //   : 'bg-' + PROGRESS_LIST[raffle.progress].btnColor) +
                  'bg-' +
                  PROGRESS_LIST[raffle.progress].btnColor +
                  ' w-full flex justify-center items-center hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 mt-6 shadow-lg ' +
                  ((raffle.progress === 'waiting' ||
                    raffle.progress === 'failed' ||
                    localStorage.access_nickname === undefined || //미인증 사용자
                    (raffle.progress === 'done' &&
                      raffle.apply_or_not === false)) && //응모가 완료인 상태인데 응모를 하지 않은 사용자
                    'hidden')
                }
                disabled={raffle.progress === 'ongoing' && raffle.apply_or_not} //응모가 진행중이면서 응모를 완료한 상태
              >
                <span
                  className={
                    (raffle.apply_or_not ? 'text-white' : '') + ' text-xl'
                  }
                >
                  {raffle.progress === 'waiting' && '응모 확인'}
                  {raffle.progress === 'ongoing' &&
                    (raffle.apply_or_not ? '응모 완료' : '응모 하기')}
                  {raffle.progress === 'done' && '당첨 결과 확인'}
                  {raffle.progress === 'failed' && '취소 결과 확인'}
                </span>
              </button>

              {/* 실시간 or 총 응모 내역 보기 */}
              <button
                className="text-xl text-center w-full mt-6"
                onClick={() => handleCandidateModal()}
              >
                <u>
                  {PROGRESS_LIST[raffle.progress].liveOrTotal} 응모 내역 보기
                </u>
              </button>

              {/* ongoing && 응모 완료자 */}
              {raffle.progress === 'ongoing' && //
                raffle.apply_or_not && ( //조건문 잘못된거 같은데; 안고쳐지누
                  <div className="text-red">
                    <span className="mt-6 block">
                      정원 충족시 [추첨]을 시작합니다.
                    </span>

                    <Timer raffle={raffle} />
                  </div>
                )}

              {/* failed && 응모 완료자 */}
              {raffle.progress === 'failed' && //
                raffle.apply_or_not && ( //조건문 잘못된거 같은데; 안고쳐지누
                  <div className="text-red">
                    <span className="mt-6 block">아쉽게도 참여인원 미달로</span>
                    <span className="block">추첨을 진행하지 않습니다.</span>
                    <span className="block">(응모권 반환 완료)</span>
                  </div>
                )}

              {/* raffle detail */}
              <div className="flex justify-center">
                <div className="flex flex-col text-xs my-10 text-left xs:text-sm">
                  <div>
                    <span className="font-semibold">래플 응모기간</span>
                    <span className="text-gray ml-2">
                      {raffleTime(raffle.start_date_time)} -{' '}
                      {raffleTime(raffle.end_date_time)}
                    </span>
                  </div>
                  <div className="">
                    <span className="font-semibold">당첨자 발표일</span>
                    <span className="text-gray ml-2">
                      {raffleTime(raffle.announce_date_time)}
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
        ))}
    </>
  );
};

export default RaffleDetail;
