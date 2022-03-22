import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { Page } from 'app/next';
import { useLayoutContext } from 'context/layout.context';
import Button from 'components/common/Button';
import random from 'utils/random';

const DevPage: Page = () => {
  const { header } = useLayoutContext();

  useEffect(() => {
    header.hideHeader();

    document.title = 'boxi-extranet';

    return () => header.showHeader();
  }, [header]);

  const [socket, setSocket] = useState(null);

  const handleConnect = async () => {
    fetch('/api/socket').finally(() => {
      setSocket(io());
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on('join', (msg) => {
        console.log('new message', msg);
      });
    }
  }, [socket]);

  const handleDisconnect = () => {
    socket.disconnect();

    setSocket(null);
  };

  useEffect(() => console.log('Socket', socket), [socket]);

  const handleSend = () => {
    socket.emit('join', { user: '3', content: random(11, 99) });
  };

  return (
    <div className="m-10 w-500">
      {!socket && (
        <Button className="w-1/3" onClick={handleConnect}>
          Connect
        </Button>
      )}
      {socket && (
        <div>
          <div className="flex">
            <Button className="w-1/3" onClick={handleSend}>
              Message
            </Button>
            <Button color="red" className="w-1/3" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

DevPage.layout = ({ children }) => {
  return <div className="">{children}</div>;
};

export default DevPage;
