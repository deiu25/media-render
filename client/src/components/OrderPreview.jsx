import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import ImageComponent from "./LazyLoadImage";

export default function OrderPreview({ images, onReorder }) {
  const [customOrder, setCustomOrder] = useState(images);
  const dragIndexes = useRef({ dragIndex: null, dragOverIndex: null });

  useEffect(() => {
    setCustomOrder(images);
  }, [images]);

  const handleDragStart = (index) => {
    dragIndexes.current.dragIndex = index;
  };

  const handleDragEnter = (index) => {
    dragIndexes.current.dragOverIndex = index;
  };

  const handleDragEnd = () => {
    const { dragIndex, dragOverIndex } = dragIndexes.current;
    if (dragIndex !== dragOverIndex) {
      const updatedOrder = [...customOrder];
      const [movedImage] = updatedOrder.splice(dragIndex, 1);
      updatedOrder.splice(dragOverIndex, 0, movedImage);
      setCustomOrder(updatedOrder);
      onReorder(updatedOrder);
    }
    dragIndexes.current = { dragIndex: null, dragOverIndex: null };
  };

  if (!customOrder.length) {
    return <p className="text-gray-500 text-center">No images available for preview.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
      {customOrder.map((image, index) => (
        <div
          key={image.id}
          className="relative bg-gray-700 p-2 rounded-lg cursor-move"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        >
          {image.filetype.startsWith("image") ? (
            <ImageComponent src={image.url} alt={image.filename} />
          ) : (
            <video src={image.url} className="w-full h-full object-cover" controls={false} muted />
          )}
        </div>
      ))}
    </div>
  );
}

OrderPreview.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      filetype: PropTypes.string.isRequired,
    })
  ).isRequired,
  onReorder: PropTypes.func.isRequired,
};
