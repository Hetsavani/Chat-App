import { useState } from "react";
import styles from "./signup.module.css";
import "animate.css";
import { useNavigate } from "react-router-dom";
function CreateAcc() {
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:3030/add";
  // Function to handle form submission
  const passwordCheck = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      var con = document.getElementById("Con1");
      con.style.height = "80vh";
    } else {
      var con = document.getElementById("Con1");
      con.style.height = "75vh";
      // Passwords match, handle further actions (e.g., send data to server)
      // console.log('Password:', password);
      // console.log('Confirm Password:', confirmPassword);
      setError("");
      addUser({ email: email, password: password, username: user });
    }
    function addUser(data) {
      console.log("Point 1")
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
        })
        .then((res) => {

        });
        nav('/');
    }
  };
  return (
    <>
      <div className={styles.myBody}>
        <div
          // className="animate__fadeInLeft"
          class={styles.enterHeader}
        >
          Welcome , "Name"
        </div>
        <div
          id={"Con1"}
          className={styles.Con}
          style={{ height: "75vh", marginTop: "5%", animation: "none" }}
        >
          <form onSubmit={passwordCheck}>
            <div className={styles.mytitle}>Enter your Details</div>
            <label
              style={{
                textAlign: "center",
                margin: "10px 0 10px 0",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Enter email :
            </label>
            <input
              type="email"
              class={styles.input}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              style={{
                textAlign: "center",
                margin: "10px 0 10px 0",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Enter your Password:
            </label>
            <input
              type="password"
              class={styles.input}
              placeholder="Enter your Password"
              style={{
                marginBottom: "10px",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              class={styles.input}
              placeholder="Confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // passwordCheck();
              }}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <label
              style={{
                textAlign: "center",
                margin: "10px 0 10px 0",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Enter your Username:
            </label>
            <input
              type="text"
              class={styles.input}
              placeholder="Enter UserName"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <button type="submit" className={"btn "+styles.createBtn}>
              Create Account
            </button>
            {/* <div className="btn createBtn">
                    Create chat
                </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateAcc;
