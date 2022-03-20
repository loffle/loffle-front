import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import API from '../API';
//
import Loading from '../components/Loading';
import Warning from '../Warning';
import Join from './Join';
import Password from './Password';
//
import emailLogo from '../images/login_email.svg';
import googleLogo from '../images/login_google.svg';
import facebookLogo from '../images/login_facebook.svg';

const Login = () => {
  window.scrollTo(0, 0);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false); //이메일 체크 했는지 안했는지
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    //이메일 체크
    setEmail(data.email);
    setEmailChecked(true);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', data.email);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    API.checkInfo('email', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.email_exist === true) {
          setShowPasswordInput(true);
        }
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  const alertCanNotUse = () =>
    alert(
      '기능 준비 중입니다 👀 \n\n 이메일로 로그인 · 회원가입을 진행해주세요'
    );

  return (
    <>
      {loading && <Loading />}
      {loading || emailChecked ? (
        showPasswordInput ? (
          <Password email={email} />
        ) : (
          <Join email={email} />
        ) //email check가 false, 입력한 email 존재
      ) : (
        <section className="flex h-screen items-center pt-10">
          <div className="bg-white w-full h-screen px-6 flex items-center justify-center">
            <div className="w-full h-full">
              <div className="flex justify-center flex-col">
                <span className="text-xl font-bold leading-tight mt-10">
                  로그인 · 회원가입을 진행해주세요.
                </span>
              </div>
              <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-gray-darkest">이메일</label>
                  <input
                    name="email"
                    {...register('email', {
                      required: true,
                      pattern:
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    })}
                    placeholder="이메일을 입력해 주세요."
                    className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                    autoFocus
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <Warning>이메일을 입력해주세요.</Warning>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <Warning>이메일 형식에 맞지 않습니다.</Warning>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                  <img src={emailLogo} alt="email-logo" />{' '}
                  <span className="ml-2">이메일로 시작하기</span>
                </button>
              </form>
              <hr className="my-6 border-gray-border w-full" />
              <button
                type="button"
                className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-border"
                onClick={alertCanNotUse}
              >
                <div className="flex items-center justify-center">
                  <img src={googleLogo} alt="google-logo" />
                  <span className="ml-3 text-gray-social">
                    <span className="font-bold">Google</span>로 시작하기
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="w-full mt-3 block bg-white hover:bg-gray-100 focus:bg-gray-100 font-semibold rounded-lg px-4 py-3 border border-gray-border"
                onClick={alertCanNotUse}
              >
                <div className="flex items-center justify-center">
                  <img src={facebookLogo} alt="facebook-logo" />
                  <span className="ml-3 text-gray-social">
                    <span className="font-bold">Facebook</span>로 시작하기
                  </span>
                </div>
              </button>
              <p className="mt-5 text-center text-sm text-gray">
                걱정마세요! 여러분의 활동은 SNS에 노출되지 않습니다.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
