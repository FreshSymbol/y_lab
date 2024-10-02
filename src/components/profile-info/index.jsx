import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useSelector from '../../hooks/use-selector';

function ProfileInfo() {
  const cn = bem('ProfileInfo');
  const { t } = useTranslate();

  const select = useSelector(state => ({
    name: state.auth.profile.name,
    phone: state.auth.profile.phone,
    email: state.auth.email,
  }));

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile.title')}</h2>
      <p className={cn('text')}>
        {t('profile.name')}:<span className={cn('accent')}> {select.name}</span>
      </p>
      <p className={cn('text')}>
        {t('profile.phone')}:<span className={cn('accent')}> {select.phone}</span>
      </p>
      <p className={cn('text')}>
        email: <span className={cn('accent')}> {select.email}</span>
      </p>
    </div>
  );
}

export default memo(ProfileInfo);
