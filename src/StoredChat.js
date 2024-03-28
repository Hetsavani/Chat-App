function StoredChat(){
    return (
        <div className="screen">
        <div className="header">
          <div className="row">
            <div className="myCol-1 col-10">Welcome to chat : {name}</div>
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
                </div>
              </div>
              <div className="row online_count">
                <div className="col">Online:</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mycontainer chat" id="chats">
          {formattedChat}
        </div>
        <div className="inputs">
          <div>You cannot send message to past meeting</div>
        </div>
      </div>
    );
}
export default StoredChat;