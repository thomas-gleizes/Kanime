import { Server } from 'socket.io';

import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

const handler = apiHandler();

handler.get((req, res) => {
  // @ts-ignore
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    // @ts-ignore
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('a new user join');

      socket.on('disconnect', () => {
        console.log('a user logout');
      });

      socket.on('join', (content) => {
        console.log('message : ', content);

        socket.broadcast.emit('join', content);
      });
    });

    // @ts-ignore
    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }

  res.end();
});

export const config = {
  api: { bodyParser: false },
};

export default withSessionApi(handler);
