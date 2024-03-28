import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
// import "./signup.css";
import "animate.css";
function Signup() {
    const nav = useNavigate();
  return (
    <>
      <div className={styles.myBody}>
        <div
          // className="animate__fadeInLeft"
          class={styles.enterHeader}
        >
          Welcome , "Name"
        </div>
        <div className={styles.Con}>
          <div className={styles.mytitle}>Enter your email</div>
          <input type="email" class={styles.input} placeholder="Email" />
          <div className="btn joinBtn">Get OTP</div>
          <input type="email" class={styles.input} placeholder="Enter your OTP" />
          <div className="btn createBtn" onClick={
            ()=>{
                nav("/createacc");
            }
          }>Submit</div>
          {/* <div className="btn createBtn">
                    Create chat
                </div> */}
        </div>
      </div>
    </>
  );
}
export default Signup;
