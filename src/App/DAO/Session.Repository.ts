import SessionModel, { SessionDTO } from "../Model/Session.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";
import mongoose from "mongoose";

class SessionRepository extends AbstractCrudRepository<SessionDTO> {
  constructor() {
    super(SessionModel);
  }

  async createSession(session: SessionDTO): Promise<SessionDTO & { _id: mongoose.Types.ObjectId }> {
    const sessionSaved = this.model.create(session);
    return sessionSaved;
  }
}

export default SessionRepository;