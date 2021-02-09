const graphql = require('graphql');

const {GraphQLObjectType , GraphQLSchema ,GraphQLString ,GraphQLID, GraphQLInt ,GraphQLList , GraphQLNonNull} =graphql;

const Book  = require('../models/Book')
const Author  = require('../models/Author')

const BookType = new GraphQLObjectType({
    name: 'Book' ,
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent , args){
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author' ,
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent , args ){
                return Book.findById({authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Book.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Book.find()
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Author.findById(args.id)
            }
        },
        authors:{
            type: new GraphQLList(BookType),
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Author.find()
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: GraphQLInt},
            },
            resolve (parent ,args) {
                const author = new Author({ name: args.name , age: args.age})
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString)},
                genre: {type : GraphQLString},
                authorId: {type : GraphQLID},
            },
            resolve(parent , args){
                const book = new Book({name: args.name , genre: args.genre , authorId: args.authorId})
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})