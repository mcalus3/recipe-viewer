export function reducer(state, action) {
  switch (action.type) {
    case actions.setIngeredients:
      const ingrdientsWithoutDuplications = [...new Set(action.payload)];
      return {
        ...state,
        queryState: queryStates.pending,
        query: { ...state.query, ingredients: ingrdientsWithoutDuplications }
      };

    case actions.setPage:
      return {
        ...state,
        queryState: queryStates.pending,
        query: { ...state.query, page: action.payload }
      };

    case actions.addIngredient:
      const ingrdientsWithoutDuplications2 = [
        ...new Set(state.query.ingredients.concat([action.payload]))
      ];
      return {
        ...state,
        queryState: queryStates.pending,
        query: {
          ...state.query,
          ingredients: ingrdientsWithoutDuplications2
        }
      };

    case actions.setRecipes:
      return { ...state, recipes: action.payload };

    case actions.setQueryState:
      return { ...state, queryState: action.payload };
  }
  return state;
}

export const actions = {
  setIngeredients: 'SET_INGREDIENTS',
  setPage: 'SET_PAGE',
  addIngredient: 'ADD_INGREDIENT',
  setRecipes: 'SET_RECIPES',
  setQueryState: 'SET_QUERY_STATE'
};

export const queryStates = {
  succesful: 'QUERY_SUCCESSFUL',
  pending: 'QUERY_PENDING',
  inProgress: 'QUERY_IN_PROGRESS',
  error: 'QUERY_ERROR'
};

export const initialState = {
  query: {
    ingredients: ['onions', 'bacon'],
    page: 1
  },
  queryState: queryStates.pending,
  recipes: [
    {
      title: '',
      href: '',
      ingredients: [''],
      thumbnail: ''
    }
  ]
};
