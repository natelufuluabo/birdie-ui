import io from 'socket.io-client';

const socket = io('http://192.168.4.93:3000', {
    autoConnect: false
});

export default socket;