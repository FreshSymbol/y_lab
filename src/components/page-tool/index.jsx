import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

function PageTool({ children }) {
  return <div className="PageTool">{children}</div>;
}

PageTool.propTypes = {
  children: PropTypes.node,
};

export default memo(PageTool);
