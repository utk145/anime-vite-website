<!-- Notes for globalContext.jsx file -->

1. useReducer:

    - The useReducer hook is a built-in React hook that provides a way to manage state in functional components using a reducer function.
    - It is an alternative to using the useState hook when managing complex state or state transitions.
    - useReducer takes two arguments: the reducer function and the initial state.

2. Reducer Function:

    - The reducer function accepts two arguments: the current state and an action object. It evaluates the action type and returns a new state based on the action.
    - In the provided code, the reducer function is defined using a switch statement to handle different action types.
    - It returns a new state object based on the action type, using the spread operator to copy existing state properties and update specific properties.
3. Initial State:

    - The initial object represents the initial state of the application. It includes various properties such as popular, upcoming, airing, pictures, isSearch, searchResults, and loading.
    - This initial state object is used as the second argument for the useReducer hook.
4. GlobalContext:

    - The GlobalContext is created using the createContext function from React. It provides a context object to share state between components.
    - The GlobalContextProvider component is responsible for providing the state and actions to its child components via the context.

5. Actions:

    - Action types are defined as constants (LOADING, SEARCH, POPULAR_ANIME, UPCOMING_ANIME, AIRING_ANIME) to represent different actions that can be dispatched to the reducer.
    - In the provided code, only the LOADING and POPULAR_ANIME actions are handled in the reducer, but you can add more actions as needed.
    getPopularAnime Function:
    
    - This function is an asynchronous function that fetches popular anime data from the Jikan API and updates the state using the dispatch function.
    - It dispatches the LOADING action to set the loading state to true before making the API call.
    - After fetching the data, it dispatches the POPULAR_ANIME action along with the retrieved data to update the state with the fetched popular anime.
6. useEffect:

    - The useEffect hook is used to trigger the getPopularAnime function when the component mounts ([] is the dependency array, indicating that the effect should only run once).
    - This effect ensures that the popular anime data is fetched and updated in the state when the component is first rendered.
7. useGlobalContext:
    
    - This is a custom hook that simplifies accessing the context values within components.
    - It returns the context value from the GlobalContext using the useContext hook.
    Overall, the code demonstrates how to use useReducer to manage state in a React application. The reducer function handles different actions to update the state, and the GlobalContextProvider component provides the state and actions to its child components through the GlobalContext.








Here's a comparison between useReducer and useState to understand their usage:

1. useState:

    - useState is a built-in React hook used to manage state in functional components.
    - It provides a way to declare a state variable and a function to update that variable within the component.
    - The state is typically updated by calling the update function returned by useState.
    - Example usage: const [count, setCount] = useState(0);
    - `count` represents the state variable, and setCount is the update function.

2. useReducer:
    
    - useReducer is also a built-in React hook used to manage state in functional components.
    - It provides a more powerful state management solution for complex state transitions.
    - useReducer accepts a reducer function and an initial state value.
    - The reducer function takes the current state and an action as arguments and returns a new state.
    - Example usage: const [state, dispatch] = useReducer(reducer, initialState);
    - `state` represents the current state, and dispatch is the function used to dispatch actions.

3. When to use useState:
    
    - useState is suitable for managing simple state or state that doesn't involve complex transitions or logic.
    - It is ideal for handling independent state values or state that requires minimal computation.
    - useState is more straightforward and easier to use when the state updates are straightforward and don't require extensive logic.

4. When to use useReducer:
    
    - useReducer is recommended when state transitions involve complex logic or have multiple possible actions.
    - It is useful when you have interdependent state values or need to update multiple state properties together.
    - useReducer provides a centralized way to handle state updates and can make the code more organized and maintainable in complex scenarios.
    - It is especially useful when you have a large state object or when state transitions involve a series of actions.

5. Pros of useReducer:
    
    - It simplifies complex state management by separating state transitions into a reducer function.
    - It helps avoid deeply nested callbacks or prop drilling that can occur with useState.
    - It provides a structured approach for handling complex state updates and improves code readability.
6. Cons of useReducer:
    
    - It can be overkill for managing simple state or state updates that don't involve complex logic.
    - It may introduce additional complexity and boilerplate code for simple use cases.
    - Understanding and implementing a reducer function may require a learning curve compared to useState.

In summary, useState is suitable for simple state management, while useReducer is recommended for more complex state transitions and logic. Consider the complexity and requirements of your state management to choose the appropriate hook for your specific use case.