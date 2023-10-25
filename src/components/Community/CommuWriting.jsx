import { useLocation } from "react-router-dom";
import Header from "../../Layout/Layout";
import { useEffect, useRef, useState } from "react";
import CheckLogin from "../../util/CheckLogin";
const CommuWriting = () => {
  let location = useLocation();
  const imageInput = useRef();
  const ref = useRef();


  const url = process.env.REACT_APP_API_URL;

  // console.log(CheckLogin());
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
  const [inputImage, setInputImage] = useState(); // 사진
  const [imageSrc, setImageSrc] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputImage) {
      alert("이미지를 넣어주세요");
      return;
    } else if (!inputTitle) {
      alert("제목을 입력해주세요");
      return;
    } else if (!inputValue) {
      alert("내용을 입력해주세요");
      return;
    }

    if (ref.current) return;
    ref.current = true;

    const formData = new FormData();

    formData.append("title", inputTitle);
    formData.append("contents", inputValue);
    formData.append("image", inputImage);
    formData.append("token", localStorage.getItem("token"));

    fetch(`${url}/api/community/writing`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => window.location.replace(`/SingleCommuPage/${json}`));
  };

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const encodeFileToBase64 = (fileBlob) => {
    if (!fileBlob) return

    setInputImage(fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
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
            {/* 이미지 불러오기 */}
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              style={{ display: "none" }}
              ref={imageInput}
              onChange={(e) => encodeFileToBase64(e.target.files[0])}
            />
            <div
              className={`flex justify-center items-center h-[350px] w-full ${imageSrc ? "border-2 border-gray-200" : "border-2 border-black"
                }`}
              onClick={onCickImageUpload}
            >
              {imageSrc ? (
                <img className="h-full" src={imageSrc} alt="preview-img" />
              ) : (
                "이미지를 선택해주세요"
              )}
            </div>

            {/* 제목 */}
            <input
              type="text"
              className="py-2 px-4 rounded-xl bg-green-200 w-full outline-none resize-none"
              placeholder="제목을 입력해주세요."
              spellcheck="false"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />

            {/* 본문 */}
            <textarea
              type="text"
              className="py-2 px-4 rounded-xl bg-blue-200 w-full h-[500px] outline-none resize-none"
              placeholder="Type a message..."
              spellcheck="false"
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

export default CommuWriting;