import { Image } from "@imagekit/react";
import useEditorStore from "../../utils/editorStore";
import { useEffect, useRef } from "react";

const Workspace = ({ imagePreview }) => {
  const {
    textOptions,
    setTextOptions,
    canvasOptions,
    setCanvasOptions,
    setSelectedLayer,
  } = useEditorStore();

  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const offset = useRef({
    x: 0,
    y: 0,
  });
  const dragging = useRef(false);

  useEffect(() => {
    if (canvasOptions.height === 0) {
      const canvasHeight = (375 * imagePreview.height) / imagePreview.width;
      setCanvasOptions({
        ...canvasOptions,
        height: canvasHeight,
        orientation:
          imagePreview.height > imagePreview.width ? "portrait" : "landscape",
      });
    }
  }, [imagePreview, canvasOptions, setCanvasOptions]);

  const handleMouseUp = (e) => {
    dragging.current = false;
  };
  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };
  const handleMouseDown = (e) => {
    dragging.current = true;
    setSelectedLayer("text");
    offset.current = {
      x: e.clientX - textOptions.left,
      y: e.clientY - textOptions.top,
    };
  };
  const handleMouseLeave = (e) => {
    dragging.current = false;
  };
  return (
    <div className="workspace">
      <div
        className="canvas"
        style={{
          backgroundColor: canvasOptions.backgroundColor,
          height: canvasOptions.height,
          width: canvasOptions.width,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <img src={imagePreview?.url} />
        {textOptions.text && (
          <div
            className="text"
            style={{
              left: textOptions.left,
              top: textOptions.top,
              fontSize: `${textOptions.fontSize}px`,
            }}
            onMouseDown={handleMouseDown}
            ref={itemRef}
          >
            <input
              type="text"
              value={textOptions.text}
              onChange={(e) =>
                setTextOptions({
                  ...textOptions,
                  text: e.target.value,
                })
              }
              style={{
                color: textOptions.color,
              }}
            />
            <div
              className="deleteTextButton"
              onClick={() =>
                setTextOptions({
                  ...textOptions,
                  text: "",
                })
              }
            >
              <Image src="/general/delete.svg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Workspace;
