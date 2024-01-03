import io from 'socket.io-client';
import { REACT_APP_SERVER_ENPOINT } from "@env";

const socket = io(`${REACT_APP_SERVER_ENPOINT}`, {
    autoConnect: false
});

export default socket;