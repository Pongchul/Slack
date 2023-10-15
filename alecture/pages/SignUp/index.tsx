import React, { useCallback, useState } from "react";
import {
  Form,
  Label,
  Input,
  LinkContainer,
  Button,
  Header,
  Success,
  Error,
} from "./styles";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";

const SignUp = () => {
  const { data, error, revalidate, mutate } = useSWR(
    "http://localhost:3095/api/users",
    fetcher
  );
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMissmatchError] = useState(false);
  const [signUpError, setSignupError] = useState("");
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const onSubmit = useCallback(
    // useCallback 자체가 이 함수를 캐싱해둬라 기억해둬라 그런 의미. 언제까지 ? deps의 값이 바뀔 때까지. 하나라도 바뀌면 이 함수를 새로 만들고 바뀌는게 없으면 이전 함수 계속 쓰고
    (e) => {
      e.preventDefault();
      if (!mismatchError) {
        console.log("Signup in server");
        setSignupError(""); // 초기화 함수 비슷한 느낌
        setSignupSuccess(false);
        axios
          .post("http://localhost:3095/api/users", {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignupSuccess(true);
          })
          .catch((error) => {
            console.log("<<<<<Error response>>>>>", error.response);
            setSignupError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError] // deps에 함수안에 쓰이는 state들 넣어 줘야 한다. 그래야 state가 업데이트 된다.
  );

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
    },
    [password]
  );

  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={onChangeNickname}
            />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && (
            <Success>회원가입되었습니다! 로그인해주세요.</Success>
          )}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
