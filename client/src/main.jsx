import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import './i18n';

// Automatically compress all uploaded images to prevent Vercel 4.5MB Payload Limit (Error 413)
const originalReadAsDataURL = FileReader.prototype.readAsDataURL;
FileReader.prototype.readAsDataURL = function (file) {
  if (file && file.type && file.type.startsWith('image/')) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 1200;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
      } else {
        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      URL.revokeObjectURL(objectUrl);
      Object.defineProperty(this, 'result', { value: dataUrl, configurable: true });
      if (typeof this.onloadend === 'function') this.onloadend({ target: this });
      if (typeof this.onload === 'function') this.onload({ target: this });
    };
    img.src = objectUrl;
    return;
  }
  return originalReadAsDataURL.call(this, file);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
