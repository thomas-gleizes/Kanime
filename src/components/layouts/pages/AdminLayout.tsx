import DefaultLayout from 'components/layouts/pages/DefaultLayout';

const AdminLayout: Component = ({ children }) => {
  return (
    <DefaultLayout>
      <div className="absolute left-0 top-0 pt-header w-[200px] h-full">
        <div className="w-full bg-stone-200 shadow border-r border h-full"></div>
      </div>
      <div className="ml-[200px]">{children}</div>
    </DefaultLayout>
  );
};

export default AdminLayout;
