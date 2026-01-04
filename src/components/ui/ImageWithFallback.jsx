import { useState } from 'react';

const ImageWithFallback = ({ src, alt, className = '', fallback = '/public/placeholder-food.png', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;