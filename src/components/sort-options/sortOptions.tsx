import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { setOffers, setSortType } from '../../store/action';
import { offers } from '../../mocks/offers';

const OPTIONS_NAMES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export function SortOptions() {
  const activeSortType = useAppSelector((state) => state.activeSortType);
  const stateOffers = useAppSelector((state) => state.offers);
  const defaultOffers = [...offers];
  const lowPriceSortedOffers = [...stateOffers].sort((a, b) => a.price - b.price);
  const highPriceSortedOffers = [...stateOffers].sort((a, b) => b.price - a.price);
  const ratingSortedOffers = [...stateOffers].sort((a, b) => b.rating - a.rating);
  const dispatch = useAppDispatch();

  const handleClick = (item: string) => {
    switch (item) {
      case 'Popular':
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

  return (
    <ul className="places__options places__options--custom places__options--opened">
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
  );
}
