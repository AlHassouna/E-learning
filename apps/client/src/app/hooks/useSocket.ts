import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { getItem } from '../utils/localStorage';

interface DataSend {
}

interface AuthResponse {
  username: string;
  email: string;
}

interface SocketService {
  emit: (eventName: string, data: DataSend) => void;
  listen: (eventName: string) => Observable<string>;
  socketId: string;
}

export const useSocket = (): SocketService => {
  const [socketId, setSocketId] = useState<string>('');
  const socketRef = useRef<Socket | null>(null);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);

  useEffect(() => {
    const authResponseFromLocalStorage = getItem('token');
    const parsedAuthResponse = authResponseFromLocalStorage ? JSON.parse(authResponseFromLocalStorage) : null;
    setAuthResponse(parsedAuthResponse);
  }, []);

  useEffect(() => {
    if (authResponse) {
      socketRef.current = io('http://localhost:8000');

      socketRef.current.on('connect', () => {
        const id = socketRef.current?.id;
        setSocketId(id || '');
        emit('msgList', { username: authResponse.username, socketId: id });
      });

      socketRef.current.on('disconnect', () => {
        setSocketId('');
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [authResponse]);

  const emit = (eventName: string, dataSend: DataSend) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, dataSend);
    }
  };

  const listen = (eventName: string): Observable<string> => {
    return new Observable<string>((subscriber) => {
      socketRef.current?.on(eventName, (data: string) => {
        subscriber.next(data);
      });
    });
  };

  return { emit, listen, socketId };
};
