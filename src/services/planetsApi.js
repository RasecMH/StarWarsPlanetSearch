const STAR_WARS_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsData = async () => {
  const response = await fetch(STAR_WARS_API_URL);
  const json = await response.json();

  return json;
};

export default getPlanetsData;
