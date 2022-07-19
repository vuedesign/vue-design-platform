import { gql } from "@apollo/client";

export const INDEX_QUERY = gql`
  query {
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
  query {
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
