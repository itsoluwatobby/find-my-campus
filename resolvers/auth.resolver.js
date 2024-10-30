import { GraphQLError } from "graphql";
import {
  tokenRepository,
  userRepository,
} from "../repository/index.js";
import { helper, TokenContext } from "../utils/index.js";


class AuthenticationResolver {
  async register(_, args) {
    const { user } = args;
    
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await userRepository.createUser(user);

    const genToken = helper.generateToken();
    const token = await tokenRepository.createToken(
      {
        ...genToken,
        email: user.email,
        context: TokenContext.AccountActivation,
      },
    );

    // send token to user email
    return newUser;
  }

  async login(_, args) {
    const { credential } = args;

    const user = await userRepository.findUserByEmail(credential.email, true);
    await user.validatePassword(credential.password);
    
    user.generateAccessToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    );
    user.isLoggedIn = true;
    await user.save();

    return user;
  }

  async logout(_, args) {
    const user = await userRepository.findUser(args.id);

    user.isLoggedIn = false;
    user.accessToken = '';
    await user.save();

    return 'Logout successful';
  }
  
  async forgotPassword(_, args) {
    const user = await userRepository.findUserByEmail(args.email);
    if (!user) throw new Error('User not found');

    const genToken = helper.generateToken();
    const token = await tokenRepository.createToken(
      {
        ...genToken,
        email: user.email,
        context: TokenContext.PasswordReset,
      },
    );

    return token;
  }

  async updatePassword(_, args) {

  }

  // # AUTH
  async activateAccount(_, args) {
    const { activation } = args;
    const getToken = await tokenRepository.findTokenByEmail(activation.email)
    if (!getToken)
    throw new GraphQLError('Token not found', {
      extensions: { code: 'NOT FOUND' },
    })
    
    const user = await userRepository.findUserByEmail(activation.email);
    if (user.isAccountActive) return user;
    
    getToken.verifyToken(activation.token, TokenContext.AccountActivation);
    getToken.isTokenExpired();

    user.isAccountActive = true;
    await user.save();

    return user;
  }
}
export const authenticationResolver = new AuthenticationResolver();
