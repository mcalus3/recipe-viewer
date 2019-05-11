# recipe-viewer

This is a recipe viewer. It shows you a list of recipes that contain ingredients specified by you.

# Dev documentation

**Structure**

This app is made with React and Axios libraries.

Its component structure looks like this:

App  
|--SearchBar (ingredients list input, button and status text)  
|  
|--List (header, items and pagination footer)  
....|--ListItem (name (link), ingredients list, thumbnail)

There is also a module acting as a facade for the recipes source with one method - `getRecipies(query)`. It executes a request to the _recipe puppy_ web api and returns a promise that resolves to the recipes list deserialized from response (sorted alphabetically), or error if there was any problem with fetching (timeout or error in response from the recipe puppy).

**How application state is managed?**

In the App component there is a `useEffect` hook that handles calling the `getRecipies` method (at the start and when it's requested by the user). After promise is resolved, it saves new recipies data in its state and toggles re-render of the children.

**Notes**

1. I had to enable async/await support in babel, so I installed a babel plugin. It took me a while to learn how the babel works (never done this before).

2. Turns out that the `http://www.recipepuppy.com/api` doesn't support CORS, so I made a workaround for this issue. I call it through someone's CORS proxy site, so the URL I call is now `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?`. It can't be used in production environment (the proxy is not stable, can go down or overload at any moment), the best way to solve this is to make the request from the backend and forward the data to the browser, but I don't have any backend for this app.
