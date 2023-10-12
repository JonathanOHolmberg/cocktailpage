import React from 'react';

const SearchResults = ({ searchResult }) => {
  return (
    <ul>
      {searchResult.map((cocktail) => (
        <li key={cocktail.idDrink}>
          <h3>{cocktail.strDrink}</h3>
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
        </li>
      ))}
    </ul>
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

export default SearchResults;
