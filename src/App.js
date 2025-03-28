import { useState } from "react";
import { motion } from "framer-motion";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("./asset/image", false, /\.(png|jpe?g|svg)$/));

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="p-5 bg-green-900">
      <h2 className="text-center text-green-400 mb-5 font-bold text-2xl md:text-4xl" style={{fontFamily:'"Limelight", sans-serif'}}>Image Gallery</h2>
      <div className="flex flex-wrap justify-between gap-3">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`img-${index}`}
            className="bg-green-400 cursor-pointer rounded-lg m-2 p-1 h-32 w-36 md:h-44 md:w-40"
            whileHover={{ rotate: 10, y: 5 }}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.img
            src={selectedImage}
            alt="Full Size"
            className="max-w-xs md:max-w-3xl rounded-lg shadow-lg"
            initial={{ scale: 0.5, opacity: 0.1 }}
            animate={{ scale: 1, opacity: 1 }}// Prevent closing modal when clicking the image
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ImageGallery />
    </div>
  );
}
