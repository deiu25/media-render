import ReactPaginate from 'react-paginate';

export const PaginatedImages({ images }) {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * imagesPerPage;
  const currentImages = images.slice(offset, offset + imagesPerPage);

  return (
    <div>
      <div className="image-gallery">
        {currentImages.map((image) => (
          <img key={image.id} src={image.url} alt={image.name} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'anterior'}
        nextLabel={'următor'}
        breakLabel={'...'}
        pageCount={Math.ceil(images.length / imagesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
