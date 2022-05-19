import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import { Select } from 'components/common/inputs';

const DevPage = () => {
  const options: [{ id: Id; label: string }] = [
    { id: 1, label: 'Montpellier' },
    { id: 2, label: 'Paris' },
    { id: 3, label: 'Toulouse' },
  ];

  const [value, setValue] = useState(options[0]);

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
      <div>
        <Select value={value} onChange={(value) => setValue(value)}>
          {options.map((option, index) => (
            <Select.Option key={index} value={option.id}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
