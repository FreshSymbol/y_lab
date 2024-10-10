import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import selectorHook from '../../hooks/use-selector';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentActions from '../../store-redux/comment/actions';
import CommentLayout from '../../components/comment-layout';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comment.comments,
      commentCount: state.comment.count,
      commentWaiting: state.comment.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id));
  }, [params._id, select.commentCount]);

  const isAuth = selectorHook(state => state.session.exists);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback(data => dispatch(commentActions.add(data), [select.commentCount])),
  };

  const comments = useMemo(() => treeToList(listToTree(select.comments)), [select.commentCount]);
  comments.shift();

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.commentWaiting}>
        <CommentLayout
          parentId={params.id}
          isAuth={isAuth}
          onAddComment={callbacks.addComment}
          comments={comments}
          count={select.commentCount}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
