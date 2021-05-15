import React, {Component} from 'react'
import {
    drawConnectors,
    drawLandmarks,
} from '@mediapipe/drawing_utils/drawing_utils';

import {
    ControlPanel,
    FPS,
    StaticText,
    Slider,
    Toggle
} from '@mediapipe/control_utils/control_utils';

import { Camera } from '@mediapipe/camera_utils/camera_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose/pose';

export default class Exercise extends Component{
    constructor(props){
        super(props);

        this.onStart = this.onStart.bind(this)
        this.onResults = this.onResults.bind(this)
    }
    componentDidMount(){
        this.onStart()
    }

    async onStart(){
        const pose = new Pose({
            locateFile: (file) => {
                return `pose/${file}`;
            }
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          })

          if(typeof window == 'object'){
            const videoElement = document.getElementsByClassName('input_video')[0];
            const canvasElement = document.getElementsByClassName('output_canvas')[0];
            const canvasCtx = canvasElement.getContext('2d');
            pose.onResults(videoElement, canvasCtx);
            const camera = new Camera(videoElement, {
                onFrame: async () => {
                  await pose.send({image: videoElement});
                },
                width: 1280,
                height: 720
              });
    
              camera.start();
        }
      }

    onResults(results, canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image, 0, 0, canvasElement.width, canvasElement.height);
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                       {color: '#00FF00', lineWidth: 4});
        drawLandmarks(canvasCtx, results.poseLandmarks,
                      {color: '#FF0000', lineWidth: 2});
        canvasCtx.restore();
      }

    
    render()
    {
       
       

        
     return(
         <div>
             <body>
            <div className="container">
                <video className="input_video"></video>
                <canvas className="output_canvas" width="1280px" height="720px"></canvas>
            </div>
            </body>
         </div>
     )

    }
}