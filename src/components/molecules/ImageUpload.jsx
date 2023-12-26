import { PropTypes } from "prop-types";

const ImageUpload = ({ image, imageUrl, handleChange }) => {
  return (
    <div className="image-upload">
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="uploaded-img" />
      ) : (
        <img src={image} alt="User" className="uploaded-img" />
      )}
      <input
        type="file"
        onChange={handleChange}
        name="input-file"
        className="custom-file-input"
        value={""}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  image: PropTypes.string,
  imageUrl: PropTypes.string,
  handleChange: PropTypes.func,
};

export default ImageUpload;
