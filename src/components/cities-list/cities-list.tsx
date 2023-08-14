import { Link } from 'react-router-dom';
import { CitiesNames } from '../../const';
import { MouseEvent, memo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setActiveCity } from '../../store/offers-process/offers-process';
import { getActiveCity } from '../../store/offers-process/selectors';

const CititesListComponent = () => {
  const cityName = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();

  const handleCityClick = (city: string) => (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(setActiveCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {CitiesNames.map((city) => (
        <li className="locations__item" key={city} onClick={handleCityClick(city)}>
          <Link className={`locations__item-link tabs__item ${city === cityName ? 'tabs__item--active' : ''}`} to="#">
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const CititesList = memo(CititesListComponent);
