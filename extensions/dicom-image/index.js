import imageSOPClassHandler from './imageSOPClassHandler';
import ImageViewport from './imageViewPort';
export default {
  id: 'image-viewer',
  getSopClassHandlerModule() {
    return imageSOPClassHandler;
  },
  getViewportModule() {
    return ImageViewport;
  },
};
