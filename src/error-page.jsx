import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <h2> {error.status} <span>{error.statusText}</span> </h2>
      <p>
        <i style={{color: 'red'}}>{error.error.stack || error.data}</i>
      </p>
    </div>
  );
}
