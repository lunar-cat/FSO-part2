import { useState } from "react";
import Country from "./Country";
import Weather from "./Weather";

const CountryItem = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p>{country.name.common}</p>
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {
        show &&
        <>
          <Country name={country.name.common} area={country.area}
            capital={country.capital[0]} flag={country.flags.png}
            languages={country.languages} />
          <Weather capital={country.capital[0]} />
        </>
      }
    </div>
  )
};

const Results = ({ countries }) => {
  if (countries.length === 1) {
    const foundCountry = countries[0];
    return (
      <>
        <Country name={foundCountry.name.common} area={foundCountry.area}
          capital={foundCountry.capital[0]} flag={foundCountry.flags.png}
          languages={foundCountry.languages} />
        <Weather capital={foundCountry.capital[0]} />
      </>
    );
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else {
    return (
      countries.map(country => <CountryItem key={country.name.common} country={country} />)
    );
  }
};

export default Results;