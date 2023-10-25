import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";

const SingNoticPage = () => {
  const navigate = useNavigate();
  const { postNum } = useParams();
  const [currentPost, setCurrentPost] = useState(); // 현재게시물
  const [searchPageNum, setSearchPageNum] = useState();

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${url}/api/noticeDetail/${postNum}`)
      .then((res) => res.json())
      .then((json) => {
        setSearchPageNum(parseInt(json[0].page / 10 + 1));
        setCurrentPost(...json);
      });
  }, [postNum]);

  return (
    <>
      <Layout>
        {currentPost ? (
          <div className="">
            <div
              id="Top Layout"
              className={`flex justify-start items-end pb-16 mb-5 h-[150px] text-3xl border-b-2 border-gray-300 `}
            >
              공지사항
            </div>
            <div className="flex justify-between items-center border-b-2 border-black">
              <div className="text-3xl mb-8 ">{currentPost.title}</div>
              <div id="작성시간 + 작성자" className=" flex pb-2 ">
                <div className="pr-2 ">{currentPost.date}</div>
              </div>
            </div>
            <div className="mt-8">{currentPost.contents}</div>
            <div className="  border-t-2 w-full border-t-black mt-8   pt-2 flex">
              <div id="이전게시물" className="  w-full">
                {currentPost.nextNum ? (
                  <Link to={`/SingleNoticPage/${currentPost.nextNum}`}>
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
                  navigate(`/NoticePage/${searchPageNum}`);
                }}
              >
                {" "}
                목록으로
              </button>
              <div id="다음게시물" className="flex justify-end w-full">
                {currentPost.beforeNum ? (
                  <Link to={`/SingleNoticPage/${currentPost.beforeNum}`}>
                    다음 글 - {currentPost.beforeTitle}{" "}
                  </Link>
                ) : (
                  "다음 게시물이 없습니다"
                )}
              </div>
            </div>
          </div>
        ) :  navigate(`/NoticePage/1`)}
      </Layout>
    </>
  );
};

export default SingNoticPage;