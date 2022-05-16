
const Country = ({ name, capital, area, languages, flag }) => {
  const languagesArray = Object.values(languages);
  return (
    <>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h4>languages:</h4>
      <ul>
        {languagesArray.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flag} alt={`${name}'s flag`}/>
    </>
  );
};

export default Country;