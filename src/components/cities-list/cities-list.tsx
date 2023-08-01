import { Link } from 'react-router-dom';
import { CitiesNames } from '../../const';
import { MouseEvent } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { changeCity } from '../../store/action';

export function CititesList() {
  const cityName = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  const handleCityClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const city = evt.currentTarget.dataset.city;
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {CitiesNames.map((city) => (
        <li className="locations__item" key={city} data-city={city} onClick={handleCityClick}>
          <Link className={`locations__item-link tabs__item ${city === cityName ? 'tabs__item--active' : ''}`} to="#">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
