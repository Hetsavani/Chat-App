import { useEffect, useState } from "react";
import "./chat.css";
import { getDatabase, ref, push, set, onChildAdded,onValue } from "firebase/database";
import { useParams } from "react-router-dom";
import OnlineUsersCounter from "./onlineUserCount";


// const OnlineUsersCounter = () => {
//   const [onlineUsers, setOnlineUsers] = useState(0);

//   useEffect(() => {
//     const database = getDatabase();
//     const presenceRef = ref(database, 'presence');

//     // Listen for changes in the 'presence' node
//     const updateOnlineUsers = (snapshot) => {
//       if (snapshot.exists()) {
//         const onlineUsersCount = Object.keys(snapshot.val()).length;
//         setOnlineUsers(onlineUsersCount);
//       }
//     };

//     onValue(presenceRef, updateOnlineUsers);

//     // Cleanup when component unmounts
//     return () => {
//       // Stop listening for changes
//       // This is important to avoid memory leaks
//       // For example, using the off() method
//     };
//   }, []); // Only run this effect once when the component mounts

//   return (
//     <>
//       {onlineUsers}
//     </>
//   );
// };


function Layout() {
  const [name, setName] = useState("");
  const params = useParams();

  useEffect(() => {
    console.log(params);
    setName(params.xyz);
  }, []);
  const db = getDatabase();
  const chatListRef = ref(db, "chats");
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      // const c = [...chats]
      // console.log(data.val())
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);

  const [chats, setChats] = useState([]); //{name:"user1",message:"Msg 1"},{name:"Dummy",message:"Msg 1"}
  const [msg, setMsg] = useState("");
  function sendChat() {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
      // ...
    });
    // const c = [...chats];
    // c.push({name,message:msg});
    // setChats(c);
    setMsg("");
  }
  const formattedChat = chats.map((c) => {
    var temp = c.name == name ? "me" : "other";
    return (
      <div className={`chatcontainer ${temp}`}>
        <div className="chatBubble">
          <Name temp={temp} c={c} />
          <span>{c.message}</span>
        </div>
      </div>
    );
  });

  function updateHeight() {
    const el = document.getElementById("chats");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
  
  return (
    <>
      <div className="screen">
        <div className="header">
          <div className="row">
            <div className="myCol-1">Welcome to chat : {name}</div>
            <div className="myCol-2">Online : </div>
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
