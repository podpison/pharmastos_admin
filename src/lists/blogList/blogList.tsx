import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useInsertionEffect, useState } from 'react';
import { Create, Datagrid, Edit, EditButton, useRefresh, List, SaveButton, SimpleForm, TextField, TextInput, Toolbar, useDataProvider, useNotify, useRecordContext, useRedirect, useUpdate, useUpdateMany } from 'react-admin';
import { FieldValues } from 'react-hook-form';
import { TextField as MuiTextField, Button as MuiButton } from '@mui/material';
import { BlogItemType, fs, getDocument, updateDocument, createDocument } from '../../api/api';
import { useEdit } from '../../hooks/useEdit';
import { ContentItemFields } from '../components/contentItemFields/ContentItemFIelds';

export const BlogList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name.ru" />
    </Datagrid>
  </List>
);

const useSubmit = (collection: string, type: 'update' | 'create') => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  return (data: FieldValues) => {
    if (type === 'update') {
      notify(`${collection} updated!`);
      updateDocument('blog', data);
    } else {
      notify(`${collection} created!`);
      createDocument(collection, data);
    }
    redirect(`/${collection}`);
    refresh();
  }
}


export const BlogEdit: React.FC = (props) => {
  const onSubmit = useSubmit('blog', 'update');
  const [newFields, setNewFields] = useState<string[]>([]);
  const [newItemName, setNewItemName] = useState('');

  const addNewField = () => {
    setNewFields(p => [...p, newItemName]);
    setNewItemName('');
  };

  return <Edit {...props} className='edit'>
    <SimpleForm onSubmit={onSubmit}>
      <TextInput disabled source="id" />
      <TextInput fullWidth source="name.ru" />
      <TextInput fullWidth source="name.ua" />
      <TextInput fullWidth multiline source="description.ru" />
      <TextInput fullWidth multiline source="description.ua" />
      <TextInput fullWidth source="img" />
      <TextInput fullWidth multiline source="imgDescription.ru" />
      <TextInput fullWidth multiline source="imgDescription.ua" />
      {/* <ContentItemFields /> */}
      <MuiTextField placeholder='New field name (english)' value={newItemName} onChange={e => setNewItemName(e.target.value)} />
      <MuiButton sx={{mt: 2}} variant='outlined' onClick={addNewField}>Add new field</MuiButton>
    </SimpleForm>
  </Edit>
};

export const BlogCreate: React.FC = (props) => {
  const onSubmit = useSubmit('blog', 'create');
  const [newFields, setNewFields] = useState<string[]>([]);
  const [newItemName, setNewItemName] = useState('');

  const addNewField = () => {
    setNewFields(p => [...p, newItemName]);
    setNewItemName('');
  };

  return <Create {...props}>
    <SimpleForm onSubmit={onSubmit}>
      <TextInput fullWidth source="name.ru" />
      <TextInput fullWidth source="name.ua" />
      <TextInput fullWidth multiline source="description.ru" />
      <TextInput fullWidth multiline source="description.ua" />
      <TextInput fullWidth source="img" />
      <TextInput fullWidth multiline source="imgDescription.ru" />
      <TextInput fullWidth multiline source="imgDescription.ua" />
      <MuiTextField placeholder='New field name (english)' value={newItemName} onChange={e => setNewItemName(e.target.value)} />
      <MuiButton sx={{ mt: 2 }} variant='outlined' onClick={addNewField}>Add new field</MuiButton>
    </SimpleForm>
  </Create>
};