import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Warning from "../Warning";

const Join = (props) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //console.log(watch("name"));
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    console.log("data", data);
    // 데이터를 이제 post 로 전송하면 댐
  };

  return (
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
              <label className="block text-gray-darkest">이름</label>
              <input
                name="name"
                id=""
                {...register("name", { required: true, maxLength: 8 })}
                placeholder="이름을 입력해 주세요."
                className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
                autoFocus
              />
              {errors.name && errors.name.type === "required" && (
                <Warning>이름을 입력해주세요.</Warning>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <Warning>이름을 8자 이내로 입력해주세요.</Warning>
              )}
            </div>
            <div>
              <label className="block text-gray-darkest mt-5">
                휴대폰 번호
              </label>
              <input
                name="phone"
                id=""
                {...register("phone", {
                  required: true,
                  pattern: /^\d{10,11}$/,
                })}
                placeholder="(예시) 01076793974"
                className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
              />
              {errors.phone && errors.phone.type === "required" && (
                <Warning>휴대폰 번호를 입력해주세요.</Warning>
              )}
              {errors.phone && errors.phone.type === "pattern" && (
                <Warning>휴대폰 번호 형식이 맞지 않습니다.</Warning>
              )}
            </div>
            <div>
              <label className="block text-gray-darkest mt-5">비밀번호</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 8 })}
                placeholder="비밀번호를 입력해 주세요."
                className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
              />
              <span className="mt-1 text-center text-sm text-gray">
                * 최소 8자 이상 입력해 주세요.
              </span>
              {errors.password && errors.password.type === "required" && (
                <Warning>비밀번호를 입력해주세요.</Warning>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <Warning>비밀번호를 8자 이상 입력해주세요.</Warning>
              )}
            </div>
            <div>
              <label className="block text-gray-darkest mt-5">
                비밀번호 확인
              </label>
              <input
                type="password"
                {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
                placeholder="비밀번호를 다시 한번 입력해 주세요."
                className="w-full px-4 py-3 rounded-lg mt-2 border border-gray-border focus:border-primary focus:bg-white focus:outline-none"
              />

              {errors.password_confirm &&
                errors.password_confirm.type === "required" && (
                  <Warning>비밀번호 확인을 입력해주세요.</Warning>
                )}
              {errors.password_confirm &&
                errors.password_confirm.type === "validate" && (
                  <Warning>비밀번호가 일치하지 않습니다.</Warning>
                )}
            </div>
            <hr className="my-6 border-gray-border w-full" />
            <button
              type="submit"
              //onClick={handleSubmit}
              className="w-full flex justify-center bg-primary bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-100 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              <span className="">회원가입 하기</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Join;
