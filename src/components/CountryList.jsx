/* eslint-disable react/prop-types */
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';

export default function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner/>;

  const countries = cities.reduce((arr, city) => !arr.map((el) => el.country).includes(city.country) ? [...arr, {country: city.country, emoji : city.emoji}] : arr, [] );

  if (!cities.length) return <Message message="Add your first City"/>

  return (
    <ul className={styles.countryList} >
      {countries.map((country) => <CountryItem country={country} key={country.id}/>)}
    </ul>
  )
}
