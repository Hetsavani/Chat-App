// import "../signup.css";
// import "../e"
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onValue,
  off,
  get,
} from "firebase/database";
import Swal from "sweetalert2";

function DashboardPage() {
  const nav = useNavigate();
  // var isCreateClicked = false;
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [joinMeetingId, setJoinMeetingId] = useState("");
  // const[checkMeetingStatus,setCheckMeetingStatus] = useState(false);
  var name = sessionStorage.getItem("username");
  const db = getDatabase();
  const chatListRef = ref(db, `meetings`);
  onValue(chatListRef, (snapshot) => {
    const data = snapshot.val();
    // Use the data here
    console.log(data);
  });
  // useEffect(()=>{
  // const meetingStatusRef = ref(db, `meetings/${joinMeetingId}/status`);
  // onValue(meetingStatusRef, (snapshot) => {
  //   const status = snapshot.val();
  //   if (status === "ended") {
  //     alert('Meeting with provided MeetingId is not active')
  //   }else{
  //     const MemberListRef = ref(db, `meetings/${joinMeetingId}/members`);
  //     const chatRef = push(MemberListRef);
  //     set(chatRef, {
  //       name,
  //       message: "",
  //     });
  //     nav('/chat/'+joinMeetingId)
  //   }
  //   return;
  // });
  // return;
  // },[checkMeetingStatus])
  function checkMeetingStatus() {
    const meetingStatusRef = ref(db, `meetings/${joinMeetingId}/status`);
    get(meetingStatusRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const status = snapshot.val();
          if (status === "ended") {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Meeting you are trying to join is Ended",
            });
            // alert('Meeting with provided MeetingId is ended')
          } else {
            const MemberListRef = ref(db, `meetings/${joinMeetingId}/members`);
            const chatRef = push(MemberListRef);
            set(chatRef, name);
            // set(chatRef, {
            //   name,
            //   message: "",
            // });
            nav("/chat/" + joinMeetingId);
            sessionStorage.setItem("memberKey", chatRef.key);
            const MemberCountRef = ref(
              db,
              `meetings/${joinMeetingId}/membercount`
            );
            const TotalMemberCountRef = ref(
              db,
              `meetings/${joinMeetingId}/Totalmembercount`
            );
            get(MemberCountRef).then((snap) => {
              if (snap.exists()) {
                const count = snap.val();
                const countRef = set(MemberCountRef, count + 1);
              } else {
                set(MemberCountRef, 1);
              }
            });
            get(TotalMemberCountRef).then((snap) => {
              if (snap.exists()) {
                const count = snap.val();
                const countRef = set(TotalMemberCountRef, count + 1);
              }else{
                set(TotalMemberCountRef,1);
              }
            });
          }
          // Node exists, you can access its data using snapshot.val()
        } else {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Meeting you are trying to join is not active",
          });
          // alert('Meeting with provided MeetingId is not active')
          // Node does not exist, you can handle this case accordingly
        }
      })
      .catch((error) => {
        console.error("Error getting node:", error);
        // Handle error if unable to fetch data
      });
    return;
  }
  function createMeeting() {
    const MemberListRef = ref(db, `meetings/${joinMeetingId}/members`);
    const chatRef = push(MemberListRef);
    set(chatRef, name);
    const MemberCountRef = ref(db, `meetings/${joinMeetingId}/membercount`);
    const TotMemberCountRef = ref(db, `meetings/${joinMeetingId}/Totalmembercount`);
    get(MemberCountRef).then((snap) => {
      if (snap.exists()) {
        const count = snap.val();
        const countRef = set(MemberCountRef, count + 1);
      } else {
        set(MemberCountRef, 1);
      }
    });
    get(TotMemberCountRef).then((snap) => {
      if (snap.exists()) {
        const count = snap.val();
        const countRef = set(TotMemberCountRef, count + 1);
      } else {
        set(TotMemberCountRef, 1);
      }
    });
    // isCreateClicked = true;
    sessionStorage.setItem("isCreated", true);
    const currentDatetime = new Date().toISOString();
    sessionStorage.setItem("startDate",currentDatetime);
    nav("/chat/" + joinMeetingId);
  }
  const [isOpen, setIsOpen] = useState(false);
  //For profile//
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={styles.myBody}>
        <div class={styles.enter_header}>
          <div className={styles.header}>Welcome , {name}</div>
          <div className={styles.profile}>
            <button
              class={`btn ${styles.myBtnProfile}`}
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <div class="dropdown"></div> */}
            </button>
            <div
              class="dropdown-menu"
              style={{
                width: "250px",
                backgroundColor: "#CCCCCC",
                padding: "5px 5px",
              }}
              aria-labelledby="dropdownMenuButton1"
            >
              {/* <div style={{height:"80px"}}> */}
              <div
                style={{
                  padding: "5px 10px 5px 10px",
                  display: "flex",
                  borderBottom: "1px solid gray",
                  height: "70px",
                  marginBottom: "10px",
                }}
              >
                <div className={styles.detailImg}></div>
                <div style={{ textAlign: "center" }}>{name}</div>
              </div>
              {/* </div> */}
              <div style={{ height: "40px" }}>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => {
                    togglePopup();
                  }}
                >
                  Edit Profile
                </a>
              </div>
              <div style={{ height: "40px" }} onClick={
                ()=>{nav('/storedmeetings')}
              }>
                <a class="dropdown-item" href="#">
                  recent meetings
                </a>
              </div>
              <div style={{ height: "40px" }}>
                <a class="dropdown-item" href="#">
                  <div
                    style={{ color: "red" }}
                    onClick={() => {
                      sessionStorage.clear();
                      nav("/login");
                    }}
                  >
                    Logout
                  </div>
                </a>
              </div>
            </div>
            {/* <img class="profile-logo" src="../../assets/profile_img.jpg" alt="Profile Image"></img> */}
          </div>
        </div>
        <div className={styles.Con}>
          <div className={styles.mytitle}>Let's Chat</div>
          {!isCreateClicked ? (
            <div>
              <input
                type="text"
                class={styles.input}
                placeholder="Enter meeting ID"
                onChange={(e) => {
                  setJoinMeetingId(e.target.value);
                }}
              />
              <div
                // className={styles.joinBtn,styles.btn}
                className={`btn ${styles.joinBtn}`}
                onClick={() => {
                  checkMeetingStatus();
                  // setCheckMeetingStatus(!checkMeetingStatus)
                }}
              >
                Join chat
              </div>
              <div
                className={`btn ${styles.createBtn}`}
                onClick={() => {
                  setIsCreateClicked(true);
                }}
              >
                Create chat
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                class={styles.input}
                placeholder="Enter meeting ID"
                onChange={(e) => {
                  setJoinMeetingId(e.target.value);
                }}
              />
              <div
                style={{ float: "right", color: "blue", padding: " 12px 15px" }}
              >
                Create random ID
              </div>
              <div
                className={`btn ${styles.createBtn}`}
                onClick={() => {
                  createMeeting();
                }}
              >
                Create chat
              </div>
              <div
                class="btn"
                style={{
                  color: "blue",
                  marginTop: "100px",
                  padding: "0px",
                  fontSize: "15px",
                  height: "20px",
                }}
                onClick={() => {
                  setIsCreateClicked(false);
                }}
              >
                &lt; back
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <div>
            {/* Button to toggle the popup */}

            {/* Popup form */}
            {isOpen && (
              <div className={styles.popup}>
                <div className={styles.popupInner}>
                  <button className={styles.closeBtn} onClick={togglePopup}>
                    X
                  </button>
                  <div
                    style={{
                      fontSize: 30,
                      color: "darkblue",
                      fontWeight: "bold",
                      justifyContent: "center",
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    Profile
                  </div>
                  {/* Add your form elements here */}
                  <form>
                    <div className="row">
                      <div
                        className={`${styles.detailImg} col-2`}
                        style={{ float: "left" }}
                      ></div>
                      <div className="col-3" style={{ float: "left" }}>
                        {/* {name} */}
                        <input
                          className="form-label"
                          type="text"
                          value={name}
                        ></input>
                      </div>
                      {/* <div className="col justify-content-end" style={{ float: "right" }}>Edit</div> */}
                    </div>
                    <div>
                      <button type="submit" style={{ float: "left" }}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default DashboardPage;