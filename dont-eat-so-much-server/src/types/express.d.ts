import { AuthUserPayload } from "src/guards/auth.guard";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}
