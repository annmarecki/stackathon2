
import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5"
import { Rings } from 'react-loader-spinner';
import useInterval from '@use-it/interval';
import Chart from './Chart'
import Pose from './Pose';
// const ml5 = require("ml5")

  let classifier;
  const URL = "https://teachablemachine.withgoogle.com/models/-KXwaT7Hb/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";


  function PracticeRoom() {

    const videoRef = useRef();
    const [start, setStart] = useState(false);
    const [result, setResult] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
       classifier = ml5.imageClassifier(modelURL, () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setLoaded(true);
          });
      });
    }, []);

    useInterval(() => {
      if (classifier && start) {
       classifier.classify( videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          setResult(results);
          console.log(results)
        });
      }
    }, 500);

    const toggle = () => {
      setStart(!start);
      setResult([]);
    }

    return (
      <div className="container">
        <Rings
          color="#00BFFF"
          height={200}
          width={200}
          visible={!loaded}
          style={{display:'flex', justifyContent:'center', marginTop:'30px' }}
        />
        <div>
          <div>
            <video
              ref={videoRef}
              style={{ transform: "scale(-1, 1)" }}
              width="600"
              height="400"
            />
            {loaded && (
              <button onClick={() => toggle()}>
                {start ? "Stop" : "Start"}
              </button>
            )}
          </div>
          {result.length > 0 && (
            <div>
              <Chart data={result[0]} />
            </div>
          )}
        </div>
        {result.length > 0 && (
          <div>
            <Pose data={result} />
          </div>
        )}
      </div>
    );
  }

  export default PracticeRoom;
