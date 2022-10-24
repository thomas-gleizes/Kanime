import React, { useState } from 'react';

import { Page } from 'app/next';

import { commonApi } from 'api';
import { useLayoutContext } from 'context/layout.context';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import Button from 'components/common/Button';

const DevPage: Page = () => {
  const { globalLoadingPercent } = useLayoutContext();

  const [timer, setTimer] = useState<number>(1000);

  const handleClick = async () => {
    await commonApi.sleep(timer);
  };

  return (
    <div className="p-10">
      <Button onClick={handleClick}>Click me {timer}</Button>
      <div className="flex flex-col space-y-2 w-200 py-5">
        <Button className="w-fit px-8" onClick={() => setTimer(timer + 200)}>
          Up
        </Button>
        <Button className="w-fit px-8" onClick={() => setTimer(timer - 200)}>
          DOWNN
        </Button>
      </div>
      <div>
        <h1 className="text-4xl font-black">{globalLoadingPercent} %</h1>

        <div className="w-full bg-gray-200 h-2">
          <div
            style={{ width: `${globalLoadingPercent}%` }}
            className="bg-gradient-to-r from-blue-700 via-purple-700 to-amber-500 h-full transition-all duration-100"
          ></div>
        </div>
      </div>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
