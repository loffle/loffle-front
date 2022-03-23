/* eslint-disable no-throw-literal */
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Warning from '../Warning';
import API from '../API';

const Join = ({ email }) => {
  const {
    register,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const password = useRef();
  password.current = watch('password');

  const onSubmit = (data) => {
    var formdata = new FormData();
    formdata.append('password', data.password);
    formdata.append('email', email); //login에서 넘겨준 email
    formdata.append('username', data.username);
    formdata.append('sex', data.sex);
    formdata.append('phone', data.phone);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    API.postAccount('signup', requestOptions)
      .then((response) => {
        if (response.ok) {
          alert('회원가입이 완료되었습니다. 로그인을 해주세요.');
          window.location.reload();
        } else {
          throw '서버에 이상이 있는 것 같습니다 😵';
        }
      })
      .catch((error) => alert(error));
  };

  const onDuplicateCheck = (key, value) => {
    if (value.length) {
      var formdata = new FormData();
      formdata.append(key, value);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      API.checkInfo(key, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.username_exist === true) {
            setError('username', {
              type: 'duplicteCheck',
            });
            return;
          }
          if (result.phone_exist === true) {
            setError('phone', {
              type: 'duplicteCheck',
            });
            return;
          }
          clearErrors(['username', 'phone']); //해당 없으면 에러 제거
        })
        .catch((error) => console.log('error', error));
    }
  };

  function isEmpty(obj) {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  }

  return (
    <>
      <section className="flex h-screen items-center">
        <div className="bg-white w-full h-screen px-6 flex items-center justify-center">
          <div className="w-full h-full">
            <div className="flex justify-center flex-col">
              <span className="text-xl font-bold leading-tight mt-7">
                회원가입
              </span>
            </div>
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-darkest">닉네임</label>
                <input
                  name="username"
                  {...register('username', {
                    required: true,
                    maxLength: 12,
                    duplicteCheck: true,
                  })}
                  placeholder="닉네임을 입력해 주세요."
                  className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                  autoFocus
                  onBlur={(e) => {
                    onDuplicateCheck('username', e.target.value);
                  }}
                />
                {errors.username && errors.username.type === 'required' && (
                  <Warning>닉네임을 입력해주세요.</Warning>
                )}
                {errors.username && errors.username.type === 'maxLength' && (
                  <Warning>닉네임을 12자 이내로 입력해주세요.</Warning>
                )}
                {errors.username &&
                  errors.username.type === 'duplicteCheck' && (
                    <Warning>이미 사용중인 닉네임 입니다.</Warning>
                  )}
              </div>
              <div>
                <label className="block text-gray-darkest mt-5">성별</label>
                <div className="w-full pl-3 pt-3">
                  <input
                    name="sex"
                    {...register('sex', { required: true })}
                    type="radio"
                    value="M"
                    defaultChecked
                  />
                  <span className="ml-1">남자</span>
                  <input
                    name="sex"
                    {...register('sex', { required: true })}
                    type="radio"
                    className="ml-3"
                    value="F"
                  />
                  <span className="ml-1">여자</span>
                </div>
              </div>
              <div>
                <label className="block text-gray-darkest mt-5">
                  휴대폰 번호
                </label>
                <input
                  name="phone"
                  {...register('phone', {
                    required: true,
                    pattern: /^\d{10,11}$/,
                    duplicteCheck: true,
                  })}
                  placeholder="(예시) 01076793974"
                  className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                  onBlur={(e) => {
                    onDuplicateCheck('phone', e.target.value);
                  }}
                />
                {errors.phone && errors.phone.type === 'required' && (
                  <Warning>휴대폰 번호를 입력해주세요.</Warning>
                )}
                {errors.phone && errors.phone.type === 'pattern' && (
                  <Warning>휴대폰 번호 형식이 맞지 않습니다.</Warning>
                )}
                {errors.phone && errors.phone.type === 'duplicteCheck' && (
                  <Warning>이미 사용중인 휴대폰 번호 입니다.</Warning>
                )}
              </div>
              <div>
                <label className="block text-gray-darkest mt-5">비밀번호</label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 8 })}
                  placeholder="비밀번호를 입력해 주세요."
                  className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                  autoComplete="on"
                />
                <span className="mt-1 text-center text-sm text-gray">
                  * 최소 8자 이상 입력해 주세요.
                </span>
                {errors.password && errors.password.type === 'required' && (
                  <Warning>비밀번호를 입력해주세요.</Warning>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                  <Warning>비밀번호를 8자 이상 입력해주세요.</Warning>
                )}
              </div>
              <div>
                <label className="block text-gray-darkest mt-5">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  {...register('password_confirm', {
                    required: true,
                    validate: (value) => value === password.current,
                  })}
                  placeholder="비밀번호를 다시 한번 입력해 주세요."
                  className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                  autoComplete="on"
                />

                {errors.password_confirm &&
                  errors.password_confirm.type === 'required' && (
                    <Warning>비밀번호 확인을 입력해주세요.</Warning>
                  )}
                {errors.password_confirm &&
                  errors.password_confirm.type === 'validate' && (
                    <Warning>비밀번호가 일치하지 않습니다.</Warning>
                  )}
              </div>
              <hr className="my-6 border-gray-border w-full" />
              <button
                type="submit"
                className="w-full flex justify-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                disabled={!isEmpty(errors)}
              >
                <span className="">회원가입 하기</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Join;
