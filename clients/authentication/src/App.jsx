import "./styles/App.css";

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
      <div className='micro-frontend-container'>
        <AuthenticationForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
