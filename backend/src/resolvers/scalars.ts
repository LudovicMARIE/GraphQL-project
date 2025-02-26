// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

// exports.dateTimeScalar = new GraphQLScalarType({
//   name: 'DateTime',
//   description: 'Date custom scalar type',
  
//   serialize(value) {
//     return value instanceof Date ? value.toISOString() : null;
//   },
  
//   parseValue(value) {
//     return new Date(value);
//   },
  
//   parseLiteral(ast) {
//     if (ast.kind === Kind.STRING) {
//       return new Date(ast.value);
//     }
//     return null;
//   },
// });