import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;
export const useJobProgress = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("IDLE");

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setSocket(newSocket);
      setConnected(true);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setSocket(null);
      setConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const trackJob = useCallback(
    (jobId: string) => {
      if (!socket) {
        console.warn(
          "trackJob called before socket connection is ready",
          jobId,
        );
        return () => {};
      }

      const event = `job_update:${jobId}`;
      const handler = (data: { status: string; progress: number }) => {
        setProgress(data.progress);
        setStatus(data.status);

        if (data.status === "DONE") {
          socket.off(event, handler);
        }
      };

      socket.on(event, handler);

      return () => {
        socket.off(event, handler);
      };
    },
    [socket],
  );

  return { progress, status, trackJob, connected };
};
