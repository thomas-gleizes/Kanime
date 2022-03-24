import { Server } from 'socket.io';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

handler.get((req, res) => {
  // if (!res.socket.server.io) {
  //   console.log('*First use, starting socket.io');

  //   const io = new Server(res.socket.server);

  //   io.on('connection', (socket) => {
  //     console.log('a new user join');

  //     socket.on('disconnect', () => {
  //       console.log('a user logout');
  //     });

  //     socket.on('join', (content) => {
  //       console.log('message : ', content);

  //       socket.broadcast.emit('join', content);
  //     });
  //   });

  //   res.socket.server.io = io;
  // } else {
  //   console.log('socket.io already running');
  // }

  res.end();
});

export const config = {
  api: { bodyParser: false },
};

export default withSessionApi(handler);
