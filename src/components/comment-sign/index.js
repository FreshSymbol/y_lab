import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentSign({ t = text => text, onCancel = () => {}, answer = false }) {
  const cn = bem('CommentSign');
  const location = useLocation();

  return (
    <div className={cn({ small: answer })}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        {t('comment.link')}
      </Link>
      <p>
        , {t('comment.noSign')} {answer ? t('answer.text') : t('comment.text')}
      </p>
      {answer && (
        <button className={cn('cancel')} onClick={onCancel}>
          {t('answer.cancel')}
        </button>
      )}
    </div>
  );
}

CommentSign.propTypes = {
  onCancel: PropTypes.func,
  t: PropTypes.func,
  answer: PropTypes.bool,
};

export default memo(CommentSign);
