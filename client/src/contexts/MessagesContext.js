import { createContext, useContext, useReducer } from 'react';

const MessageContext = createContext(null);
const MessageDispatchContext = createContext(null);

export function MessagesProvider({ children }) {
  const [messages, dispatch] = useReducer(messagesReducer, initialMessages);

  return (
    <MessageContext.Provider value={messages}>
      <MessageDispatchContext.Provider value={dispatch}>
        {children}
      </MessageDispatchContext.Provider>
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext)
}

export function useMessagesDispatch() {
  return useContext(MessageDispatchContext);
}

function messagesReducer(messages, action) {
  switch (action.type) {
    case 'newmessage':
      return [...messages, {
        ...action.message,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        up: 0,
        down: 0,
      }]
      case 'upvote':
        return messages.map((message, index) =>
          index === action.key
            ? { ...message, up: message.up + 1 }
            : message
        );
      case 'downvote':
        return messages.map((message, index) =>
          index === action.key
            ? { ...message, down: message.down + 1 }
            : message
        );
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

const initialMessages = [];
