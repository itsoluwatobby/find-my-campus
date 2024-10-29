
export const typeDefs = `#graphql
  # SCHEMAS 
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    age: Int
    isLoggedIn: Boolean
    isAccountActive: Boolean
    isDeleted: Boolean
    accessToken: String
    role: String
    posts: [Post!]
    token: Token
    updatedAt: String
    createdAt: String
  }

  type Token {
    email: String!
    token: String!
    expiresIn: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User
    updatedAt: String
    createdAt: String
  }

  # QUERIES
  type Query {
    user(id: ID!): User
    users: [User]
    token(id: ID!): Token
    post(id: ID!): Post
    posts: [Post]
  }

  # MUTATIONS
  type Mutation {
    register(user: RegistrationMutation!): User
    login(credential: LoginMutation!): User
    updateUser(credential: UpdateUserMutation!): User
    logout(id: ID!): String
    forgotPassword(email: String!): Token
    updatePassword(pwdUpdate: UpdatePasswordMutation!): User

    # AUTH
    activateAccount(email: String!, activation: ActivateAccountMutation): User
    # deleteToken(email: String!): String
    # createToken(token: CreateTokenMutation!): Token

    # POSTS
    createPost(post: CreatePostMutation): Post
    deletePost(id: ID!): String
    updatePost(credential: UpdatePostMutation): Post
  }

  # INPUT MUTATIONS
  input RegistrationMutation {
    email: String!
    password: String!
    username: String!
  }

  # input CreateTokenMutation {
  #   email: String!
  #   token: String!
  #   expiresIn: String!
  # }
  
  input ActivateAccountMutation {
    isAccountActive: Boolean!
    token: String!
  }

  input LoginMutation {
    email: String!
    password: String!
    accessToken: String
    isLoggedIn: Boolean
  }
  
  # input LogoutMutation {
  #   accessToken: String
  #   isLoggedIn: Boolean
  # }
  
  input UpdatePasswordMutation {
    email: String!
    password: String!
    token: String!
  }
  
  input UpdateUserMutation {
    username: String
    age: Int
  }
  
  input CreatePostMutation {
    title: String!
    content: String!
  }

  input UpdatePostMutation {
    title: String
    content: String
  }

`