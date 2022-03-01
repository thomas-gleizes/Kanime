import React, { useEffect } from 'react';

import { Page } from 'app/next';
import { useLayoutContext } from 'context/layout.context';
import { Input } from 'components/common/inputs';

const DevPage: Page = () => {
  const { header } = useLayoutContext();

  useEffect(() => {
    header.hideHeader();

    return () => header.showHeader();
  }, [header]);

  const options = (
    <>
      <option>value 1</option>
      <option>value 2</option>
      <option>value 3</option>
      <option>value 4</option>
    </>
  );

  return (
    <>
      <div className="border flex flex-col space-y-2.5 mx-auto w-550 py-4 px-5 shadow-lg shadow-amber-100 bg-amber-50 rounded">
        <div>
          <h1 className="text-center text-lg">Input</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <Input type="text" iSize="xl" />
          <Input type="text" iSize="lg" />
          <Input type="text" />
          <Input type="text" iSize="sm" />
          <Input type="text" iSize="xs" />
        </div>
        <div className="flex py-2 flex-col space-y-2">
          <Input type="select" iSize="xl">
            {options}
          </Input>
          <Input type="select" iSize="lg">
            {options}
          </Input>
          <Input type="select">{options}</Input>
          <Input type="select" iSize="sm">
            {options}
          </Input>
          <Input type="select" iSize="xs">
            {options}
          </Input>
        </div>
        <div className="flex py-2 flex-col space-y-2">
          <Input type="textarea" iSize="xl" />
          <Input type="textarea" iSize="lg" />
          <Input type="textarea" />
          <Input type="textarea" iSize="sm" />
          <Input type="textarea" iSize="xs" />
        </div>

        <div className="flex py-2 flex-col space-y-2">
          <Input type="text" disabled={true} placeholder="Disabled" />
          <Input type="text" invalid={true} placeholder="invalid" />
          <Input type="text" valid={true} placeholder="valid" />
          <Input type="select" disabled={true}>
            {options}
          </Input>
          <Input type="select" invalid={true}>
            {options}
          </Input>
          <Input type="select" valid={true}>
            {options}
          </Input>
        </div>
      </div>
    </>
  );
};

DevPage.layout = ({ children }) => {
  return <div className="m-5 p-2 border bg-teal-50 shadow">{children}</div>;
};

export default DevPage;
