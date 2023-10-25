import { useEffect, useState } from "react";
import CheckLogin from "../util/CheckLogin";
import Layout from "../Layout/Layout";
import { Link, json, useLocation, useParams } from "react-router-dom";
import Paging from "./Pagination/Paging";

function MyPage() {
  const url = process.env.REACT_APP_API_URL;
  let location = useLocation();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!CheckLogin()) {
      alert("로그인 후 접근 가능합니다.");
      sessionStorage.setItem("pathName", location.pathname);
      window.location.replace("/login");
    }
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [pageItemsCountPer] = useState(10);
  const [pageRangeDisplayed] = useState(5);
  const [profileList, setProfileList] = useState();
  const [postList, setPostList] = useState([]);
  const [count, setCount] = useState(0);

  // 카카오 정보 받아오기
  useEffect(() => {
    const formData = new FormData();
    // 사용자 식별
    formData.append("token", localStorage.getItem("token"));

    fetch(`${url}/api/kakaoProfile`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.profile);
        console.log(json.post);
        setProfileList(json.profile[0]);
        setPostList(json.post);
      });
  }, [count]);

  return (
    <Layout>
      {profileList ? (
        <div className="p-1 mx-[10%] sm:mt-20">
          <div>
            <div className="bg-gray-115 rounded-lg shadow-md p-6 mb-4 py-8">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={profileList.kakao_profile_img}
                    className="border-black border-2 w-20 h-20 rounded-full"
                    alt="프로필 사진"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">
                    {profileList.nickname}
                  </div>
                  <div className="text-gray-500">{profileList.kakao_email}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-115 rounded-lg shadow-md p-6 mb-4 py-8">
              <div>
                <div id="공지사항 페이지 전체 레이아웃">
                  <div id="공지사항 게시물 리스트" className="flex flex-col">
                    <div className="">
                      <div
                        id="리스트 타이틀"
                        className="pr-5 bg-gray-200 flex justify-between w-[100%] border-t-2 border-t-gray-400"
                      >
                        <div className="w-[50%] flex justify-center">제목</div>

                        <div className="w-[50%] flex justify-center">
                          작성날짜
                        </div>
                      </div>
                      <div
                        id="공지사항 게시물 포멧"
                        className="border-2 border-gray-300 w-[100%] "
                      >
                        {postList
                          ? postList.map((postList, idx) => {
                              return (
                                <div key={idx}>
                                  <nav>
                                    <ul>
                                      <li className="flex  my-2 items-center">
                                        <Link
                                          to={`/SingleCommuPage/${postList.num}`}
                                          className="w-[50%]"
                                        >
                                          <div
                                            id="제목글"
                                            className="ml-2 truncate"
                                          >
                                            {postList.title}
                                          </div>
                                        </Link>
                                        <div
                                          id="작성시간"
                                          className="w-[50%] flex justify-center"
                                        >
                                          {postList.date}
                                        </div>
                                        <button
                                          onClick={() => {
                                            fetch(
                                              `${url}/api/community/delete/${postList.num}`
                                            ).then((res) =>
                                              res.json().then((json) => {
                                                console.log(json);
                                                if (json.state) {
                                                  alert(
                                                    "게시물이 삭제되었습니다"
                                                  );
                                                  setCount(count + 1);
                                                }
                                              })
                                            );
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                          </svg>
                                        </button>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                    <Paging
                      totalItemsCount={postList.length}
                      page={parseInt(page)}
                      itemsCountPer={pageItemsCountPer}
                      pageRangeDisplayed={pageRangeDisplayed}
                      handlePageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}

export default MyPage;
