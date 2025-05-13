import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_EXPIRATION_TIME, JWT_REFRESH_TIME, JWT_MAX_AGE, JWT_REFRESH_MAX_AGE, NODE_ENV } from "../../constants/env";
import SessionRepository from "../DAO/Session.Repository";
import { LoginSessionDTO, SessionDTO } from "../Model/Session.Model";
import { CookieOptions } from "express";

export default class AuthenticationService {
  constructor(
    private sessionRepository: SessionRepository
  ) {}

  async login(loginData: SessionDTO): Promise<LoginSessionDTO> {
    const session = await this.sessionRepository.createSession(loginData);

    const accessToken = jwt.sign({
        userId: session.userId,
        sessionId: session._id
      },
      JWT_ACCESS_SECRET,
      {
        audience: ["user"],
        expiresIn: JWT_EXPIRATION_TIME
      }
    );

    const refreshToken = jwt.sign(
      { sessionId: session._id },
      JWT_ACCESS_SECRET,
      {
        audience: ["user"],
        expiresIn: JWT_REFRESH_TIME
      }
    );

    return { accessToken, refreshToken }
  }

  getCookieOptions(token: string): CookieOptions {
    return {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() + (token === "accessToken" ? JWT_MAX_AGE : JWT_REFRESH_MAX_AGE)
      )
    };
  }
}
