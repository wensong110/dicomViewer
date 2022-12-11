import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OHIF from '@ohif/core';

const { DicomLoaderService } = OHIF.utils;

class ImageViewport extends Component {
  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
    viewportData: PropTypes.object,
    activeViewportIndex: PropTypes.number,
    setViewportActive: PropTypes.func,
  };

  state = {
    byteArray: null,
    rawPng: false,
    error: null,
  };

  static id = 'ImageViewportPDF';
  componentDidUpdate(prevProps, prevState) {
    const { displaySet, studies } = this.props.viewportData;
    if (this.props.viewportData != prevProps.viewportData) {
      DicomLoaderService.findDicomDataPromise(displaySet, studies).then(
        data => {
          this.setState({ byteArray: data });
        },
        error => {
          this.setState({ error });
          throw new Error(error);
        }
      );
    }
  }
  componentDidMount() {
    const { displaySet, studies } = this.props.viewportData;
    DicomLoaderService.findDicomDataPromise(displaySet, studies).then(
      data => {
        this.setState({ byteArray: data });
      },
      error => {
        this.setState({ error });
        throw new Error(error);
      }
    );
  }
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  render() {
    const {
      setViewportActive,
      viewportIndex,
      activeViewportIndex,
    } = this.props;
    const { byteArray, error, rawPng } = this.state;
    let imgURI = '';
    if (byteArray) {
      imgURI =
        'data:image/png;base64,' +
        encodeURIComponent(this.arrayBufferToBase64(byteArray));
    }

    // const { id, init, destroy } = OHIFDicomPDFViewport;
    // const pluginProps = { id, init, destroy };

    return (
      <div style={{ height: '100%' }}>
        <img src={imgURI} style={{ height: '100%' }}></img>
      </div>
    );
  }
}

export default ImageViewport;
