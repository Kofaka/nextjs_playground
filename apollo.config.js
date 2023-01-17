module.exports = {
  client: {
    name: 'main-service',
    service: {
      url: 'https://api.spacex.land/graphql',
    },
    localSchemaFile: './schema.json',
    tagName: 'gql',
    includes: ['api/**/*.ts'],
  },
};
