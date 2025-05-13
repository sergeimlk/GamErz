import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from './logger';
import { FRONT_URL } from '../constants/env';

export interface SocketUser {
  userId: string;
  socketId: string;
}

class SocketManager {
  private io: SocketIOServer | null = null;
  private connectedUsers: Map<string, string> = new Map();

  initialize(httpServer: HttpServer): SocketIOServer {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: FRONT_URL,
        credentials: true
      }
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      socket.on('authenticate', (userId: string) => {
        this.connectedUsers.set(userId, socket.id);
        logger.info(`User ${userId} authenticated with socket ${socket.id}`);
        
        socket.on('join-saloon', (saloonId: string) => {
          socket.join(saloonId);
          logger.info(`Socket ${socket.id} joined saloon ${saloonId}`);
        });
        
        socket.on('leave-saloon', (saloonId: string) => {
          socket.leave(saloonId);
          logger.info(`Socket ${socket.id} left saloon ${saloonId}`);
        });
      });

      socket.on('disconnect', () => {
        for (const [userId, socketId] of this.connectedUsers.entries()) {
          if (socketId === socket.id) {
            this.connectedUsers.delete(userId);
            logger.info(`User ${userId} disconnected (socket ${socket.id})`);
            break;
          }
        }
      });
    });

    return this.io;
  }

  sendMessageToSaloon(saloonId: string, event: string, data: any): void {
    if (!this.io) {
      logger.error('Socket.IO server not initialized');
      return;
    }
    
    this.io.to(saloonId).emit(event, data);
  }

  sendMessageToUser(userId: string, event: string, data: any): void {
    if (!this.io) {
      logger.error('Socket.IO server not initialized');
      return;
    }
    
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.io.to(socketId).emit(event, data);
    } else {
      logger.info(`User ${userId} not connected, message not sent`);
    }
  }

  broadcastMessage(event: string, data: any): void {
    if (!this.io) {
      logger.error('Socket.IO server not initialized');
      return;
    }
    
    this.io.emit(event, data);
  }

  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  getIO(): SocketIOServer | null {
    return this.io;
  }
}

export default new SocketManager();
