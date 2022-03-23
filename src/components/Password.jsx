/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import API from '../API';
import Warning from '../Warning';

const Password = ({ email }) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onSubmit = (data) => {
    setLoading(true);

    const formdata = new FormData();
    formdata.append('username', email);
    formdata.append('password', data.password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    API.postAccount('login', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw 'wrongPassword';
        }
      })
      .then((result) => {
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('access_nickname', result.nickname);
        localStorage.setItem('access_id', result.id);
        alert(`안녕하세요 ${result.nickname}님 😆`);
        navigate('/');
        window.location.reload(); //새로고침을 해줘야 localStorage에 있는지 확인함
      })
      .catch((error) =>
        setError('password', {
          type: error,
        })
      )
      .finally(() => setLoading(false));
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
              <span className="ml-2">
                {loading ? (
                  <div className="ml-1 w-6 h-6 animate-spin">
                    <svg
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
                  </div>
                ) : (
                  '로그인'
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Password;
