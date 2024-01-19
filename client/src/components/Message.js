import React, { memo } from 'react';
import { useMessagesDispatch } from '../contexts/MessagesContext';

function Primary({ data: { user, text, time, up, down, voted } }) {
  const dispatch = useMessagesDispatch();

  const handleUpvote = () => {
    if (!voted) {
      dispatch({ type: 'upvote', key: 0 });
      // Set voted to true to indicate that the user has voted
      // You may need to update your state accordingly
    }
  };

  const handleDownvote = () => {
    if (!voted) {
      dispatch({ type: 'downvote', key: 0 });
      // Set voted to true to indicate that the user has voted
      // You may need to update your state accordingly
    }
  };

  return (
    <div className="column is-12 is-paddingless primary">
      <strong className="is-block">{user}</strong>
      <div className="text">
        {text}
        <time className="is-block has-text-right">{time}</time>
      </div>
      <div>
        <button onClick={handleUpvote}>Up</button>
        <button onClick={handleDownvote}>Down</button>
      </div>
      <p>{up} {down}</p>
    </div>
  );
}


function Information({ data: { user, text } }) {
  return (
    <div className="column is-12 has-text-centered is-paddingless">
      <strong>{user}</strong> {text}
    </div>
  );
}

function Secondary({ data: { user, text, time } }) {
  return (
    <div className="column is-12 has-text-right is-paddingless is-clearfix secondary">
      <strong className="is-block">{user}</strong>
      <div className="text is-pulled-right">
        {text}
        <time className="is-block has-text-right">{time}</time>
      </div>
    </div>
  );
}

function Message({ data }) {
  console.log('refresh:' + Math.random());
  switch (data.type) {
    case 'primary':
      return <Primary data={data} />;
    case 'information':
      return <Information data={data} />;
    case 'secondary':
      return <Secondary data={data} />;
    default:
      return <>Grrr</>;
  }
}

export default memo(Message);
