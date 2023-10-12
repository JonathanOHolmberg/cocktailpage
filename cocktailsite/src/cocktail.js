import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CocktailDetails = () => {
  const [cocktail, setCocktail] = useState({});

  useEffect(() => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => {
        setCocktail(response.data.drinks[0]);
      })
      .catch((error) => {
        console.error('Error fetching cocktail:', error);
      });
  }, []);

  return (
    <div>
      <h2>Today's Cocktail</h2>
      {cocktail.idDrink && (
        <div>
          <h1>{cocktail.strDrink}</h1>
          <p>{cocktail.strCategory}</p>
          <p>{cocktail.strInstructions}</p>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {renderIngredientsTable(cocktail)}
            </tbody>
          </table>
        </div>
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
    return <p>No ingredients available for this cocktail.</p>;
  }

  return ingredientsAndMeasures.map((item, index) => (
    <tr key={index}>
      <td>{item.ingredient}</td>
      <td>{item.measure}</td>
    </tr>
  ));
};

export default CocktailDetails;





