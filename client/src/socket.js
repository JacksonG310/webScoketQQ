import { io } from "socket.io-client";

const socket = io("http://192.168.13.205:5000", {
    timeout: 5000,
});

export default socket