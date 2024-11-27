import { gql } from "@apollo/client";

export const GET_USERS = gql`
 query GetUsers {
  getUsers {
    email
    firstName
    id
    lastName
    nationalId
    licenseNumber
    password
    phoneNumber
    role
    username
  }
}
`;
export const GET_MEDICINES = gql`
query GetMedicines {
  getMedicines {
    amount
    category
    name
    id
    description
    picture
    sideEffects
    type
  }
}
`;

export const GET_MEDICINE = gql`
 query GetMedicine($getMedicineId: ID!) {
  getMedicine(id: $getMedicineId) {
    amount
    category
    description
    id
    name
    picture
    sideEffects
    type
  }
}
`;