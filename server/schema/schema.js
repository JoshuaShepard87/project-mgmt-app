// const { projects, clients } = require('../schema/sampledata.js');

//mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql');

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
                return Client.findById(parent.clientId);
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
               return Project.find();
            }
        },
        //get a single project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        //Get all clients
        clients: {
          type: new GraphQLList(ClientType),
          resolve(parent, args) {
            return clients.find(args.id);
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


//Mutations
const mutation = new GraphQLObjectType({
   name: 'Mutation',
    fields: {
        addClient: {
           type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        //delete client
        deleteClient: {
            type: ClientType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Client.findByIdAndDelete(args.id);
            }
        },
        //add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: "Not Started" },
                            'progress': { value: "In Progress" },
                            'completed': { value: "Completed" }
                        },

                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }
        },
        //delete a project
        deleteProject: {
            type: ProjectType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            }
        }
     }, //end fields
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})