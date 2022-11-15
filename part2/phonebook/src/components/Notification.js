const Notification = ({ message, state }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={state}>
      {message}
    </div>
  );
}

export default Notification;
