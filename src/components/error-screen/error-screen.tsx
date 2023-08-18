import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { fetchOffers } from '../../store/api-actions';

export const ErrorScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <p>Сервер недоступен</p>
      <button
        onClick={() => {
          dispatch(fetchOffers());
        }}
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
};

