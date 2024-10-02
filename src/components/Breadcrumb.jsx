import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../icons/index';
import './css/breadcrumb.css';

const Breadcrumb = ({ title }) => {
    const serviceTitle = title || 'Hola mundo'
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link
            to="/"
            className={`breadcrumb-link`}
          >
            Inicio
          </Link>
          <ChevronRightIcon className="breadcrumb-icon" />
        </li>
        <li className='current-link'>{serviceTitle}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;