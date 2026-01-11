import { Link } from "react-router";
import "./GalleryItem.css";
import { Image } from "@imagekit/react";

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;
  return (
    <div
      className="galleryItem"
      style={{
        gridRowEnd: `span ${Math.ceil(item.height / 100)}`,
      }}
    >
      <Image
        src={item.media}
        alt=""
        transformation={[
          {
            width: 372,
            height: optimizedHeight,
          },
        ]}
      />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <img src="/general/share.svg" />
        </button>
        <button>
          <img src="/general/more.svg" />
        </button>
      </div>
    </div>
  );
};
export default GalleryItem;
