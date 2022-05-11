import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import EmptyLayout from 'components/layouts/pages/EmptyLayout';

const DevPage = () => {
  return (
    <div className="p-10 space-y-1">
      <div>
        <Button type="button">Click me</Button>
      </div>

      <div>
        <InputText
          onInput={(event, validatePattern) => console.log(event, validatePattern)}
        />
      </div>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
