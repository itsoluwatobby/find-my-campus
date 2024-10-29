import { TokenModel } from "../models/index.js";

class TokenRepository {
  async createToken(token) {
    if (await TokenModel.exists({ email: token.email }))
      await this.deleteToken(token.email);
    return TokenModel.create(token);
  }

  async findTokenByEmail(email) {
    return TokenModel.findOne(email)
  }

  async deleteToken(email) {
    return TokenModel.deleteOne({ email });
  }
}
export const tokenRepository = new TokenRepository();
