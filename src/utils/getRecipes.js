import axios from 'axios';

// type Query = { ingredients: string[], page: number };
// type Recipe = { title: String, href: String, ingredients: String[], thumbnailUrl: String };
//function getRecipies(query: Query): Promise<Recipe[]>
function getRecipes(query) {
  return new Promise(async (resolve, reject) => {
    const queryString = `i=` + query.ingredients.join() + `&&p=` + query.page;
    try {
      const response = await axios(
        `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?` +
          queryString,
        {
          timeout: 5000
        }
      );
      if (response.status === 200) {
        const recipiesWithSplitIngredients = response.data.results.map(r => ({
          ...r,
          ingredients: r.ingredients.split(',').map(i => i.trim())
        }));
        const sortedRecipes = recipiesWithSplitIngredients
          .map(r => ({ ...r, title: r.title.trim() }))
          .sort((a, b) => compareByTitle(a, b));
        console.log(recipiesWithSplitIngredients, sortedRecipes);
        return resolve(sortedRecipes);
      } else {
        return reject('Request failed');
      }
    } catch (error) {
      return reject('Timeout');
    }
  });
}

function compareByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export default getRecipes;
