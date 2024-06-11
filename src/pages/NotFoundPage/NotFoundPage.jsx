import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <b>
        Oops Error 404!
        <br /> Page Is Not Found !
      </b>
      <Link to="/"> Back to home page</Link>
    </div>
  );
};

export default NotFoundPage;
