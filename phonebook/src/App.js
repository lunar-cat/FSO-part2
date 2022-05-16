import { useEffect, useState } from "react";
import Filter from "./Filter";
import Notification from "./Notification";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personsService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, []);

  const createPerson = () => {
    const newPerson = { name: newName.trim(), number: newNumber.trim() };
    personsService
      .create(newPerson)
      .then(person => setPersons(persons.concat(person)))
      .then(() => setNotification(`Added ${newName}`) && setNotificationStatus('success'))
      .catch(error => {
        console.log(error.message);
        setNotification(error.message);
        setNotificationStatus('error');
      });
  };
/*   const updatePerson = (id, person, newNumber) => {
    const updatedPerson = { ...person, number: newNumber.trim() };
    personsService
      .update(id, updatedPerson)
      .then(r => setPersons(persons.map(person => person.id === id ? updatedPerson : person)))
      .then(() => setNotification(`Updated ${person.name}`) && setNotificationStatus('success'))
      .catch(error => {
        console.log(error.message);
        setNotification(error.message);
        setNotificationStatus('error');
      });
  }; */
  const handleCreate = e => {
    e.preventDefault();
/*     const personFound = persons.find(person => person.name === newName);
    if (personFound) {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmed) updatePerson(personFound.id, personFound, newNumber);
    } else {
      createPerson();
    }; */
    createPerson();
    setTimeout(() => {
      setNotification(null);
      setNotificationStatus(null);
    }, 5000);
    setNewName('');
    setNewNumber('');
  };
  const handleRemove = id => {
    personsService.remove(id)
      .then(r => {
        if (r !== 204) throw new Error(`${r}`);
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        const person = persons.find(person => person.id === id);
        let message;
        if (error.message === "404") {
          setPersons(persons.filter(person => person.id !== id));
          message = `${person.name} was already removed from server`;
        };
        setNotification(`${message || error.message}`);
        setNotificationStatus('error');
        setTimeout(() => setNotification(null) && setNotificationStatus(null), 3000);
      });
  };
  const numbersToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationStatus} />
      <Filter filter={filter} setFilter={setFilter} />

      <PersonForm
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        handleCreate={handleCreate} />

      <h3>Numbers</h3>

      <Persons numbersToShow={numbersToShow} handleRemove={handleRemove} />
    </div>
  );
}

export default App;
