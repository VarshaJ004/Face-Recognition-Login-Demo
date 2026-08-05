import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1>Face Recognition Login Demo</h1>

      <button
        onClick={() => navigate("/register")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Register Face
      </button>

      <br />

      <button
        onClick={() => navigate("/login")}
        style={{
          margin: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Login with Face
      </button>
    </div>
  );
}

export default Home;