
const Persons = ({ numbersToShow, handleRemove }) => {
  return (
    <ul>
      {numbersToShow.map(person =>
        <li key={person.id}>
          <span>{person.name} {person.number}</span>
          <button onClick={() => handleRemove(person.id)}>Delete</button>
        </li>
      )}

    </ul>
  );
};

export default Persons;