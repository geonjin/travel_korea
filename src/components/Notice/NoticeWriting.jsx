import { useLocation } from "react-router-dom";
import Header from "../../Layout/Layout";
import { useEffect, useState } from "react";
import CheckLogin from "../../util/CheckLogin";

const NoticeWriting = () => {
  let location = useLocation();

  const url = process.env.REACT_APP_API_URL;

  // 로그인 상태 확인
  useEffect(() => {
    if (!CheckLogin()) {
      alert("로그인 후 글 작성이 가능합니다.");
      sessionStorage.setItem("pathName", location.pathname);
      window.location.replace("/login");
    }
  }, []);

  const [inputTitle, setInputTitle] = useState(""); // 제목
  const [inputValue, setInputValue] = useState(""); // 내용

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputTitle) {
      alert("제목을 입력해주세요");
      return;
    } else if (!inputValue) {
      alert("내용을 입력해주세요");
      return;
    }

    const formData = new FormData();

    formData.append("title", inputTitle);
    formData.append("contents", inputValue);

    fetch(`${url}/api/notice/writing`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => window.location.replace(`/SingleNoticPage/${json}`));
  };


  return (
    <div>
      <Header>
        <div className="py-16 h-full w-full flex-1">
          <form
            id="writingForm"
            className="space-y-3"
            onSubmit={handleFormSubmit}
          >

            {/* 제목 */}
            <input
              type="text"
              className="py-2 px-4 rounded-xl bg-green-200 w-full outline-none resize-none"
              placeholder="제목을 입력해주세요."
              value={inputTitle}
              spellcheck="false"
              onChange={(e) => setInputTitle(e.target.value)}
            />

            {/* 본문 */}
            <textarea
              type="text"
              className="py-2 px-4 rounded-xl bg-blue-200 w-full h-[500px] outline-none resize-none"
              placeholder="Type a message..."
              value={inputValue}
              
              onChange={(e) => setInputValue(e.target.value)}
            />

            {/* 작성 버튼 */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full flex justify-end"
              >
                작성하기
              </button>
            </div>
          </form>
        </div>
      </Header>
    </div>
  );
};

export default NoticeWriting;