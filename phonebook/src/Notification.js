
const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  };
  const typeClass = type === 'error' ? 'error' : 'success';
  return (
    <div className={`notification ${typeClass}`}>
      {message}
    </div>
  );
};

export default Notification;