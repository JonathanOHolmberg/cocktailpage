import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import SearchResults from './searchresults';
import axios from 'axios';
import './App.css';

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
    <div>
      <div className="navbar">
        <div className="navbar-column">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="navbar-column">
          <h2>Cocktail Page</h2>
        </div>
        <div className="navbar-column"></div>
      </div>
      {showRandomCocktail ? (
        randomCocktail && (
          <div>
            <h3>{randomCocktail.strDrink}</h3>
            <img src={randomCocktail.strDrinkThumb} alt={randomCocktail.strDrink} />
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Measure</th>
                </tr>
              </thead>
              <tbody>
                {renderIngredientsTable(randomCocktail)}
              </tbody>
            </table>
            <p>{randomCocktail.strInstructions}</p>
          </div>
        )
      ) : (
        <SearchResults searchResult={searchResult} />
      )}
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