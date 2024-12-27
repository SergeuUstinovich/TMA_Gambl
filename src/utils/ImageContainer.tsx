import { useEffect, useState } from "react";

interface ImageContainer {
  src: string;
  alt?: string;
  className?: string;
  classNameBlur?: string;
  widthBlur: number;
  heightBlur: number;
}

function ImageContainer({
  src,
  alt,
  className,
  classNameBlur,
  widthBlur,
  heightBlur,
}: ImageContainer) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(true);
    };
    img.src = src;
  }, [src]);
  return (
    <>
      {isLoading ? (
        <img className={className} src={src} alt={alt} />
      ) : (
        <div
          className={className}
          style={{ display: isLoading ? "none" : "inline" }}
        >
          <div
            className={classNameBlur}
            style={{
              width: `${widthBlur}px`,
              height: `${heightBlur}px`,
              borderRadius: "10px",
              backgroundColor: "grey",
            }}
          />
        </div>
      )}
    </>
  );
}

export default ImageContainer;
