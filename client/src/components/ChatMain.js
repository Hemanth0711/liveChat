import ChatArea from "./ChatArea";
import ChatSidebar from "./ChatSidebar";
import UserList from "./UserList";
import UpVotesList from "./UpVotesList";

function ChatMain() {
  return (
    <main className="columns">
      <ChatSidebar child={<UserList />}/>
      <ChatArea />
      <ChatSidebar child={<UpVotesList />}/>
    </main>
  );
}

export default ChatMain;
