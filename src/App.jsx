import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <BrowserRouter>
    <Routes>
      {/* Index === path="/" */}
      <Route index element={<Homepage/>} />
      <Route path="pricing" element={<Pricing/>} />
      <Route path="product" element={<Product />} />
      <Route path="login" element={<Login/>} />
      <Route path="app" element={<AppLayout/>} >
        {/* <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/> */}
        <Route index element={<Navigate replace to="cities"/>}/>
        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}/>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="Countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
        <Route path="form" element={<Form/>}/>
      </Route>
      <Route path=":id" element={<Product />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

