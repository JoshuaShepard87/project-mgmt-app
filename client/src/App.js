import Header from "./components/header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientModal from "./components/addClientModal";
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});
//create a client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
    cache,
});

function App() {
  return (
      <>
        <Header />
        <ApolloProvider client={client}>
           <div className="container">
               <AddClientModal />
            <Clients />
           </div>
        </ApolloProvider>
      </>
  );
}

export default App;
