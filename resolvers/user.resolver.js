
class UserResolver {
  async user(_, args, context) {
    console.log(context)
    return userRepository.findUser(args.id);
  }

  async users() {
    return userRepository.findUsers();
  }
  
  async updateUser(_, args) {
    
  }
}
export const userResolver = new UserResolver();
