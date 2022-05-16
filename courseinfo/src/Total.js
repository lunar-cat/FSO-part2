const Total = ({ parts }) => {
  const total = parts.reduce((p, c) => p + c.exercises, 0);
  return (
    <b>total of {total} exercises</b>
  );
};

export default Total;