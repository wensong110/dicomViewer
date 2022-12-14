import cornerstone from 'cornerstone-core';

export default function(element, imageId) {
  if (!imageId) {
    // Get the Cornerstone imageId
    const enabledElement = cornerstone.getEnabledElement(element);
    imageId = enabledElement.image.imageId;
  }

  // Get StudyInstanceUID & PatientID
  const {
    StudyInstanceUID,
    PatientID,
    SeriesInstanceUID,
    SOPInstanceUID,
  } = cornerstone.metaData.get('instance', imageId);

  const splitImageId = imageId.split('&frame');
  const frameIndex =
    splitImageId[1] !== undefined ? Number(splitImageId[1]) : undefined;

  const imagePath =
    frameIndex === undefined
      ? [StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID].join('_')
      : [StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, frameIndex].join(
          '_'
        );

  return {
    PatientID,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    frameIndex,
    imagePath,
  };
}
