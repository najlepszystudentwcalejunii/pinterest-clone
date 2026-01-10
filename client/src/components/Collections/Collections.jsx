import { Image } from "@imagekit/react";
import "./Collections.css";

const Collections = () => {
  return (
    <div className="collections">
      <div className="collection">
        <Image src="/pins/pin1.jpeg" />
        <div className="collectionInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 pins - 1w</span>
        </div>
      </div>
      <div className="collection">
        <Image src="/pins/pin1.jpeg" />
        <div className="collectionInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 pins - 1w</span>
        </div>
      </div>
      <div className="collection">
        <Image src="/pins/pin1.jpeg" />
        <div className="collectionInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 pins - 1w</span>
        </div>
      </div>
      <div className="collection">
        <Image src="/pins/pin1.jpeg" />
        <div className="collectionInfo">
          <h1>Minimalist Bedrooms</h1>
          <span>12 pins - 1w</span>
        </div>
      </div>
    </div>
  );
};
export default Collections;
