import { useEffect, useState } from "react";
import "./chat.css";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  onValue,
  off,
  remove,
  get,
} from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import OnlineUsersCounter from "./onlineUserCount";
import Swal from "sweetalert2";

function Layout() {
  const [chats, setChats] = useState([]); //{name:"user1",message:"Msg 1"},{name:"Dummy",message:"Msg 1"}
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const params = useParams();
  const [meetingId, setMeetingId] = useState(""); // State to store meeting ID
  const [isCreated, setIsCreated] = useState(false);
  const [isMeetingActive, setIsMeetingActive] = useState(true); // Default to true
  const [members, setMembers] = useState([]); // State to store members
  const [myMembers, setMyMembers] = useState([]);
  const [countOfMembers, setCountOfMembers] = useState(1);
  const nav = useNavigate();
  var highMember = 0;
  useEffect(() => {
    setIsCreated(sessionStorage.getItem("isCreated"));
    var temp = sessionStorage.getItem("isCreated");
    if (temp == "true") {
      const db = getDatabase();
      const meetingStatusRef = ref(db, `meetings/${meetingId}/status`);
      set(meetingStatusRef, "active");
      // console.log(meetingStatusRef);
      setIsCreated(true);
    } else {
      setIsCreated(false);
    }
    // console.log("hook :" + isCreated);

    // sessionStorage.setItem("")
    setMeetingId(params.meetingId);
    // setMeetingId(params.meetId)
    // setName(params.xyz);
    setName(sessionStorage.getItem("username"));
  }, [isCreated, name]);
  const db = getDatabase();
  const chatListRef = ref(db, `meetings/${meetingId.toString()}/chats`);

  useEffect(() => {
    const db = getDatabase();
    const chatListRef = ref(db, `meetings/${meetingId}/chats`);
    const MeetingList = ref(db, `meetingsList`);

    onChildAdded(chatListRef, (snapshot) => {
      const chatData = snapshot.val();
      setChats((prevChats) => [...prevChats, chatData]);
      updateHeight();
    });
    const meetingStatusRef = ref(db, `meetings/${meetingId}/status`);
    onValue(meetingStatusRef, (snapshot) => {
      const status = snapshot.val();
      if (status === "ended") {
        setIsMeetingActive(false);
      }
    });

    return () => {
      // Clean up listeners when component unmounts
      off(chatListRef, "child_added");
      off(meetingStatusRef);
    };
  }, [meetingId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform actions before the page is unloaded (e.g., save data, display a confirmation message)
      // You can call your specific function here
      if (isCreated) {
        const chatListRef = ref(db, `meetings/${meetingId}`);
        remove(chatListRef).then(() => {
          Swal.fire("Chats are not saved", "", "info");
          nav("/dashboard");
        });
      } else {
        const MemberCountRef = ref(db, `meetings/${meetingId}/membercount`);

        get(MemberCountRef).then((snap) => {
          if (snap.exists()) {
            const count = snap.val();
            // if(count > highMember){
            //   highMember = count;
            // }
            const countRef = set(MemberCountRef, count - 1);
          } else {
            set(MemberCountRef, 1);
          }
        });
        nav("/dashboard");
      }
      isCreated ? endMeeting() : leaveMeeting(); // Replace 'yourFunction' with the name of your function to be called
      // Optionally, return a custom message to prompt the user
      event.returnValue = "Are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function sendChat() {
    if (msg.trim() === "") return;

    const db = getDatabase();
    const chatListRef = ref(db, `meetings/${meetingId}/chats`);
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    setMsg("");
  }
  function endMeeting() {
    Swal.fire({
      title: "Do you want to end Meeting?",
      showDenyButton: true,
      // showCancelButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const db = getDatabase();
        const meetingStatusRef = ref(db, `meetings/${meetingId}/status`);
        setMyMembers();
        set(meetingStatusRef, "ended");
        Swal.fire({
          title: "Do you want to save the chat of meeting?",
          showDenyButton: true,
          // showCancelButton: true,
          showCancelButton: false,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            await saveMeeting();
            nav("/dashboard");
          } else if (result.isDenied) {
            Swal.fire("Chats are not saved", "", "info");
          }
        })
        .then(async () => {
          const chatListRef = ref(db, `meetings/${meetingId}`);
          await remove(chatListRef).then(() => {
            nav("/dashboard");
          });
        })
      }
    });
  }

  function saveMeeting() {
    const db = getDatabase();
    const sourceRef = ref(db, `meetings/${meetingId}/chats`);
    // const destinationPath = `storedmeetings/${meetingId}/chats`;
    // const destinationRef = ref(db, destinationPath);
    get(sourceRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Data exists at the source path
          const currentDatetime = new Date().toISOString();
          // sessionStorage.setItem("startDate",currentDatetime);
          const data = snapshot.val();
          const TotalMemberCountRef = ref(
            db,
            `meetings/${meetingId}/Totalmembercount`
          );
          console.log(
            "::::::::::::::::::::::: " + TotalMemberCountRef.toString()
          );
          get(TotalMemberCountRef).then((snap) => {
            // if (snap.exists()) {
            const count = snap.val();
            console.log("snap " + snap.val());
            setMyMembers(count);
            console.log("get hm : " + count);
            // }
            console.log("highmember : " + highMember);
            return fetch("https://chatapi-sgoo.onrender.com/storechat", {
            // fetch("http://localhost:3030/storechat", {
              method: "POST",
              body: JSON.stringify({
                data,
                meetingId,
                name,
                id: sessionStorage.getItem("userID"),
                count,
                startDatetime: sessionStorage.getItem("startDate"),
                endDatetime: currentDatetime,
              }),
              headers: { "content-type": "application/json" },
            })
              .then((response) => response.json())
              // .then((result) => {
              //   console.log("Fetch result: ", result);
              // })
              // .then(() => {
              //   const chatListRef = ref(db, `meetings/${meetingId}`);
              //   remove(chatListRef).then(() => {
              //     nav("/dashboard");
              //   });
              // })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          });
        } else {
          console.log("No data found at the source path.");
        }
      })
      .catch((error) => {
        console.error("Error reading data from source path:", error);
      });
  }

  function leaveMeeting() {
    const memberKey = sessionStorage.getItem("memberKey");
    const MemberListRef = ref(db, `meetings/${meetingId}/members/${memberKey}`);
    // const confirmed = window.confirm("Are you sure you want to leave?");
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      // showCancelButton: true,
      showCancelButton: false,
      confirmButtonText: "Stay",
      denyButtonText: `Leave`,
    }).then((result) => {
      if (!result.isConfirmed) {
        remove(MemberListRef)
          .then(() => {
            // Navigate to the dashboard after successful removal
            const MemberCountRef = ref(db, `meetings/${meetingId}/membercount`);
            get(MemberCountRef).then((snap) => {
              if (snap.exists()) {
                const count = snap.val();
                const countRef = set(MemberCountRef, count - 1);
              } else {
                set(MemberCountRef, 1);
              }
            });
            nav("/dashboard");
          })
          .catch((error) => {
            console.error("Error removing user from meeting:", error);
          });
      }
    });
  }
  // useEffect(() => {
  //   const MemberListRef = ref(db, `meetings/${meetingId}/members`);
  //   // setMembers([]);
  //   onValue(MemberListRef, (snapshot) => {
  //     // console.log(snapshot.val())
  //     const memberData = snapshot.val();
  //     console.log("Member data : "+memberData)
  //     setMembers((members) => [...members, memberData]);
  //   });
  //   console.log("member list : " + members);

  //   members.forEach((member) => {
  //     console.log(member);
  //   });
  //   Object.keys(members).forEach((key) => {
  //     var temp = members[key];
  //     setMyMembers(...members, temp);
  //     console.log(key + ": " + members[key]);
  //   });
  //   console.log("My members : " + myMembers);
  // }, [countOfMembers]);
  // const [myMembers, setMyMembers] = useState([]);

  useEffect(() => {
    const MemberListRef = ref(db, `meetings/${meetingId}/members`);
    onValue(MemberListRef, (snapshot) => {
      const memberData = snapshot.val();
      if (memberData) {
        // Convert object to array of objects (assuming each member is an object)
        const membersArray = Object.values(memberData);
        setMembers(membersArray);
      }
    });
    console.log("members : " + members);
  }, [db, meetingId, countOfMembers]);

  useEffect(() => {
    const MemberCountRef = ref(db, `meetings/${meetingId}/membercount`);

    // Listen for changes in member count using onValue
    const unsubscribe = onValue(MemberCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const count = snapshot.val();
        setCountOfMembers(count); // Update countOfMembers
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe(); // Unsubscribe from the listener to avoid memory leaks
    };
  }, [meetingId]);

  useEffect(() => {
    if (!isMeetingActive && !isCreated) {
      nav("/dashboard");
    }
  }, [isMeetingActive, nav]);

  const formattedChat = chats.map((c, index) => (
    <div
      key={index}
      className={`chatcontainer ${c.name === name ? "me" : "other"}`}
    >
      <div className="chatBubble">
        {c.name !== name && <strong>{c.name}:&nbsp;&nbsp;</strong>}
        <span>{c.message}</span>
      </div>
    </div>
  ));

  const formattedMember = members.map((c, index) => {
    if (index === members.length - 1) {
      return (
        <li>
          <button class="dropdown-item" type="button">
            <div className="d-flex px-2">
              <div
                className="bg-success"
                style={{
                  borderRadius: "50%",
                  height: "7px",
                  width: "7px",
                  margin: "10px 0px",
                  marginLeft: "-10px",
                  marginRight: "10px",
                }}
              ></div>
              <div>{c}</div>
            </div>
          </button>
        </li>
      );
    }
    return (
      <li className="border-bottom">
        <button class="dropdown-item" type="button">
            <div className="d-flex px-2">
              <div
                className="bg-success"
                style={{
                  borderRadius: "50%",
                  height: "7px",
                  width: "7px",
                  margin: "10px 0px",
                  marginLeft: "-10px",
                  marginRight: "10px",
                }}
              ></div>
              <div>{c}</div>
            </div>
          </button>
      </li>
    );
  });
  function updateHeight() {
    const el = document.getElementById("chats");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed
    if (e.key === "Enter") {
      // console.log("Enter key pressed");
      // Call the sendChat function
      sendChat();
    }
  };
  // <div className="header">
  //         <div className="row">
  //           <div className="myCol-1 col-10">
  //             <div className="row">
  //               <div className="col">Welcome to chat : {name}</div>
  //             </div>
  //             <div className="row">
  //               <div className="col h6 mt-2">Meeting ID : {meetingId}</div>
  //             </div>
  //           </div>
  //           <div className="col-1 mt-0">
  //             <button
  //               className="btn btn-dark text-white mt-0 dropdown-toggle"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //             >
  //               <div className="col">Members</div>
  //               <div className="col">{countOfMembers}</div>
  //             </button>
  //             <ul className="dropdown-menu dropdown-menu-end">{formattedMember}</ul>
  //           </div>
  //           <div className="myCol-2 col">
  //             <div className="row">
  //               <div className="col">
  //                 {isCreated ? (
  //                   <button
  //                     className="exit_btn"
  //                     onClick={() => {
  //                       endMeeting();
  //                       sessionStorage.setItem("isCreated", false);
  //                     }}
  //                   >
  //                     {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> */}
  //                     <span>End meeting</span>
  //                   </button>
  //                 ) : (
  //                   <button
  //                     className="exit_btn"
  //                     onClick={() => {
  //                       leaveMeeting();
  //                       sessionStorage.setItem("isCreated", false);
  //                     }}
  //                   >
  //                     {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> */}
  //                     <span>Leave meeting</span>
  //                   </button>
  //                 )}
  //               </div>
  //             </div>
  //             <div className="row online_count">
  //               <div className="col">Online:</div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  return (
    <>
      <div className="screen">
        <div className="header">
          <div className="row">
            <div className="myCol-1 col-9">
              {/* <div className="row bg-danger"> */}
              <span className="me-3">{name}</span>
              <span
                className="h6 mt-2 my-auto py-1 px-2 rounded"
                style={{ backgroundColor: "#3366ff" }}
              >
                Meeting ID : {meetingId}
              </span>
              {/* </div> */}
            </div>
            <div className="col">
              <span className="mt-0 ms-4 me-5">
                <button
                  className="btn text-white mt-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "#3366ff" }}
                >
                  <div className="row">
                    <div className="col">Members ({countOfMembers} online)</div>
                  </div>
                  {/* <div className="col">{countOfMembers}</div> */}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {formattedMember}
                </ul>
              </span>
              {/* <div className="col"> */}
              {/* <div className="row"> */}
              <span>
                {isCreated ? (
                  <button
                    className="exit_btn"
                    onClick={() => {
                      endMeeting();
                      sessionStorage.setItem("isCreated", false);
                    }}
                  >
                    {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> */}
                    <span>End meeting</span>
                  </button>
                ) : (
                  <button
                    className="exit_btn"
                    onClick={() => {
                      leaveMeeting();
                      sessionStorage.setItem("isCreated", false);
                    }}
                  >
                    {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> */}
                    <span>Leave meeting</span>
                  </button>
                )}
                {/* </div> */}
                {/* </div> */}
              </span>
            </div>
          </div>
        </div>
        <div className="mycontainer chat" id="chats">
          {formattedChat}
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter message"
            value={msg}
            onInput={(e) => {
              setMsg(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
          <button
            className="mybtn btn btn-primary"
            onClick={() => {
              sendChat();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

function Name(props) {
  if (props.temp != "me") {
    return <strong>{props.c.name}:&nbsp;&nbsp;</strong>;
  } else {
    return <></>;
  }
}
export default Layout;
