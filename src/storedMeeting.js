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

function StoredChatLayout() {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const params = useParams();
  const [meetingId, setMeetingId] = useState(""); // State to store meeting ID
  const [isMeetingActive, setIsMeetingActive] = useState(true); // Default to true
  const [members, setMembers] = useState([]); // State to store members
  const [myMembers, setMyMembers] = useState([]);
  const [countOfMembers, setCountOfMembers] = useState(0);
  const apiUrl = "https://chatapi-sgoo.onrender.com/storedchat";
  const nav = useNavigate();
  useEffect(()=>{
    setName(sessionStorage.getItem('username'))
    setMeetingId(sessionStorage.getItem('storedMeetingId'))
    fetch(apiUrl,{
      method:"POST",
      body: JSON.stringify({ userId:sessionStorage.getItem('userID'), meetingId:sessionStorage.getItem('storedMeetingId') }),
      headers: { "content-type": "application/json" },
    }).then((res)=>{
      console.log(res);
      return res.json()
    }).then((res)=>{
      console.log(res);
      setChats(res.chats)
      setCountOfMembers(res.members)
    })
  },[])

  //   return () => {
  //     // Clean up listeners when component unmounts
  //     off(chatListRef, "child_added");
  //     off(meetingStatusRef);
  //   };
  // }, [meetingId]);

  // function sendChat() {
  //   if (msg.trim() === "") return;

  //   const db = getDatabase();
  //   const chatListRef = ref(db, `meetings/${meetingId}/chats`);
  //   const chatRef = push(chatListRef);
  //   set(chatRef, {
  //     name,
  //     message: msg,
  //   });
  //   setMsg("");
  // }

  // }
  // useEffect(() => {
  //   const MemberListRef = ref(db, `meetings/${meetingId}/members`);
  //   onValue(MemberListRef, (snapshot) => {
  //     const memberData = snapshot.val();
  //     if (memberData) {
  //       // Convert object to array of objects (assuming each member is an object)
  //       const membersArray = Object.values(memberData);
  //       setMembers(membersArray);
  //     }
  //   });
  //   console.log("members : " + members);
  // }, [db, meetingId, countOfMembers]);
  // useEffect(() => {
  //   const MemberCountRef = ref(db, `meetings/${meetingId}/membercount`);

  //   // Listen for changes in member count using onValue
  //   const unsubscribe = onValue(MemberCountRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const count = snapshot.val();
  //       setCountOfMembers(count); // Update countOfMembers
  //     }
  //   });

  //   return () => {
  //     unsubscribe(); // Unsubscribe from the listener to avoid memory leaks
  //   };
  // }, [meetingId]);

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
    if(index === members.length-1){
      return(
        <li>
        <button class="dropdown-item" type="button">
          {c}
        </button>
      </li>
      );
    }
    return (
      <li className="border-bottom">
        <button class="dropdown-item" type="button">
          {c}
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
      // sendChat();
    }
  };
  return (
    <>
      <div className="screen">
        {/* <div className="header">
          <div className="row">
            <div className="myCol-1 col-10">
              <div className="row">
              Welcome to chat : {name}
              </div>
              <div className="row h6 mt-3">
                You are viewing chats with ID : {meetingId}
              </div>
            </div>
            <div className="col-1 mt-0">
              <button
                className="btn btn-dark text-white mt-0 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="col">Members</div>
                <div className="col">{countOfMembers}</div>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                {formattedMember}
              </ul>
            </div>
            <div className="myCol-2 col">
              <div className="row">
                <div className="col">
                    <button
                      className="exit_btn"
                      onClick={() => {
                        sessionStorage.removeItem('storedMeetingId')
                        nav('/storedmeetings')
                        // endMeeting();
                      }}
                    >
                      {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> 
                      <span>Back</span>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
                  <button
                    className="exit_btn"
                    onClick={() => {
                      sessionStorage.removeItem('storedMeetingId')
                      nav('/storedmeetings')
                      // endMeeting();
                    }}
                  >
                    {/* <span>{isCreated?'Leave meeting':'End meeting'}</span> */}
                    <span>Back</span>
                  </button>
              </span>
            </div>
          </div>
        </div>
        <div className="mycontainer chat" id="chats">
          {formattedChat}
        </div>
        <div className="inputs" style={{borderTop:"1px solid black","justify-content":"center"}}>
          This meeting is ended.You cannot chat!
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
export default StoredChatLayout;