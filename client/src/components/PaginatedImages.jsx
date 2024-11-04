import { useState } from "react";
import ReactPaginate from "react-paginate";
import ImageComponent from "./LazyLoadImage";
import PropTypes from "prop-types";

export default function PaginatedImages({ images, onDelete }) {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * imagesPerPage;
  const currentImages = images.slice(offset, offset + imagesPerPage);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className="relative bg-gray-700 p-2 rounded-lg overflow-hidden"
          >
            {image.filetype.startsWith("image") ? (
              <ImageComponent src={image.url} alt={image.filename} />
            ) : (
              <video
                src={image.url}
                className="w-full h-full object-cover"
                controls={false}
                muted
              ></video>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-2 flex justify-between items-center text-sm text-white">
              <span className="max-sm:hidden">
                {image.filename.length > 10
                  ? `${image.filename.slice(0, 15)}...`
                  : image.filename}
              </span>
              <button
                onClick={() => onDelete(image.id)}
                className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(images.length / imagesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination flex justify-center mt-4 space-x-1"
        pageClassName="bg-gray-900 text-white px-3 py-1 rounded-lg cursor-pointer"
        activeClassName="bg-red-600 text-white"
        previousClassName="bg-gray-800 text-white px-3 py-1 rounded-lg cursor-pointer"
        nextClassName="bg-gray-800 text-white px-3 py-1 rounded-lg cursor-pointer"
        breakClassName="text-gray-500 px-3"
      />
    </div>
  );
}

PaginatedImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      filename: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      filetype: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
