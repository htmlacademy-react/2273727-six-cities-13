import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => (
  <>
    <Helmet>
      <title>404: Not found</title>
    </Helmet>
    <h1>
      404.
      <br />
      <small>Page not found</small>
    </h1>
    <Link to="/">Go to main page</Link>
  </>
);
