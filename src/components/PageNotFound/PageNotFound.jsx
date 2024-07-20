// PageNotFound.jsx
import Header from '../Header/Header';
import './PageNotFound.scss';
import pageNotFoundImage from '../../assets/PageNotFoundImages/404-PageNotFound-Robot1.jpeg'

const PageNotFound = () => {
  return (
    <>
      <Header />
      <div className="page-not-found">
        <img className="cfh-page-not-found" src={pageNotFoundImage} alt="Page Not Found" height={200} width={200}/>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </>
  );
};

export default PageNotFound;
