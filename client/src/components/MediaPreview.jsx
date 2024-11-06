// ./components/MediaPreview.jsx
import PropTypes from "prop-types";

export default function MediaPreview({ files }) {
  return (
    <div className="flex flex-wrap gap-4 overflow-y-auto max-h-40">
      {files.map((file, index) => (
        <div key={index} className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
          {file.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="uploaded media"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover"
              controls={false}
              muted
            ></video>
          )}
        </div>
      ))}
    </div>
  );
}

MediaPreview.propTypes = {
  files: PropTypes.array.isRequired,
};
