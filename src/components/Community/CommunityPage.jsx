import { Link, json, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Paging from "../Pagination/Paging";
import { useEffect, useState } from "react";
import * as LoginCheck from "../../util/CheckLogin.jsx";

const CommunityPage = () => {
  const navigate = useNavigate();
  const { page } = useParams(); // 현제 페이지, 파라미터값
  const handlePageChange = (page) => {
    navigate(`/CommunityPage/${page}`);
  }; // 페이지헨들러 함수
  const [commuData, setCommuData] = useState([]); // api에서 받아온 데이터 저장
  const [listCount, setListCount] = useState(); // 보여줄 리스트
  const [pageItemsCountPer] = useState(10); // 페이지 내부 리스트 갯수
  const [pageRangeDisplayed] = useState(5); // paginator에서 보여줄 페이지 범위

  const loginState = LoginCheck.CheckLogin();
  const url = process.env.REACT_APP_API_URL


  // const a = [1, 2, 3, 4, 5, 6, 7, 8] //test

  useEffect(() => {
    //전체 데이터 갯수
    fetch(`${url}/api/community/count`)
      .then((res) => res.json())
      .then((json) => {
        setListCount(json.count);
      });
  }, []);

  useEffect(() => {
    // 해당 페이지 번호의 데이터 , 페이지가 선택될때마다 랜더링
    fetch(`${url}/api/community/${page}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCommuData(json);
      });
  }, [page]);

  return (
    <>
      <Layout title="커뮤니티" page={page}>
        <div id="커뮤니티 페이지 전체 레이아웃">
          <div
            id="커뮤니티 게시물 리스트"
            className="flex flex-col "
          >
            <div
              id="Top Layout"
              className={`flex justify-start items-end pb-16 mb-5 h-[150px] text-3xl border-b-2 border-gray-300 `}
            >
              커뮤니티
            </div>
            <div className="w-full flex justify-end mb-4">
              <Link to={`/CommuWriting`} className="flex justify-center items-center rounded-lg border-2 text-gray-50 bg-green-400 w-20 h-14 mt-4 hover:bg-green-500">글쓰기</Link>
            </div>

            <div id="커뮤니티 게시물 포멧" className="flex flex-wrap justify-evenly md:justify-around">
              {commuData.map((commu, idx) => {
                return (
                  <div key={idx} className="m-4 w-[320px] sm:w-[500px]">
                    <nav>
                      <ul>
                        <li className="p-2 h-[280px] sm:h-[300px] shadow-xl bg-white border-gray-300 border-2 rounded-2xl">
                          <Link to={`/SingleCommuPage/${commu.num}`}>
                            <div className="flex justify-between items-center">
                              <div className="ml-3 mb-2 flex justify-start items-center">
                                <img id="작성자프로필" className=" w-[40px] h-[40px] rounded-full border-2 border-black" src={`${commu.userImage}`}></img>
                                <div id="작성자" className="text-base flex justify-center ml-2">{commu.writer}</div>
                              </div>
                              <div id="작성시간" className="flex justify-center text-sm w-[95px] text-center">{commu.date}</div>
                            </div>
                            <div id="게시글이미지" className={`flex justify-center rounded-2xl mb-1 items-center h-[140px] sm:h-[160px] scale-100 hover:scale-105 transition-all duration-500 cursor-pointer`}>
                              <img className="w-full h-full rounded-2xl" src={`${commu.image}`}></img>
                            </div>
                            <div id="제목글" className=" text-lg font-cookie truncate">{commu.title}</div>
                            <div id="게시물내용" className="break-all line-clamp-2">{commu.contents}</div>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                );
              })}
            </div>
            <Paging totalItemsCount={listCount} page={parseInt(page)} itemsCountPer={pageItemsCountPer} pageRangeDisplayed={pageRangeDisplayed} handlePageChange={handlePageChange} />
          </div>
        </div>
      </Layout>
    </>
  );
};


export default CommunityPage;
