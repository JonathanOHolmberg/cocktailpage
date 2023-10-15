import React, { useContext, useState } from 'react';

const SearchResults = ({ searchResult }) => {

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
      return (
        <tr>
          <td colSpan="2">No ingredients available for this cocktail.</td>
        </tr>
      );
    }

    return ingredientsAndMeasures.map((item, index) => (
      <tr key={index}>
        <td className='mx-4 px-4'>{item.ingredient}</td>
        <td className='mx-4 px-4'>{item.measure}</td>
      </tr>
    ));
  };

  return (
    <>
    <div className="grid grid-cols-1 gap-4">
      {searchResult.map((cocktail) => (
        <div
          key={cocktail.idDrink}
          className="bg-slate-50 border border-slate-50 rounded-lg p-4 flex flex-row"
          >
          <div className='flex-column'>
          <h3 className="text-lg font-semibold">{cocktail.strDrink}</h3>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-40 h-40 mt-4 rounded-lg border border-slate-50" />
          </div>
          <p>{cocktail.strCategory}</p>
          <div className='h-full w-1/2 mx-8 mt-6'>
          <p>{cocktail.strInstructions}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th className='mx-4 p-1'>Ingredient</th>
                <th className='mx-4 p-1'>Measure</th>
              </tr>
            </thead>
            <tbody>{renderIngredientsTable(cocktail)}</tbody>
          </table>
        </div>
      ))}
    </div>
    </>
  );
};

export default SearchResults;