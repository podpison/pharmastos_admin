import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./components/usersList/UsersList";
import { PostCreate, PostEdit, PostList } from "./components/postList/PostList";
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { firebaseDataProvider } from "./api/api";
import { BlogCreate, BlogEdit, BlogList } from "./lists/blogList/blogList";
// import { authProvider } from './components/authProvider/AuthProvider';
import "./App.css";
import { authProvider } from "./providers/authProvider";

function App() {
  return (
    <Admin authProvider={authProvider} dataProvider={firebaseDataProvider}>
      <Resource name='blog' list={BlogList} edit={BlogEdit} create={BlogCreate} />
    </Admin>
  )
}

export default App