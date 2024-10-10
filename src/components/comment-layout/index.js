import { memo } from 'react';
import CommentForm from '../comment-form';
import Comment from '../comment';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import CommentSign from '../comment-sign';

function CommentLayout({
  parentId = '',
  comments = [],
  count = 0,
  isAuth = false,
  t = text => text,
  onAddComment = () => {},
}) {
  const cn = bem('CommentLayout');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>
        {t('comment.title')} ({count})
      </h1>
      <ul className={cn('list')}>
        {comments.map(item => (
          <Comment
            key={item._id}
            parentId={parentId}
            item={item}
            isAuth={isAuth}
            t={t}
            onAddComment={onAddComment}
          />
        ))}
      </ul>
      {isAuth ? (
        <CommentForm t={t} onAddComment={onAddComment} parentId={parentId} />
      ) : (
        <CommentSign t={t} />
      )}
    </div>
  );
}

CommentLayout.propTypes = {
  parentId: PropTypes.string,
  comments: PropTypes.array,
  count: PropTypes.number,
  isAuth: PropTypes.bool,
  t: PropTypes.func,
  onAddComment: PropTypes.func,
};

export default memo(CommentLayout);
