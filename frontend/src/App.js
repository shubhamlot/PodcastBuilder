import logo from './logo.svg';
import './App.css';
import AudioProcess from './components/AudioProcess'
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client'
import {createUploadLink} from 'apollo-upload-client'
import FS from './components/Files'

const client = new ApolloClient({
  link: createUploadLink({
    uri:'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache()

})
function App() {
  return (
    <ApolloProvider client={client}>
      <AudioProcess/>
      <FS/>
    </ApolloProvider>
  );
}

export default App;
