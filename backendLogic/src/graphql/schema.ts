import { gql } from "apollo-server-express";


export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String! # Added password field
    phoneNumber: String!
    nationalId: String
    licenseNumber: String
    role: String! # Added role field
  }


  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
  }


  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String! # Added password field
      phoneNumber: String!
      nationalId: String
      licenseNumber: String
      role: String! # Added role argument
    ): User!
  }


  type Medicine {
    id: ID!
    name: String!
    picture: String!
    category: String!
    amount: Int!
    sideEffects: String
    type: MedicineType!
    description: String!
  }


  enum MedicineType {
    OTC
    PRESCRIPTION
  }


  type Query {
    getMedicines: [Medicine!]!
    getMedicine(id: ID!): Medicine
  }


  type Mutation {
    addMedicine(
      name: String!
      picture: String!
      category: String!
      amount: Int!
      sideEffects: String
      type: MedicineType!
      description: String!
    ): Medicine!
  }


  type Order {
    id: ID!
    patient: User!
    medicine: Medicine!
    quantity: Int!
    totalPrice: Float!
    status: OrderStatus!
  }


  enum OrderStatus {
    PENDING
    APPROVED
    COMPLETED
  }


  type Query {
    getOrders: [Order!]!
    getOrder(id: ID!): Order
  }


  type Mutation {
    placeOrder(patientId: ID!, medicineId: ID!, quantity: Int!): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
  }


  type Query {
    getCompletedOrders: [Order!]!
  }


  type Cart {
    id: ID!
    user: User!
    items: [CartItem!]!
    totalPrice: Float!
  }


  type CartItem {
    id: ID!
    medicine: Medicine!
    quantity: Int!
    price: Float!
  }


  type Query {
    getCart(userId: ID!): Cart
  }


  type Mutation {
    addToCart(userId: ID!, medicineId: ID!, quantity: Int!): Cart!
    removeFromCart(cartItemId: ID!): Cart!
    clearCart(userId: ID!): Cart!
  }
`;