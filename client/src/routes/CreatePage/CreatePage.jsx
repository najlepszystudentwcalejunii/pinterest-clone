import { Image as IKImage } from "@imagekit/react";
import "./CreatePage.css";

import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/Editor/Editor";
import useEditorStore from "../../utils/editorStore";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";

const sendForm = async (formData) => {
  const res = await api.post("/pins", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const navigate = useNavigate();
  const formRef = useRef();
  const { textOptions, canvasOptions } = useEditorStore();

  const mutation = useMutation({
    mutationFn: sendForm,
    onSuccess: ({ data }) => {
      navigate(`/pin/${data._id}`);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImage({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      mutation.mutate(formData);
    }
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? (
        <Editor imagePreview={previewImage} />
      ) : (
        <div className="createBottom">
          {previewImage.url ? (
            <div className="preview">
              <img src={previewImage.url} />
              <div onClick={() => setIsEditing(true)} className="editIcon">
                <IKImage src="/general/edit.svg" />
              </div>
            </div>
          ) : (
            <>
              <label className="upload" htmlFor="file">
                <div className="uploadTitle">
                  <IKImage src="/general/upload.svg" />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high quality .jpg files less than 20MB or
                  .mp4 files less than 200MB
                </div>
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </>
          )}

          <form className="createForm" ref={formRef}>
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                type="text"
                placeholder="Add a description"
                name="description"
                id="description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Dont&apos;t worry people won&apos;t see your tags</small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default CreatePage;
