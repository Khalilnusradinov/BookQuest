import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);