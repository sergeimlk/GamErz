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
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId

  initialize(httpServer: HttpServer): SocketIOServer {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: FRONT_URL,
        credentials: true
      }
    });

    this.io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      // Authentifier l'utilisateur et stocker son ID
      socket.on('authenticate', (userId: string) => {
        this.connectedUsers.set(userId, socket.id);
        logger.info(`User ${userId} authenticated with socket ${socket.id}`);
        
        // Rejoindre les salons de l'utilisateur
        socket.on('join-saloon', (saloonId: string) => {
          socket.join(saloonId);
          logger.info(`Socket ${socket.id} joined saloon ${saloonId}`);
        });
        
        // Quitter un salon
        socket.on('leave-saloon', (saloonId: string) => {
          socket.leave(saloonId);
          logger.info(`Socket ${socket.id} left saloon ${saloonId}`);
        });
      });

      // Gérer la déconnexion
      socket.on('disconnect', () => {
        // Trouver et supprimer l'utilisateur déconnecté
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

  // Envoyer un message à un salon spécifique
  sendMessageToSaloon(saloonId: string, event: string, data: any): void {
    if (!this.io) {
      logger.error('Socket.IO server not initialized');
      return;
    }
    
    this.io.to(saloonId).emit(event, data);
  }

  // Envoyer un message à un utilisateur spécifique
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

  // Diffuser un message à tous les utilisateurs connectés
  broadcastMessage(event: string, data: any): void {
    if (!this.io) {
      logger.error('Socket.IO server not initialized');
      return;
    }
    
    this.io.emit(event, data);
  }

  // Vérifier si un utilisateur est connecté
  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Obtenir l'instance Socket.IO
  getIO(): SocketIOServer | null {
    return this.io;
  }
}

// Singleton pour être accessible partout dans l'application
export default new SocketManager();
