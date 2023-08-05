import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setOffers, setSortType } from '../../store/action';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { fetchOffersAction } from '../../store/api-actions';

const OPTIONS_NAMES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export function SortOptions() {
  const [isOpened, setIsOpened] = useState(false);

  const activeSortType = useAppSelector((state) => state.activeSortType);
  const stateOffers = useAppSelector((state) => state.offers);
  const defaultOffers = [...stateOffers];
  const lowPriceSortedOffers = [...stateOffers].sort((a, b) => a.price - b.price);
  const highPriceSortedOffers = [...stateOffers].sort((a, b) => b.price - a.price);
  const ratingSortedOffers = [...stateOffers].sort((a, b) => b.rating - a.rating);
  const dispatch = useAppDispatch();

  const handleClick = (item: string) => {
    switch (item) {
      case 'Popular':
        dispatch(fetchOffersAction());
        dispatch(setSortType('Popular'));
        dispatch(setOffers(defaultOffers));
        break;
      case 'Price: low to high':
        dispatch(setSortType('Price: low to high'));
        dispatch(setOffers(lowPriceSortedOffers));
        break;
      case 'Price: high to low':
        dispatch(setSortType('Price: high to low'));
        dispatch(setOffers(highPriceSortedOffers));
        break;
      case 'Top rated first':
        dispatch(setSortType('Top rated first'));
        dispatch(setOffers(ratingSortedOffers));
        break;
    }
  };

  const handleSpanClick = (evt: MouseEvent<HTMLFormElement>) => {
    evt.stopPropagation();
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleSpanClick} >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {
          OPTIONS_NAMES.map((item) => (
            <li className={`places__option ${item === activeSortType ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={item}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </form>
  );
}
