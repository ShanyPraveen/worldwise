/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider ({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});


  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8080/cities').then((res) => res.json()).then((data) => {
      console.log(data)
      setCities(data)
      setIsLoading(false)
    }, (err) => {
      setIsLoading(false)
      alert(err)
    })
  }, []);

  async function getCity (id) {
    fetch(`http://localhost:8080/cities/${id}`).then((res) => res.json()).then((data) => {
      console.log(data)
      setCurrentCity(data)
      setIsLoading(false)
    }, (err) => {
      setIsLoading(false)
      alert(err)
    })
  }

  async function createNewCity (city) {
    try {
      const res = await fetch(`http://localhost:8080/cities/`, {
        method: 'POST',
        body: JSON.stringify(city),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const newCity = await res.json();
      setCities((cities) => [...cities, newCity])
    } catch (err) {
      setIsLoading(false)
      alert(err)
    }
  }

  async function deleteCity (id) {
    try {
      await fetch(`http://localhost:8080/cities/${id}`, {
        method: 'DELETE',
      })

      setCities((cities) => cities.filter((city) => city.id !== id))
    } catch (err) {
      setIsLoading(false)
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