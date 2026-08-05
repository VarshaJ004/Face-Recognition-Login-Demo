import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

function FaceLogin() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      console.log("✅ Models Loaded");

      startLogin();
    };

    loadModels();

    const startLogin = () => {
      setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4
        ) {
          const detection = await faceapi
            .detectSingleFace(
              webcamRef.current.video,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) return;

          const savedUser = JSON.parse(
            localStorage.getItem("registeredUser")
          );

          if (!savedUser) return;

          const savedDescriptor = new Float32Array(
            savedUser.descriptor
          );

          const distance = faceapi.euclideanDistance(
            detection.descriptor,
            savedDescriptor
          );

          console.log("Distance:", distance);

          if (distance < 0.5) {
            alert("✅ Login Successful");

            navigate("/dashboard");
          }
        }
      }, 1000);
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Login with Face</h1>

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={500}
      />
    </div>
  );
}

export default FaceLogin;