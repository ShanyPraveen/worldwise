/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../context/CitiesContext';

export default function CityItem({city}) {
  const {id, cityName, emoji, date, position} = city;

  const {currentCity, deleteCity} = useCities();

  async function handleClick (e) {
    e.preventDefault();
    await deleteCity(id)
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}` } to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time>{date}</time>
        <button onClick={handleClick} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}
