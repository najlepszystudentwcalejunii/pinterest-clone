import "./Editor.css";
import Layers from "./Layers";
import Options from "./Options";
import Workspace from "./Workspace";

const Editor = ({ imagePreview }) => {
  return (
    <div className="editor">
      <Layers imagePreview={imagePreview} />
      <Workspace imagePreview={imagePreview} />
      <Options imagePreview={imagePreview} />
    </div>
  );
};
export default Editor;
