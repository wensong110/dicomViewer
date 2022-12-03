import VTK from '../../../../extensions/vtk';
import VTKSeg from '../../../../extensions/dicom-segmentation';
window.config = {
  extensions: [VTK, VTKSeg],
  routerBasename: '/',
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'LocalStatic',
        wadoUriRoot: '/dicomweb',
        qidoRoot: '/dicomweb',
        wadoRoot: '/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'thumbnail',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        staticWado: true,
      },
    ],
  },
};
