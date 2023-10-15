import React, { useState, useEffect } from 'react';
import SearchBar from './search';
import SearchResults from './searchresults';
import axios from 'axios';

const App = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [showRandomCocktail, setShowRandomCocktail] = useState(true);

  const handleSearch = (searchTerm) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((response) => {
        setSearchResult(response.data.drinks || []);
        setSelectedCocktail(null);
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
        setSelectedCocktail(response.data.drinks[0]);
        setShowRandomCocktail(true);
      })
      .catch((error) => {
        console.error('Error fetching cocktail:', error);
      });
  }, []);

  const handleCocktailClick = (cocktail) => {
    setSelectedCocktail(cocktail);
    setShowRandomCocktail(false);
  };

  return (
    <div className="w-full h-full bg-black">
      <div className="mb-6 p-1 bg-black p-4 border border-black rounded-bl-2xl">
        <div className="p-1 bg-black grid grid-cols-3 border border-black rounded-bl-2xl">
          <div className="p-1 rounded-bl-2xl col-span-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-slate-50 tracking-wider">Cocktail Page</h2>
          </div>
        </div>
      </div>
      <div className="flex p-4 border border-black rounded-bl-2xl bg-slate-900">
        {showRandomCocktail ? (
          selectedCocktail && (
            <div className='flex flex-row'>
              <div>
                <h3 className="text-xl font-semibold bg-black text-slate-50 px-4 flex justify-center rounded-bl-2xl border border-slate-50">{selectedCocktail.strDrink}</h3>
                <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} className="mt-4 rounded-lg border border-slate-50" />
              </div>
              <div>
                <table className="m-4 mt-12 border border-black rounded-bl-2xl px-4 w-full bg-black text-slate-50 border border-slate-50">
                  <thead className="m-4 border border-black rounded-bl-2xl p-4 w-full mr-4 border border-slate-50 pr-6">
                    <tr className='mr-4'>
                      <th className="py-4 font-semibold border border-slate-50">Ingredients</th>
                      <th className="py-4 font-semibold border border-slate-50">Measures</th>
                    </tr>
                  </thead>
                  <tbody className="m-4 border border-black rounded-bl-2xl px-4 mr-4">
                    {renderIngredientsTable(selectedCocktail)}
                  </tbody>
                </table>
                <p className="mx-4 border border-black rounded-bl-2xl p-4 h-fill font-semibold bg-black text-slate-50">{selectedCocktail.strInstructions}</p>
              </div>
            </div>
          )
        ) : (
          <SearchResults searchResult={searchResult} onCocktailClick={handleCocktailClick} />
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
    <tr key={index} className='ml-2 px-4'>
      <td className='ml-2 px-4'>{item.ingredient}</td>
      <td className='ml-2 px-4'>{item.measure}</td>
    </tr>
  ));
};

export default App;