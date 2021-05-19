import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs';
import * as React from 'react'
import {  isMobile, drawKeypoints, drawSkeleton } from '../public/utils'
import utilStyles from '../styles/util.module.scss'
import styles from './styles/pose.module.scss'
import Router from 'next/router'
import axios from 'axios';


export default class PoseNet extends React.Component {
    

  static defaultProps = {
    // videoWidth: 600,
    // videoHeight: 500,
    videoWidth: 600,
    videoHeight: 750,
    algorithm: 'single-pose',
    // showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: 'aqua',
    skeletonLineWidth: 2,
    loadingText: 'Loading pose detector...',
    up : false,
    down: true
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.state = { loading: true, count : 0, stopState: false }
    this.sleep = this.sleep.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.detectPose = this.detectPose.bind(this)
    this.stopDetection = this.stopDetection.bind(this)
    this.resetDetection = this.resetDetection.bind(this)
    this.saveProgress = this.saveProgress.bind(this)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

  saveProgress(){
    const uid = firebase.auth().currentUser.uid
    axios.post('api/exercises/bicepCurls', {uid : uid, count: this.state.count})
  }

  async componentDidMount() {
    this.net = await posenet.load();
    try {
      await this.setupCamera()
    } catch(e) {
      throw 'This browser does not support video capture, or this device does not have a camera'
    } finally {
      this.setState({ loading: false })
    }
    // this.detectPose()
  }

  async setupCamera() {
      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }

    const { videoWidth, videoHeight } = this.props;
    const video = this.video
    const mobile = isMobile()

    video.width = videoWidth
    video.height = videoHeight

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? void 0 : videoWidth,
        height: mobile ? void 0: videoHeight,
      }
    });

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video metadata is ready, we can start streaming video
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    this.setState({stopState : false}, () => {
      const { videoWidth, videoHeight } = this.props
      const canvas = this.canvas
      if(this.state.stopState == false) {
      const ctx = canvas.getContext('2d')

      canvas.width = videoWidth
      canvas.height = videoHeight

      this.poseDetectionFrame(ctx)
    }});
  }

  poseDetectionFrame(ctx) {
    const {
      algorithm,
      imageScaleFactor,
      outputStride,
      minPoseConfidence,
      maxPoseDetections,
      minPartConfidence,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth,
    } = this.props

    const net = this.net
    const video = this.video
    
    const poseDetectionFrameInner = async () => {
      let poses = []

    const pose = await net.estimateSinglePose(
        video,
        imageScaleFactor,
        outputStride
    )

    poses.push(pose)


      ctx.clearRect(0, 0, videoWidth, videoHeight);

      poses.forEach(async ({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          console.log(keypoints)
          if((keypoints[10].position.y <= keypoints[6].position.y + 30 && keypoints[9].position.y <= keypoints[5].position.y + 30)){
              this.setState({up : true}, () => {
                if(this.state.up && this.state.down){
                  this.setState({count : this.state.count + 1}, () => {
                    this.setState({up:false, down: false})
                  })
              }
              })
              
          }
          if(keypoints[10].position.y >= keypoints[6].position.y + 150 && keypoints[9].position.y >= keypoints[5].position.y + 150){
            this.setState({down : true, up: false})
          }
          if (showPoints) {
            drawKeypoints(keypoints, minPartConfidence, skeletonColor, ctx);
          }
          if (showSkeleton) {
            drawSkeleton(keypoints, minPartConfidence, skeletonColor, skeletonLineWidth, ctx);
          }
        
        }
        
      })
      if(!this.state.stopState){
        requestAnimationFrame(poseDetectionFrameInner)
      }
    }
    if(!this.state.stopState){
      poseDetectionFrameInner()
    }
  }

  async onSubmit() {
    Router.push('/dashboard');
  }

  stopDetection() {
      this.setState({stopState : true});
  }

  resetDetection(){
    this.setState({stopState : true, count : 0});
  }

  render() {
    const loading = this.state.loading
      ? <text className={utilStyles.headingXl}> Please wait while we load our pose detector </text>
    //   ? <div className="PoseNet__loading">{ this.props.loadingText }</div>
      : ''
    return (
      <html className={styles.poseNet}>
      <text className={utilStyles.headingLg}> Bicep Curls </text>
      <div className={styles.row}>
        { loading }
        {/* <div className={styles.row}>
            <div className={styles.column}>
                <video className={styles.videoCam} playsInline ref={ this.getVideo } style={ {width:"100%"}} ></video>
            </div>
            <div className={styles.column}>
                <canvas className={styles.videoCam} ref={ this.getCanvas } style={{width:"100%"}}></canvas>
            </div>
        </div> */}
        <video className={styles.videoCam} playsInline ref={ this.getVideo }  ></video>
        <canvas className={styles.overlay} ref={ this.getCanvas }   ></canvas>
        
        {/* <text className={utilStyles.heading2Xl}> {this.state.count} </text> */}
            <div className={styles.box} >
                  <div className={styles.form}>
                    <p className={utilStyles.headingXl}> Track your exercise here! </p>
                   <div className={styles.innerBox}>
                   <button className={styles.button} onClick={this.detectPose}>
                      <text className={utilStyles.text}>
                        START
                      </text>
                    </button>

                    <text className={styles.text}> Count: {this.state.count} </text>
                    <div className={styles.rowButton}>
                    <button className={styles.button} onClick={this.stopDetection}>
                      <text className={utilStyles.text}>
                        STOP
                      </text>
                    </button>

                    <button className={styles.button} onClick={this.resetDetection}>
                      <text className={utilStyles.text}>
                        RESET
                      </text>
                    </button>
                    </div>

                    <div className={styles.rowButton}>
                      <button className={styles.bigbutton} onClick={this.saveProgress}>
                        <text className={utilStyles.text}> SAVE PROGRESS</text>
                      </button>
                    </div>

                    <div className={styles.rowButton}>
                      <button className={styles.bigbutton} onClick={this.saveProgress}>
                        <text className={utilStyles.text}> VIEW STATS</text>
                      </button>
                    </div>

                    <button className={styles.bigbutton} onClick={this.onSubmit} >
                      <text className={utilStyles.text}>
                        GO BACK TO DASHBOARD
                      </text>
                    </button>
                    </div> 
                   
                  </div>
            </div>
            </div>
      </html>
    )
  }
}