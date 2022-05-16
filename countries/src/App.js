import { useEffect, useState } from "react";
import Filter from "./Filter";
import Results from "./Results";

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(r => r.json()).then(v => setCountries(v));
  }, []);

  const countriesToShow = search === ''
    ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search));
  return (
    <div>
      <Filter search={search} setSearch={setSearch} />
      {search !== '' && <Results countries={countriesToShow} />}
    </div>
  );
}

export default App;
