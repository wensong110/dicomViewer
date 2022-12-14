import log from '../log';
import studies from '../studies';
import utils from '../utils';
import { CommandsManager } from '@ohif/core';
import {
  retrieveMeasurementFromSR,
  stowSRFromMeasurements,
} from './handleStructuredReport';
import findMostRecentStructuredReport from './utils/findMostRecentStructuredReport';

/**
 *
 * @typedef serverType
 * @property {string} type - type of the server
 * @property {string} wadoRoot - server wado root url
 *
 */

/**
 * Function to be registered into MeasurementAPI to retrieve measurements from DICOM Structured Reports
 *
 * @param {serverType} server
 * @param {object} external
 * @returns {Promise} Should resolve with OHIF measurementData object
 */
const retrieveMeasurements = (server, external = {}) => {
  log.info('[DICOMSR] retrieveMeasurements');

  if (!server || server.type !== 'dicomWeb') {
    log.error('[DICOMSR] DicomWeb server is required!');
    return Promise.reject({});
  }

  const serverUrl = server.wadoRoot;
  const studies = utils.studyMetadataManager.all();

  const latestSeries = findMostRecentStructuredReport(studies);

  if (!latestSeries) return Promise.resolve({});

  return retrieveMeasurementFromSR(latestSeries, studies, serverUrl, external);
};

/**
 *  Function to be registered into MeasurementAPI to store measurements into DICOM Structured Reports
 *
 * @param {Object} measurementData - OHIF measurementData object
 * @param {Object} filter
 * @param {serverType} server
 * @returns {Object} With message to be displayed on success
 */
const storeMeasurements = async (measurementData, filter, server) => {
  log.info('[DICOMSR] storeMeasurements');

  // if (!server || server.type !== 'dicomWeb') {
  //   log.error('[DICOMSR] DicomWeb server is required!');
  //   return Promise.reject({});
  // }

  const serverUrl = server.wadoRoot;
  const firstMeasurementKey = Object.keys(measurementData)[0];
  const firstMeasurement = measurementData[firstMeasurementKey][0];
  const StudyInstanceUID =
    firstMeasurement && firstMeasurement.StudyInstanceUID;

  try {
    //await stowSRFromMeasurements(measurementData, serverUrl);
    let f = function ExportTxt(name, data) {
      const urlObject = window.URL || window.webkitURL || window;
      const export_blob = new Blob([data]);

      const save_link = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a'
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;

      const ev = document.createEvent('MouseEvents');
      ev.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(ev);
    };
    f('ok.txt', JSON.stringify(measurementData));
    if (StudyInstanceUID) {
      studies.deleteStudyMetadataPromise(StudyInstanceUID);
    }

    return {
      message: 'Measurements saved successfully',
    };
  } catch (error) {
    log.error(
      `[DICOMSR] Error while saving the measurements: ${error.message}`
    );
    throw new Error('Error while saving the measurements.');
  }
};

export { retrieveMeasurements, storeMeasurements };
