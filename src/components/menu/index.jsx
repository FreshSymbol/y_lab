import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function Menu({ menuList = [] }) {
  const cn = bem('Menu');

  return (
    <nav className={cn()}>
      {menuList.map((item, index) => {
        return (
          <Link className={cn('link')} to={item.to} key={index}>
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
}

Menu.propTypes = {
  menuList: PropTypes.array.isRequired,
};

export default memo(Menu);
