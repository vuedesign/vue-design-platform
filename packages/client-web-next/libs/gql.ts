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

export const SITE_FIELDS = gql`
  fragment SitesFields on SiteListPaginated {
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
`;

export const NAVIGATION_FIELDS = gql`
  fragment NavigationsFields on NavigationListPaginated {
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
`;

export const INDEX_QUERY = gql`
  ${PROFILE_FIELDS}
  ${NAVIGATION_FIELDS}
  ${SITE_FIELDS}
  query {
    profile {
      ...UserFields
    }
    navigations {
      ...NavigationsFields
    }
    sites {
      ...SitesFields
    }
  }
`;

export const FIND_QUERY = gql`
  ${PROFILE_FIELDS}
  ${SITE_FIELDS}
  query {
    profile {
      ...UserFields
    }
    sites {
      ...SitesFields
    }
  }
`;
