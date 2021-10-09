import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PROXY } from '../config';

import Warning from '../Warning';

const Password = ({ email }) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate(); //Naviagte hook 사용
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onSubmit = (data) => {
    var formdata = new FormData();
    formdata.append('username', email);
    formdata.append('password', data.password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${PROXY}/account/login`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError('password', {
            //react-hook-form
            type: 'wrongPassword',
          });
        }
      })
      .then((result) => {
        if (result) {
          localStorage.setItem('access_token', result.token); //localStorage token 생성
          localStorage.setItem('access_nickname', result.nickname);
          localStorage.setItem('access_id', result.id);
          alert('로그인에 성공하였습니다.');
          navigate('/');
        }
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <section className="flex h-screen items-center pt-10">
      <div className="bg-white w-full h-screen px-6 flex items-center justify-center">
        <div className="w-full h-full">
          <div className="flex justify-center flex-col">
            <span className="text-xl font-bold leading-tight mt-10">
              비밀번호를 입력해주세요.
            </span>
          </div>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-darkest">비밀번호</label>
              <input
                type="password"
                name="password"
                {...register('password', {
                  required: true,
                })}
                placeholder="비밀번호를 입력해 주세요."
                className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="on"
              />
              {errors.password && errors.password.type === 'required' && (
                <Warning>비밀번호를 입력해 주세요.</Warning>
              )}
              {errors.password && errors.password.type === 'wrongPassword' && (
                <Warning>비밀번호가 틀렸습니다. 재입력 해주세요.</Warning>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              <span className="ml-2">로그인</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Password;
