import withApollo from 'next-with-apollo';
import { createUploadLink } from 'apollo-upload-client';
import {
  from,
  ApolloProvider,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  FieldMergeFunction,
  FieldFunctionOptions,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// Types
import { Capsules, CapsulesVariables } from 'api/capsules/types/Capsules';
// Constants
import { NEXT_PUBLIC_API_HOST } from 'constants/api';

// using "Capsules" & "CapsulesVariables" types as an example of a regular paginated query
const merge: FieldMergeFunction<
  Capsules,
  Capsules,
  FieldFunctionOptions<CapsulesVariables>
> = (existing, incoming, { args }) => {
  const existingEntities = existing?.capsules || [];
  const incomingEntities = incoming?.capsules || [];
  const result = [...existingEntities, ...incomingEntities];

  if (args && !args?.offset) {
    // Initial fetch or refetch
    return incoming;
  }

  // Pagination
  return {
    ...incoming,
    entities: result,
  };
};

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.log(`[GraphQL error]: ${message}`);
    });
  }

  if (networkError) {
    const errorMessage =
      typeof networkError === 'string'
        ? networkError
        : JSON.stringify(networkError);

    console.log(`[Network error]: ${errorMessage}`);
  }
});

export default withApollo(
  ({ initialState, headers, ctx }) => {
    // graphql config
    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers: operationHeaders = {} }) => {
        return {
          headers: {
            ...operationHeaders,
          },
        };
      });

      return forward(operation).map((response) => {
        // redirect to original slug if backend send a redirect slug value
        if (!process.browser) {
          const context = operation.getContext();
          const {
            response: { headers },
          } = context;
          const redirectUrl = headers.get('redirectslug');
          const errors = response?.errors;

          if (errors && redirectUrl) {
            ctx?.res?.writeHead(301, { Location: redirectUrl }).end();

            // return empty object to avoid graphql error
            return {};
          }
        }

        return response;
      });
    });

    const customHeadersLink = new ApolloLink((operation, forward) => {
      const customHeaders = {};

      // Pass client headers when doing ssr
      if (!process.browser) {
        const userAgent = headers?.['user-agent'];
        const xClientIp =
          headers?.['x-forwarded-for'] || ctx?.req?.socket.remoteAddress;

        userAgent && (customHeaders['user-agent'] = userAgent);
        xClientIp && (customHeaders['x-client-ip'] = xClientIp);
      }

      operation.setContext(({ headers: operationHeaders = {} }) => ({
        headers: {
          ...customHeaders,
          ...operationHeaders,
        },
      }));

      return forward(operation);
    });

    const httpUploadLink = createUploadLink({
      uri: NEXT_PUBLIC_API_HOST,
    });

    const link = from([errorLink, customHeadersLink, authLink, httpUploadLink]);

    return new ApolloClient({
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-first',
        },
      },
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              capsules: {
                keyArgs: [
                  'order',
                  ['id', 'type', 'landings', 'original_launch'],
                  'sort',
                  ['acceding', 'descending'],
                  'offset',
                  'limit',
                  'find',
                  [
                    'id',
                    'landings',
                    'mission',
                    'original_launch',
                    'reuse_count',
                    'status',
                    'type',
                  ],
                ],
                merge,
              },
            },
          },
        },
      }).restore(initialState || {}),
      link,
    });
  },
  {
    render: function renderWithApollo({ Page, props }) {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
