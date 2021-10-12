import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROXY } from '../../config';
//
import Timer from './Timer';
import ImageSwiper from './ImageSwiper';

const Raffle = ({ raffle }) => {
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState({
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

  useEffect(() => {
    //제품 가져오기
    fetch(`${PROXY}/loffle/products/${raffle.product}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setProduct((prev) => {
          return { ...prev, ...result }; //이미지때문에 prev사용
        });
      })
      .catch((error) => console.log('error', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* image swiper */}
      <ImageSwiper product={product}>
        <Timer finishAt={raffle.finish_at} />
      </ImageSwiper>

      <div className="mt-12 px-7 pb-2">
        <p className="text-2xl font-medium text-center">{product.name}</p>
        <p className=" mt-2 text-gray block text-center">{product.brand}</p>
        <p className="mt-4 text-xl font-bold text-center block">
          실시간 참여 인원 : [{' '}
          <span className="text-secondary">
            {raffle.apply_count} / {raffle.target_quantity}
          </span>{' '}
          명 ]
        </p>

        {/* apply raffle */}
        <Link
          to={{ pathname: `/raffles/${raffle.id}` }}
          state={{ raffle, product }}
          className={
            (raffle.apply_or_not ? 'bg-opacity-70' : '') +
            ' w-full flex justify-center items-center bg-secondary hover:bg-opacity-80 text-white font-semibold rounded-lg px-4 py-3 my-6'
          }
        >
          <span className="text-xl">
            {raffle.apply_or_not ? '응모 확인' : '응모 하기'}
          </span>
        </Link>
      </div>
    </>
  );
};

export default Raffle;
