import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout";

import { Link, useNavigate } from "react-router-dom";

import image1 from "./assets/images/성산일출봉.jpg";
import image2 from "./assets/images/남산타워.jpg";
import image3 from "./assets/images/황리단길.jpg";

function App() {
  const navigater = useNavigate();

  const [noticList, setNoticeList] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const imageSources = [image1, image2, image3];

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${url}/api/main`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCommunityList(json.Community);
        setNoticeList(json.Notice);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % imageSources.length
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 디자인 수정
  return (
    <>
      <Layout>
        <div id="전체 레이이웃">
          <div className="flex justify-center bg-white h-[500px] sm:h-[250px] sm:mt-10">
            <img
              src={imageSources[currentImageIndex]}
              alt="광고 이미지"
              className="object-cover w-full rounded-2xl"
            />
          </div>

          <div className="mt-11 mb-2">
            다른 사람들의 여행 경험 이야기를 들어보세요
          </div>

          <div className="flex overflow-x-scroll bg-white">
            <div className="flex justify-center space-x-6">
              {communityList.map((post, idx) => {
                return (
                  <Link to={`/SingleCommuPage/${post.num}`} className="flex">
                    <div key={idx} className="w-[200px]">
                      <img
                        src={post.image}
                        className="card-img-top rounded-xl h-[170px] w-full"
                      />
                      <div className="card-body">
                        <h5 className="card-title h-[50px] line-clamp-2 truncate">{post.title}</h5>
                        <hr />
                        <p className="card-text">{post.writer}</p>
                        <hr />
                        <p className="card-text truncate">{post.content}</p>
                        <a className="card-link">
                          <h5 className="card-title">{post.date}</h5>
                        </a>
                        <hr />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center bg-white  py-[40px]">
            <div style={{ width: "100%" }}>
              <table class="table-auto" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th class="border px-4 py-2 w-[15%]">No.</th>
                    <th class="border px-4 py-2 w-[50%]">제목</th>
                    {/* <th class="border px-4 py-2 w-[20%]">작성자</th> */}
                    <th class="border px-4 py-2 w-[35%]">작성날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {noticList.map((notice, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? "bg-slate-100" : ""}`}
                    >
                      <td className="text-center border px-4 py-2">{notice.num}</td>
                      <td
                        className="border px-4 py-2 cursor-pointer"
                        onClick={() =>
                          navigater(`/SingleNoticPage/${notice.num}`)
                        }
                      >
                        {notice.title}
                      </td>
                      <td className="text-center border px-4 py-2">{notice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;