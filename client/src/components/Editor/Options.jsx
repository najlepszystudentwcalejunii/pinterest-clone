import { useState } from "react";
import useEditorStore from "../../utils/editorStore";
import { HexColorPicker } from "react-colorful";
import { LANDSCAPE_SIZES, PORTRAIT_SIZES } from "../../utils/constants";

const Options = ({ imagePreview }) => {
  const {
    selectedLayer,
    setTextOptions,
    textOptions,
    canvasOptions,
    setCanvasOptions,
  } = useEditorStore();
  const [isColorPickerOpen, setIsColoPickerOpen] = useState(false);

  const originalOrientation =
    imagePreview.width < imagePreview.height ? "portrait" : "landscape";

  const handleSizeClick = (size) => {
    let newHeight;

    if (size === "original") {
      if (canvasOptions.orientation === originalOrientation) {
        newHeight = (375 * imagePreview.height) / imagePreview.width;
      }
      newHeight = (375 * imagePreview.height) / imagePreview.width;
    } else {
      newHeight = (375 * size.height) / size.width;
    }

    setCanvasOptions({
      ...canvasOptions,
      size: size.name || "original",
      height: newHeight,
    });
  };

  const handleOrientationClick = (orientation) => {
    const originalOrientation =
      imagePreview.width < imagePreview.height ? "portrait" : "landscape";

    let newHeight;
    if (orientation === originalOrientation) {
      newHeight = (375 * imagePreview.height) / imagePreview.width;
    } else {
      (375 * imagePreview.width) / imagePreview.height;
    }

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      height: newHeight,
      size: "original",
    });
  };

  return (
    <div className="options">
      {selectedLayer === "text" ? (
        <div>
          <div className="editingOption">
            <span>Font Size</span>
            <input
              type="number"
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions({
                  ...textOptions,
                  fontSize: e.target.value,
                })
              }
            />
          </div>
          <div className="editingOption">
            <span>Color</span>
            <div className="textColor">
              <div
                className="colorPreview"
                style={{
                  backgroundColor: textOptions.color,
                }}
                onClick={() => setIsColoPickerOpen((prev) => !prev)}
              />

              {isColorPickerOpen && (
                <div className="colorPicker">
                  <HexColorPicker
                    color={textOptions.color}
                    onChange={(color) =>
                      setTextOptions({
                        ...textOptions,
                        color,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="editingOption">
            <span>Orientation</span>
            <div className="orientations">
              <div
                className={`orientation ${
                  canvasOptions.orientation === "portrait" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("portrait")}
              >
                P
              </div>
              <div
                className={`orientation ${
                  canvasOptions.orientation === "landscape" ? "selected" : ""
                }`}
                onClick={() => handleOrientationClick("landscape")}
              >
                L
              </div>
            </div>
          </div>
          <div className="editingOption">
            <span>Size</span>
            <div className="sizes">
              <div
                className={`size ${
                  canvasOptions.size === "original" ? "selected" : ""
                }`}
                onClick={() => handleSizeClick("original")}
              >
                Original
              </div>
              {canvasOptions.orientation === "portrait"
                ? PORTRAIT_SIZES.map((size) => (
                    <div
                      key={size.name}
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))
                : LANDSCAPE_SIZES.map((size) => (
                    <div
                      key={size.name}
                      className={`size ${
                        canvasOptions.size === size.name ? "selected" : ""
                      }`}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
            </div>
          </div>
          <div className="editingOption">
            <span>Background color</span>
            <div className="bgColor">
              <div className="textColor">
                <div
                  className="colorPreview"
                  style={{
                    backgroundColor: canvasOptions.backgroundColor,
                  }}
                  onClick={() => setIsColoPickerOpen((prev) => !prev)}
                />

                {isColorPickerOpen && (
                  <div className="colorPicker">
                    <HexColorPicker
                      color={canvasOptions.backgroundColor}
                      onChange={(color) =>
                        setCanvasOptions({
                          ...textOptions,
                          backgroundColor: color,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Options;
