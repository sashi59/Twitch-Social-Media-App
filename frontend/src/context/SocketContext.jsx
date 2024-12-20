import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  const BACKEND_URL = "https://twitch-social-media-app.onrender.com" || "http://localhost:9000";

  useEffect(() => {
    if (authUser) {
      const newSocket = io(BACKEND_URL, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      // Ensure that event listeners are added only when `newSocket` is defined
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) socket.close();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
