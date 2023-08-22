import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { login } from '../../store/api-actions';
import { RandomCity } from '../../components/random-city-button/random-city-button';

export const Login = () => {
  const [AuthInfo, setAuthInfo] = useState({ login: '', password: '' });
  const dispatch = useAppDispatch();

  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  const isValidPassword = passwordRegex.test(AuthInfo.password);
  const isNeedDisable = !AuthInfo.login || !isValidPassword;

  const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({ ...AuthInfo, login: evt.target.value });
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({ ...AuthInfo, password: evt.target.value });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login({
      email: AuthInfo.login,
      password: AuthInfo.password,
    }));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={AuthInfo.login}
                  onChange={handleLoginChange}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={AuthInfo.password}
                  onChange={handlePasswordChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isNeedDisable}
              >
                Sign in
              </button>
              {isNeedDisable && (
                <p style={{ color: 'red' }}>
                  Password must contain at least one number and one letter
                </p>
              )}
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <RandomCity />
          </section>
        </div>
      </main>
    </div>
  );
};
