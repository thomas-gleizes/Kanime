import { LayoutProps } from 'app/types';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import ErrorBoundary from 'components/layouts/errors/ErrorBoundary';

interface AdminLayoutProps extends LayoutProps {}

const AdminLayout: Component<AdminLayoutProps> = ({ children, exception }) => {
  return (
    <ErrorBoundary exception={exception}>
      <DefaultLayout pageProps={undefined}>
        <div className="absolute left-0 top-0 pt-header w-[200px] h-full">
          <div className="w-full bg-stone-200 shadow border-r border h-full"></div>
        </div>
        <div className="ml-[200px]">{children}</div>
      </DefaultLayout>
    </ErrorBoundary>
  );
};

export default AdminLayout;
