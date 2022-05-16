
const Filter = ({ search, setSearch }) => {
  return (
    <p>
      Find countries
      <input value={search} onChange={e => setSearch(e.target.value)} />
    </p>
  );
};

export default Filter;