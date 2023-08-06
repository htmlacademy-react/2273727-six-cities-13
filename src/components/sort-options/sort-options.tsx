import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setOffers, setSortType, sortOffersByHighPrice, sortOffersByLowPrice, sortOffersByTopRated } from '../../store/action';
import { useState } from 'react';
import { MouseEvent } from 'react';
import { OfferType } from '../types/offer';

const OPTIONS_NAMES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export function SortOptions() {
  const [isOpened, setIsOpened] = useState(false);
  const activeSortType = useAppSelector((state) => state.activeSortType);
  const dispatch = useAppDispatch();
  const originalOffers = localStorage.getItem('offers');

  const handleClick = (item: string) => {
    switch (item) {
      case 'Popular':
        if (originalOffers) {
          const parsedOffers = JSON.parse(originalOffers) as OfferType[];
          dispatch(setSortType('Popular'));
          dispatch(setOffers(parsedOffers));
        }
        break;
      case 'Price: low to high':
        dispatch(setSortType('Price: low to high'));
        dispatch(sortOffersByLowPrice());
        break;
      case 'Price: high to low':
        dispatch(setSortType('Price: high to low'));
        dispatch(sortOffersByHighPrice());
        break;
      case 'Top rated first':
        dispatch(setSortType('Top rated first'));
        dispatch(sortOffersByTopRated());
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
