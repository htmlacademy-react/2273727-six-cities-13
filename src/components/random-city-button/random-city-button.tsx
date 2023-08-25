import { getRandomValueFromArray } from '../../utils';
import { CitiesNames } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setActiveCity } from '../../store/offers-process/offers-process';
import { memo } from 'react';

const RandomCityComponent = () => {
  const dispatch = useAppDispatch();
  const randomCity = getRandomValueFromArray(CitiesNames);

  const handleButtonClick = () => {
    dispatch(setActiveCity(randomCity));
  };

  return (
    <div className="locations__item" data-testid="random-city-button">
      <Link className="locations__item-link" to={AppRoute.Root} onClick={handleButtonClick}>
        <span>{randomCity}</span>
      </Link>
    </div>
  );
};

export const RandomCityButton = memo(RandomCityComponent);
