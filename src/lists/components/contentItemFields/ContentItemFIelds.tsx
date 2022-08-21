import { useEffect, useState } from "react";
import { Datagrid, TextInput } from "react-admin";
import { BlogItemContentItemType, BlogItemType, getDocument } from "../../../api/api";
import { TextField } from "./TextField";
import { Button } from "@mui/material";

type ItemsPropsType = {
  items: BlogItemContentItemType['text']['ru']
  type: 'ru' | 'ua'
  name: string
} & BlogType

const Items: React.FC<ItemsPropsType> = ({ items, type, name, currentBlog, setCurretBlog }) => {
  let currentContentItemSubitemIndex = currentBlog?.content[name].text.ru.filter((i, index, array) => {
    if (typeof i === 'object') {
      // return i.array.findIndex(el => el === )
    }
  });
  const handleNewField = () => {
    
  }
  
  let Items = items.map((i, index) => {
    if (typeof i === 'object') {
      let Items = i.array.map((i, arrayIndex) => <TextField label={`${name} ${index + 1} ${type} ${arrayIndex + 1}`} value={i} key={arrayIndex} />)
      return <>
        {Items}
        <Button onClick={() => {}} key={(index + 1) * 2}>Add more</Button>
      </>
    }
    return <TextField label={`${name} ${type} ${index + 1}`} value={i} key={(index + 1) * 3} />
  })
  return <>
    {Items}
  </>
}

type ArrayFieldProps = {
  source: BlogItemContentItemType['text']
  name: string
} & BlogType

const ArrayField: React.FC<ArrayFieldProps> = ({ source, name, currentBlog, setCurretBlog }) => {
  return <>
    <Items items={source.ru} type='ru' name={name} currentBlog={currentBlog} setCurretBlog={setCurretBlog} />
    <Items items={source.ua} type='ua' name={name} currentBlog={currentBlog} setCurretBlog={setCurretBlog} />
  </>
};

type BlogType = {
  currentBlog: BlogItemType | undefined
  setCurretBlog: React.Dispatch<React.SetStateAction<BlogItemType | undefined>>
}

export const ContentItemFields: React.FC<BlogType> = ({ currentBlog, setCurretBlog }) => {
  if (!currentBlog) return <></>;

  let contentKeys = Object.keys(currentBlog.content);

  let Items = contentKeys.map((k, index) => {
    let texts = currentBlog.content[k].text || { ru: [], ua: [] };

    return <>
      <TextInput key={(index + 1) * 2} fullWidth source={`content.${k}.name.ru`} />
      <TextInput key={(index + 1) * 3} fullWidth source={`content.${k}.name.ua`} />
      <ArrayField key={(index + 1) * 7} source={texts} name={k} currentBlog={currentBlog} setCurretBlog={setCurretBlog} />
    </>

    // return <ArrayField key={index} source={`content.${k}`}>
    //   <Datagrid>
    //     {/* <TextInput source='name.ru' /> */}
    //     {/* {/* <TextInput source='name.ua' /> */}
    //     <TextInput source='text.ru' />
    //     {/* <TextInput source='text.ua' /> */}
    //   </Datagrid>
    // </ArrayField>
  });

  return <>
    {Items}
  </>
}