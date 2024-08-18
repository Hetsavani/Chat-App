import { useNavigate } from "react-router-dom";
import styles from "./storedChat.module.css";
import { useEffect, useState } from "react";
function StoredChat() {
  const nav = useNavigate();
  const name = sessionStorage.getItem("username");
  const apiUrl = "http://localhost:3030/getstoredmeetings";
  const userId = sessionStorage.getItem("userID");
  const [meetings, setMeetings] = useState([]);
  const [temp,settemp] = useState(false);
  useEffect(() => {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // Read the response as plain text
      })
      .then((text) => {
        if (text) {
          return JSON.parse(text); // Try to parse the response as JSON
        } else {
          throw new Error("Empty response");
        }
      })
      .then((data) => {
        setMeetings(data.pastMeetings);
        console.log(data.pastMeetings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl, userId , temp]);
  const formattedMeetings = meetings.map((item) => {
    const storedDatetime = item.startTime;
    const endDatetime = item.endTime;
    // var formattedTime;
    // if (storedDatetime) {
    // Convert the ISO date string to a Date object
    const dateObject = new Date(storedDatetime);
    const endDateObject = new Date(endDatetime);
    // Function to format the Date object to a 12-hour format
    function formatTo12Hour(date) {
      let hours = date.getHours();

      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
      const strMinutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + strMinutes + " " + ampm;
      return strTime;
    }

    // Get the date part in a human-readable format
    const startformattedDate = dateObject.toLocaleDateString();
    const endformattedDate = endDateObject.toLocaleDateString();
    // Get the time part in 12-hour format
    const startformattedTime = formatTo12Hour(dateObject);
    const endformattedTime = formatTo12Hour(endDateObject);
    console.log("hours:" + startformattedTime);
    // }
    return (
      <div className={styles.main1 + " mx-auto"}>
        <div
          className="btn"
          onClick={() => {
            sessionStorage.setItem("storedMeetingId", item.ID);
            nav("/storedchat");
          }}
        >
          <div className={styles.Con + " " + styles.meeting}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px dashed rgb(35, 11, 74)",
              }}
            >
              <div style={{ fontSize: "large" }}>Meeting ID : {item.ID}</div>
              <div>Members:{item.members}</div>
            </div>
            <div style={{ textAlign: "start" }}>Description:</div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Date : {startformattedDate}</div>
              <div>Starting time: {startformattedTime}</div>
              <div>Ending time: {endformattedTime}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.myBody}>
        <div class={styles.enter_header}>
          <div className={styles.header}>Welcome ,{name}</div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
            onClick={() => {
              nav("/dashboard");
            }}
          >
            <div className={styles.header + " h5 p-3"}>{"<<BACK"}</div>
          </button>
        </div>
        <div className={styles.myCon}>
          {/* <div className={styles.Con}> */}
          <div className={styles.mytitle} style={{ marginBottom: "10px" }}>
            Your Meetings
          </div>
          {/* </div> */}
          {/* {formattedMeetings} */}
          {formattedMeetings.length !== 0 ? (
            <>
              <div className={styles.meetingsContainer + " mx-auto"}>
                {formattedMeetings}
              </div>
              <div
                className="clearBtn btn mx-auto text-danger"
                onClick={() => {
                  fetch("http://localhost:3030/storedchat", {
                    method: "POST",
                    body: JSON.stringify({ userId,isClearAll: true}),
                    headers: { "content-type": "application/json" },
                  }).then((res) => {
                    settemp(!temp)
                  });
                }}
              >
                Clear History
              </div>
            </>
          ) : (
            <>
              <div className={styles.Con + " mx-auto " + styles.noMeetings}>
                No past-saved Meetings!
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default StoredChat;