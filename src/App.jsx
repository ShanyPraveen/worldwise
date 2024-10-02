import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import { lazy } from "react";
import { Suspense } from "react";
import SpinnerFullPage from './components/SpinnerFullPage'

const Homepage = lazy(() => import('./pages/Homepage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))


export default function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
        <Routes>
          {/* Index === path="/" */}
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={ <Protected>
            <AppLayout />
          </Protected> }>
            {/* <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="Countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path=":id" element={<Product />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}
