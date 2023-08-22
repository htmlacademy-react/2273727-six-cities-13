import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchOffers } from '../../store/api-actions';

export const ErrorScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>Server is no available</p>
      <button
        onClick={() => {
          dispatch(fetchOffers());
        }}
        type="button"
      >
        Try again
      </button>
    </>
  );
};

