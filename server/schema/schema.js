const { projects, clients } = require('../schema/sampledata.js')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

// ClientType
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString },
        email: {type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
        }
        }),
});


//root query object
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        //get all projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            }
        },
        //get a single project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        //Get all clients
        clients: {
          type: new GraphQLList(ClientType),
          resolve(parent, args) {
            return clients;
          }
        },
        //get a single client
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return clients.find(client => client.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})