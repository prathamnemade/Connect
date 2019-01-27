var mergeResolvers=require("merge-graphql-schemas");

var Login=require("./login/");
var Register=require("./register/");

const resolvers = [Login, Register];

module.exports = mergeResolvers(resolvers);