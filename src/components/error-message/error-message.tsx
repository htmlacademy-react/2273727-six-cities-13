import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import './error-message.css';
import * as selectors from '../../store/selectors';

export function ErrorMessage() {
  const error = useAppSelector(selectors.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}
