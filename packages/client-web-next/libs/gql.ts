// import { UserEntity } from '@/entities/user.entity';
import { gql } from "@apollo/client";
export const PROFILE_FIELDS = gql`
  fragment UserFields on UserEntity {
    id
    uuid
    username
    nickname
    email
    phone
    password
    avatar
    status
    rule
  }
`;

export const INDEX_QUERY = gql`
  ${PROFILE_FIELDS}
  query {
    profile {
      ...UserFields
    }
    navigations {
      total
      list {
        id
        title
        description
        siteUrl
        iconUrl
        order
      }
      pagination {
        size
        page
      }
    }
    sites {
      total
      list {
        id
        title
      }
      pagination {
        size
        page
      }
    }
  }
`;

export const FIND_QUERY = gql`
  ${PROFILE_FIELDS}
  query {
    profile {
      ...UserFields
    }
    sites {
      total
      list {
        id
        title
      }
      pagination {
        size
        page
      }
    }
  }
`;
