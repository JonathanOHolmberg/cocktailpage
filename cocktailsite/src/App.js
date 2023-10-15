import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import SearchResults from './searchresults';
import axios from 'axios';

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [randomCocktail, setRandomCocktail] = useState();
  const [showRandomCocktail, setShowRandomCocktail] = useState(true);

  const handleSearch = (searchTerm) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => {
        setSearchResult(response.data.drinks || []);
        setShowRandomCocktail(false);
      })
      .catch((error) => {
        console.error('Error searching for cocktails:', error);
      });
  };

  useEffect(() => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => {
        setRandomCocktail(response.data.drinks[0]);
      })
      .catch((error) => {
        console.error('Error fetching cocktail:', error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="bg-gray-100 p-4 border border-black rounded-lt-2xl rounded-bl-2xl">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold">Cocktail Page</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full p-4 border border-black rounded-tr-2xl rounded-br-2xl">
        {showRandomCocktail ? (
          randomCocktail && (
            <div>
              <h3 className="text-xl font-semibold">{randomCocktail.strDrink}</h3>
              <img src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} className="mt-4 rounded-lg" />
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Ingredients</th>
                    <th>Measures</th>
                  </tr>
                </thead>
                <tbody>
                  {renderIngredientsTable(randomCocktail)}
                </tbody>
              </table>
              <p className="mt-4">{randomCocktail.strInstructions}</p>
            </div>
          )
        ) : (
          <SearchResults searchResult={searchResult} />
        )}
      </div>
    </div>
  );
};

const renderIngredientsTable = (cocktail) => {
  const ingredientsAndMeasures = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (cocktail[ingredientKey] && cocktail[measureKey]) {
      ingredientsAndMeasures.push({
        ingredient: cocktail[ingredientKey],
        measure: cocktail[measureKey],
      });
    }
  }

  if (ingredientsAndMeasures.length === 0) {
    return <tr><td colSpan="2">No ingredients available for this cocktail.</td></tr>;
  }

  return ingredientsAndMeasures.map((item, index) => (
    <tr key={index}>
      <td>{item.ingredient}</td>
      <td>{item.measure}</td>
    </tr>
  ));
};

export default App;