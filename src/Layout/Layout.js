import { ReactComponent as TkoLogo } from "../assets/images/tkoLogo.svg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../assets/fonts/CookieRunRegular.ttf";
import * as LoginCheck from "../util/CheckLogin.jsx";
import { useState } from "react";

const Layout = (props) => {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const [loginState, setLoginState] = useState(LoginCheck.CheckLogin());
  const [inputValue, setInputValue] = useState(""); // 내용
  const [dropdown, setDropdown] = useState(true);


  const handleFormSubmit = (e) => {

    const formData = new FormData();
    formData.append("contents", inputValue);

    fetch(`${url}/api/community/search`, {
      method: "POST",
      body: formData,
    });
  }

  const LogOut = () => {
    localStorage.removeItem("token");
    setLoginState(LoginCheck.CheckLogin());
  };

  const handleOnClick = () => {
    sessionStorage.setItem("search", inputValue);
    navigate(`/SearchCommunityPost`);
    setInputValue("");
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOnClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    // 반응형 디자인(sm, md, lg)
    <div className="flex flex-col h-screen">
      <div
        id="상단바"
        className="
        flex justify-between items-center bg-white h-[65px] text-xl border-b-2 border-b-gray-300 fixed w-full z-50
        sm:flex sm:flex-wrap sm:h-[100px]
        "
      >
        <div id="상단바 왼쪽" className="flex justify-around w-[20%] ">
          <Link to="/">
            <TkoLogo className="sm:hidden w-[168px]" />
            <div className="md:hidden lg:hidden flex pl-5 w-[45%]">
              <div>TK</div>
              <div className="text-green-400">commu</div>
            </div>
          </Link>
        </div>

        <div id="상단바 가운데" className="w-[65%] sm:w-[80%] ">
          <nav>
            <ul className="flex justify-around sm:justify-evenly sm:flex-wrap">
              <li>
                <Link
                  to="/NoticePage/1"
                  className={`hover:font-cookie ${location.pathname === `/NoticePage/${props.page}`
                    ? "font-cookie border-b-2 border-black" : ""}`}>공지사항
                </Link>
              </li>
              <li>
                <Link
                  to="/CommunityPage/1"
                  className={`hover:font-cookie ${location.pathname === `/CommunityPage/${props.page}`
                    ? "font-cookie border-b-2 border-black"
                    : ""
                    }`}
                >
                  커뮤니티
                </Link>
              </li>
              <li>
                <Link
                  to="/ChatGptPage"
                  className={`hover:font-cookie ${location.pathname === "/ChatGptPage"
                    ? "font-cookie border-b-2 border-black"
                    : ""
                    }`}
                >
                  챗봇검색
                </Link>
              </li>

              <li className="sm:hidden">
                <div className="flex px-2 items-center border-2 border-gray-400 rounded-2xl" onSubmit={handleFormSubmit}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    type="text"
                    className="pt-1 rounded-xl text-base w-full h-[30px] outline-none resize-none"
                    placeholder="게시물검색"
                    value={inputValue}
                    spellcheck="false"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleOnKeyPress}
                  />
                  <button
                    onClick={handleOnClick}
                    className="text-gray-800 w-[50px] text-lg"
                  >
                    검색
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <div id="상단바 오른쪽"
          className="flex justify-end items-center w-[15%] mr-5 sm:hidden"
        >
          {loginState ? (
            <div className="flex">
              <Link
                to="/MyPage"
                className={`flex justify-end mr-2 hover:font-cookie ${location.pathname === `/MyPage`
                  ? "font-cookie border-b-2 border-black"
                  : ""
                  }`}
              >
                마이페이지
              </Link>
              <button
                className="pl-2 hover:font-cookie border-l-2 border-l-black"
                onClick={LogOut}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div id="로그인" className="flex justify-center hover:font-cookie">
              <div
                id="로그인"
                className="flex justify-end  pr-10 hover:font-cookie"
                onClick={() =>
                  sessionStorage.setItem("pathName", location.pathname)
                }
              >
                <Link
                  to={`/Login`}
                  className={`hover:font-cookie ${location.pathname === "/Login"
                    ? "font-cookie border-b-2 border-black"
                    : ""
                    }`}
                >
                  로그인
                </Link>
              </div>

            </div>
          )}
        </div>

        <div className="md:hidden lg:hidden w-full flex justify-evenly mt-1">
          <div className="flex w-[75%] px-2 items-center border-2 border-gray-400 rounded-2xl" onSubmit={handleFormSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              className="pt-1 rounded-xl text-base w-full h-[30px] outline-none resize-none"
              placeholder="게시물검색"
              value={inputValue}
              spellcheck="false"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
            <button
              onClick={handleOnClick}
              className="text-gray-800 w-[50px] text-lg"
            >
              검색
            </button>
          </div>
          <button onClick={e => setDropdown(!dropdown)} className="md:hidden lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {dropdown ? <div className="hidden" />
              : <div className="absolute right-1 z-50 w-[140px] border-2 border-gray-400 rounded-2xl p-2 mt-2 mr-2 bg-purple-50">
                {loginState ? (
                  <div className="">
                    <Link
                      to="/MyPage"
                      className={`text-center hover:font-cookie ${location.pathname === `/MyPage`
                        ? "font-cookie "
                        : ""
                        }`}
                    >
                      마이페이지
                    </Link>
                    <button
                      className="text-center hover:font-cookie "
                      onClick={LogOut}
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <div id="로그인" className="hover:font-cookie">
                    <div
                      id="로그인"
                      className=" hover:font-cookie"
                      onClick={() =>
                        sessionStorage.setItem("pathName", location.pathname)
                      }
                    >
                      <Link
                        to={`/Login`}
                        className={`hover:font-cookie ${location.pathname === "/Login"
                          ? "font-cookie border-b-2 border-black"
                          : ""
                          }`}
                      >
                        로그인
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            }
          </button>

        </div>

      </div>

      <div id="전체 컴포넌트" className="pt-[30px] flex-1">
        <div className="px-[12%] py-10 sm:px-[10%] md:px-[8%]">{props.children}</div>
      </div>

      <div id="하단 사이트 정보" className="sticky top-[100vh]">
        <div className="bg-gray-100 py-2">
          <div className="flex flex-wrap justify-around max-w-screen-xl mx-auto px-4 sm:justify-between sm:px-6 text-gray-800">
            <div className="p-5">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Home
              </div>
              <div className="my-3 block" href="/#">
                Services <span className="text-teal-600 text-xs p-1"></span>
              </div>
              <div className="my-3 block" href="/#">
                Products <span className="text-teal-600 text-xs p-1"></span>
              </div>
              <div className="my-3 block" href="/#">
                About Us <span className="text-teal-600 text-xs p-1"></span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs uppercase text-gray-500 font-medium">
                연락처
              </div>

              <div className="my-3 block" href="/#">
                010-8593-3821 <span className="text-teal-600 text-xs p-1"></span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs uppercase text-gray-500 font-medium">
                구성원
              </div>

              <div className="my-3 block" href="/#">
                김건진 <span className="text-teal-600 text-xs p-1"></span>
              </div>
              <div className="my-3 block" href="/#">
                강석원 <span className="text-teal-600 text-xs p-1"></span>
              </div>
              <div className="my-3 block" href="/#">
                박종훈 <span className="text-teal-600 text-xs p-1"></span>
              </div>
              <div className="my-3 block" href="/#">
                이진우 <span className="text-teal-600 text-xs p-1"></span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Contact us
              </div>

              <div className="my-3 block" href="/#">
                선문대학교 인문관, 4층 , 436호
                <span className="text-teal-600 text-xs p-1"></span>
              </div>

              <div className="my-3 block" href="/#">
                ca990125a@naver.com
                <span className="text-teal-600 text-xs p-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
