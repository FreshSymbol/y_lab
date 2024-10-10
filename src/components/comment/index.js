import { memo, useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import CommentSign from '../comment-sign';
import CommentForm from '../comment-form';
import parseDate from '../../utils/parsedDate';

function Comment({
  isAuth = false,
  item = {},
  t = text => text,
  onAddComment = () => {},
  onOpen = () => {},
}) {
  const cn = bem('Comment');
  const [isAnswer, setIsAnswer] = useState(false);

  function handleClick() {
    setIsAnswer(!isAnswer);
  }

  const margin = 30;
  const offset = {
    marginLeft: margin * item.level,
  };

  return (
    <li className={cn()} style={offset}>
      <span className={cn('name')}>{item.author?.profile?.name}</span>
      <span className={cn('date')}>{parseDate(item.dateCreate)}</span>
      <p>{item.text}</p>
      <button onClick={handleClick} className={cn('button')}>
        {t('comment.answer')}
      </button>

      {isAuth && isAnswer ? (
        <CommentForm t={t} answer onAddComment={onAddComment} parentId={item._id} />
      ) : isAnswer ? (
        <CommentSign t={t} answer onCancel={() => setIsAnswer(false)} />
      ) : null}
    </li>
  );
}

Comment.propsTypes = {
  isAuth: PropTypes.bool,
  item: {
    name: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  },
  t: PropTypes.func,
  onAddComment: PropTypes.func,
  onOpen: PropTypes.func,
};

export default memo(Comment);
