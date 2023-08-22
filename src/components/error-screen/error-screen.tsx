import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchOffers } from '../../store/api-actions';

export const ErrorScreen = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    (async () => {
      await dispatch(fetchOffers());
    })();
  };

  return (
    <>
      <p>Server is not available</p>
      <button
        onClick={handleClick}
        type="button"
      >
        Try again
      </button>
    </>
  );
};

