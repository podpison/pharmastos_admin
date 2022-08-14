import { Create, Datagrid, Edit, EditButton, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, SimpleList, TextField, TextInput, useRecordContext } from 'react-admin';
import { useMediaQuery } from '@mui/material';

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users">
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

export const PostList = () => {
  //@ts-ignore
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

  return <List filters={postFilters}>
    {isSmall ? (
      <SimpleList
        primaryText={record => record.title}
        secondaryText={record => (
          <ReferenceField label="User" source="userId" reference="users">
            <TextField source="name" />
          </ReferenceField>
        )}
      />
    ) : (
      <Datagrid>
        <TextField source="id" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="body" />
        <EditButton />
      </Datagrid>
    )}
  </List>
};

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>
}

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Create>
)