import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

function RegisterFace() {
  const webcamRef = useRef(null);
  const imageRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

      console.log("✅ Models Loaded");

      startDetection();
    };

    loadModels();

    const startDetection = () => {
      setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4
        ) {
          const detection = await faceapi.detectSingleFace(
            webcamRef.current.video,
            new faceapi.TinyFaceDetectorOptions()
          );

          if (detection) {
            console.log("😊 Face Detected");
          } else {
            console.log("❌ No Face");
          }
        }
      }, 1000);
    };
  }, []);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    console.log("📸 Image Captured");
  };

  const registerFace = async () => {
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!capturedImage) {
      alert("Please capture your face first.");
      return;
    }

    const detection = await faceapi
      .detectSingleFace(
        imageRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("Face not detected.");
      return;
    }

    const user = {
      name: name,
      descriptor: Array.from(detection.descriptor),
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    console.log(user);

    alert("✅ Face Registered Successfully!");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>Register Face</h1>

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width={500}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button
        onClick={captureImage}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Capture Face
      </button>

      <br />
      <br />

      {capturedImage && (
        <div>
          <h3>Captured Image</h3>

          <img
            ref={imageRef}
            src={capturedImage}
            alt="Captured Face"
            width="300"
          />

          <br />
          <br />

          <button
            onClick={registerFace}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Register Face
          </button>
        </div>
      )}
    </div>
  );
}

export default RegisterFace;