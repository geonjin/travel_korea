import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import LoginImage from "../../assets/images/kakao_login_large_wide.png";

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const navigate = useNavigate();

  const kakaoLogin = () => {
    window.location.replace(KAKAO_AUTH_URL);
  };

  // 디자인 수정
  return (
    <Layout title="로그인">
      <div className="flex justify-center mt-28">
        <button onClick={kakaoLogin}>
          <img src={LoginImage} />
        </button>
      </div>
    </Layout>
  );
};

export default Login;