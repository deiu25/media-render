import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';

function ImageComponent({ src, alt }) {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src} 
      width="100%"
      height="auto"
    />
  );
}

ImageComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageComponent;
