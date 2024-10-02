/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

function reducer (state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload,
        isLoading: false
      }
    case 'city/loaded':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false
      }
    case 'cities/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload
      }
    case 'cities/deleted':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {}
      }
    case 'rejected':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default: 
      throw new Error('Unknown action type')
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function CitiesProvider ({children}) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    dispatch({type: 'loading'})
    fetch('http://localhost:8080/cities').then((res) => res.json()).then((data) => {
      dispatch({type: 'cities/loaded', payload: data})
    }, (err) => {
      dispatch({type: 'rejected', payload: err.message})
      alert(err)
    })
  }, []);

  const getCity = useCallback(async function getCity (id) {
    dispatch({type: 'loading'})

    fetch(`http://localhost:8080/cities/${id}`).then((res) => res.json()).then((data) => {
      dispatch({type: 'city/loaded', payload: data})
    }, (err) => {
      dispatch({type: 'rejected', payload: err.message})
      alert(err)
    })
  }, [])
  

  async function createNewCity (city) {
    dispatch({type: 'loading'})

    try {
      const res = await fetch(`http://localhost:8080/cities/`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const newCity = await res.json();
      dispatch({type: 'cities/created', payload: newCity})
    } catch (err) {
      dispatch({type: 'rejected', payload: err.message})
      alert(err)
    }
  }

  async function deleteCity (id) {
    dispatch({type: 'loading'})

    try {
      await fetch(`http://localhost:8080/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({type: 'cities/deleted', payload: id})
    } catch (err) {
      dispatch({type: 'rejected', payload: err.message})
      alert(err)
    }
  }

  return <CitiesContext.Provider value={{cities, isLoading, getCity, currentCity, createNewCity, deleteCity}}>
    {children}
  </CitiesContext.Provider>
}

function useCities () {
  const context = useContext(CitiesContext);

  if (!context) throw new Error('No Context found');

  return context
}

export { CitiesProvider, useCities}