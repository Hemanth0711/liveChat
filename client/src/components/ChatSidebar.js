
function ChatSidebar({child}) {
  return (
    <aside className="column is-2 is-hidden-mobile has-background-light has-text-black">
      {child}
    </aside>
  );
}

export default ChatSidebar;
