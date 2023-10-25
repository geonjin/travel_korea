import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Oauth() {
    const url1 = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const kakaoCode = new URL(window.location.href).searchParams.get("code");
        const url = `${url1}/api/oauth/token/${kakaoCode}`;
        fetch(url).then((res) => {
            // 로그인 성공시 token값 localStorage에 저장
            // localStorage.setItem("token", res.headers.get("Authorization").split(".")[1]);
            localStorage.setItem("token", res.headers.get("Authorization"));

            // 로그인을 시도한 페이지로 이동
            console.log(sessionStorage.getItem("pathName"));
            window.location.replace(sessionStorage.getItem("pathName"));
            sessionStorage.removeItem("pathName");
        });
    }, []);
}

export default Oauth;