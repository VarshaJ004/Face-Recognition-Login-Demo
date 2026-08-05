function Home() {
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