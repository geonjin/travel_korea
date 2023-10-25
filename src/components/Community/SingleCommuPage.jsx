import React, { useEffect, useState } from "react";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";

const SingleCommuPage = () => {
  const navigate = useNavigate();
  const { postNum } = useParams();
  const [currentPost, setCurrentPost] = useState(); // 현재게시물
  const [searchPageNum, setSearchPageNum] = useState();
  const [inputValue, setInputValue] = useState(""); // 내용
  const [postComment, setPostComment] = useState(""); // 댓글 list

  const url = process.env.REACT_APP_API_URL;

  const handleFormSubmit = (e) => {
    if (!inputValue) {
      alert("내용을 입력해주세요.");
      return;
    } else if (!localStorage.getItem("token")) {
      alert("로그인 후 작성 가능합니다.");
      return;
    }

    const formData = new FormData();

    formData.append("comment", inputValue);
    formData.append("postNum", postNum);
    formData.append("token", localStorage.getItem("token"));

    fetch(`${url}/api/community/comment/writing`, {
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    fetch(`${url}/api/communityDetail/${postNum}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.post[0].page);
        console.log(json);

        setSearchPageNum(parseInt(json.post[0].page / 12 + 1));
        setCurrentPost(json.post[0]);
        setPostComment(json.comment);
      });
  }, [postNum]);

  return (
    <>
      <Layout>
        {currentPost ? (
          <div className="">
            <div
              id="Top Layout"
              className={`flex justify-center h-[500px] sm:h-[350px] max-w-full  pb-16 scale-y-75 text-3xl border-b-2 border-gray-300 `}
            >
              <img
                className="h-full w-full object-center rounded-2xl"
                src={`${currentPost.image}`}
              ></img>
            </div>
            <div className="flex justify-between items-center border-b-2 border-black">
              <div>
                <div className="text-3xl mb-8 sm:text-xl sm:mb-4 sm:w-[80%] ">{currentPost.title}</div>
                <div className="pr-2">{currentPost.date}</div>
              </div>
              <div className="flex items-center mr-5">
                <img
                  className="w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] rounded-full border-2 border-black"
                  src={`${currentPost.userImage}`}
                ></img>
                <div className="ml-2 text-lg sm:w-[75px]">{currentPost.writer}</div>
              </div>
            </div>
            <div className="mt-8 break-all whitespace-pre-wrap">
              {currentPost.contents}
            </div>
            <div className="  border-t-2 w-full border-t-black my-8 pt-2 flex">
              <div id="이전게시물" className="  w-full">
                {currentPost.nextNum ? (
                  <Link to={`/SingleCommuPage/${currentPost.nextNum}`}>
                    이전 글 - {currentPost.nextTitle}
                  </Link>
                ) : (
                  "이전 게시물이 없습니다"
                )}
              </div>
              <button
                id="뒤로가기"
                className="flex justify-center w-full"
                onClick={() => {
                  navigate(`/communityPage/${searchPageNum}`);
                }}
              >
                {" "}
                목록으로
              </button>
              <div id="다음게시물" className="flex justify-end w-full">
                {currentPost.beforeNum ? (
                  <Link to={`/SingleCommuPage/${currentPost.beforeNum}`}>
                    다음 글 - {currentPost.beforeTitle}{" "}
                  </Link>
                ) : (
                  "다음 게시물이 없습니다"
                )}
              </div>
            </div>

            <div id="댓글 칸">
              <div className="flex justify-center">
                <form
                  id="writingForm"
                  className="flex justify-center items-center w-full border-2 rounded-2xl"
                  onSubmit={handleFormSubmit}
                >
                  {/* <div id="카카오 프로필" className="flex items-center h-[50px] border border-black">회원 프로필</div> */}
                  <input
                    type="text"
                    className="mx-5 w-full h-[45px] outline-none resize-none "
                    placeholder="댓글을 입력하세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="pr-5 w-[100px]  text-green-500"
                    // 작성이 끝나면 해당 게시물로 이동
                  >
                    게시
                  </button>
                </form>
              </div>

              <div
                id="댓글 list"
                className="flex flex-col justify-center items-center py-10 w-full"
              >
                {postComment.map((comments, idx) => {
                  return (
                    <div key={idx} className="sm:w-full">
                      <div className="mb-5 pb-2 border-b-2 border-gray-100 w-[800px] sm:w-full">
                        <div className="flex justify-start items-center">
                          <div className="flex justify-center items-center rounded-full  border-black border-2 mr-2">
                            <img
                              className="w-[40px] h-[40px] rounded-full"
                              src={`${comments.userImage}`}
                            ></img>
                          </div>
                          <div className="mb-2 flex flex-col justify-start items-center">
                            <div>{comments.writer}</div>
                            <div className="text-sm text-gray-500">
                              {comments.date}
                            </div>
                          </div>
                        </div>
                        {/* <div className="h-[50px] mx-5 w-[800px] border-2">{comments.num}</div> */}
                        <div>{comments.contents}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          navigate(`/communityPage/1`)
        )}
      </Layout>
    </>
  );
};

export default SingleCommuPage;