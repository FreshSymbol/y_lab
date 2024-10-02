import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import AuthTool from '../../containers/auth-tool';
import ProfileInfo from '../../components/profile-info';

function Profile() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo />
    </PageLayout>
  );
}

export default memo(Profile);
