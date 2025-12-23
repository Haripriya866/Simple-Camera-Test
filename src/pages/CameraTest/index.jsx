import React, { Component } from 'react';

import './index.css'

class CameraTest extends Component {
  state = {
    stream: null,
    cameraStatus: 'idle',
    statusMessage: ''
  };

  videoRef = React.createRef();
  streamRef = React.createRef();

  goHome = () => {
    this.props.history.push('/');
  };

  startCamera = async () => {
    try {
      this.setState({
        cameraStatus: 'requesting',
        statusMessage: 'Requesting camera permission...'
      });
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 300 }, height: { ideal: 300 }, facingMode: 'user' }
      });
      
      this.streamRef.current = mediaStream;
      this.setState({
        stream: mediaStream,
        cameraStatus: 'allowed',
        statusMessage: 'Live camera preview active'
      });
      
    } catch (error) {
      console.error('Camera access error:', error);
      this.setState({ cameraStatus: 'denied' });
      
      if (error.name === 'NotAllowedError') {
        this.setState({
          statusMessage: 'Camera access denied. Please enable camera permissions and refresh.'
        });
      } else if (error.name === 'NotFoundError') {
        this.setState({
          statusMessage: 'No camera found. Please connect a camera or enable it.'
        });
      } else {
        this.setState({
          statusMessage: `Camera error: ${error.message}`
        });
      }
    }
  };

  stopCamera = () => {
    if (this.streamRef.current) {
      this.streamRef.current.getTracks().forEach(track => track.stop());
      this.streamRef.current = null;
    }
    
    this.setState({
      stream: null,
      cameraStatus: 'stopped',
      statusMessage: 'Camera stopped'
    });
  };

  handleRetry = () => {
    this.setState({
      cameraStatus: 'idle',
      statusMessage: ''
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.stream && this.videoRef.current && 
        prevState.stream !== this.state.stream) {
      this.videoRef.current.srcObject = this.state.stream;
      this.videoRef.current.play().catch(console.error);
    }
  }

  componentWillUnmount() {
    if (this.streamRef.current) {
      this.streamRef.current.getTracks().forEach(track => track.stop());
    }
  }

  render() {
    const { cameraStatus, statusMessage } = this.state;

    return (
      <div className="camera-test-container">
        <h1 className='camera-test-heading'>Camera Test</h1>
        
        <div className={`status ${cameraStatus}`}>
          {statusMessage}
        </div>

        {cameraStatus === 'allowed' && (
          <div className="video-container">
            <video 
              ref={this.videoRef}
              className="video-preview"
              muted
              playsInline
            />
          </div>
        )}

        <div className="button-group">
          {cameraStatus === 'idle' && (
            <button className="camera-test-button" onClick={this.startCamera}>
              Start Camera Test
            </button>
          )}

          {cameraStatus === 'requesting' && (
            <button className="btn btn-disabled primary requesting-permission-button" disabled>
              Requesting permission...
            </button>
          )}

          {(cameraStatus === 'allowed' || cameraStatus === 'requesting') && (
            <button className="camera-test-button" onClick={this.stopCamera}>
              Stop Camera
            </button>
          )}

          {(cameraStatus === 'denied' || cameraStatus === 'stopped') && (
            <>
              <button className="camera-test-button retry-button" onClick={this.handleRetry}>
                Retry
              </button>
              <button className="camera-test-button" onClick={this.goHome}>
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default CameraTest; 
