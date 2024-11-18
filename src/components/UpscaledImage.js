import React, { useEffect, useState } from "react";

function UpscaledImage({ src, scale = 4, alt, className }) {
  const [upscaledSrc, setUpscaledSrc] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = false; // Prevent blurring during scaling
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      setUpscaledSrc(canvas.toDataURL()); // Convert canvas to a data URL for the image source
    };
  }, [src, scale]);

  return <img src={upscaledSrc || src} alt={alt} className={className} />;
}

export default UpscaledImage;
