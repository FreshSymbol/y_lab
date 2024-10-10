import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';

function CommentForm({ t = text => text, onAddComment = () => {}, parentId = '', answer = false }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    const text = evt.target.comment.value;
    onAddComment({
      text,
      parent: { _id: parentId, _type: answer ? 'comment' : 'article' },
    });
    evt.target.reset();
  }

  const cn = bem('CommentForm');

  return (
    <form onSubmit={handleSubmit} name={'form'} className={cn()}>
      <h1 className={cn('title')}>{t(answer ? 'answer.new' : 'comment.new')}</h1>
      <textarea className={cn('input')} name="comment" />
      <button type="submit" className={cn('button')}>
        {t('comment.submit')}
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  addComment: PropTypes.func,
  t: PropTypes.func,
  answer: PropTypes.bool,
};

export default memo(CommentForm);
