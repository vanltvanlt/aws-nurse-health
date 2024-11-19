import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AuthenticationForm from "./components/AuthenticationForm";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthenticationForm />
    </ApolloProvider>
  );
}

export default App;
