import { useInsertionEffect, useState } from "react";
import { ArrayField, Datagrid, TextInput } from "react-admin";
import { BlogItemType, getDocument } from "../../../api/api";
import { TextField } from "./TextField";

export const ContentItemFields: React.FC = () => { 
  let [currentItem, setCurrentItem] = useState<undefined | BlogItemType>(undefined);
  useInsertionEffect(() => {
    getDocument('blog').then(v => setCurrentItem(v as BlogItemType));
  }, []);

  if (!currentItem) return <></>;

  let contentKeys = Object.keys(currentItem.content);
  let Items = contentKeys.map((k, index) => {
    let texts = currentItem?.content[k].text || {ru: [], ua: []};
    let TextItems = [...texts.ru, ...texts.ua].map((d, index) => {
      if (typeof d === 'object') {
        // let Items = d.array.map((i, index) => <TextInput key={index} source={`content.${k}.`} />);
        // return <ul>{Items}</ul>
      } else {
        return <TextInput key={index} source={`content.${k}.`} />;
      };
    });

    return <div key={index}>
      <TextInput fullWidth key={index} source={`content.${k}.name.ru`} />
      <TextInput fullWidth key={index} source={`content.${k}.name.ua`} />
      {/* <ul key={(index + 1) * 2 + 1}> */}
      <ul>
        {TextItems}
      </ul>
    </div>

    // return <ArrayField key={index} source={`content.${k}`}>
    //   <Datagrid>
    //     {/* <TextInput source='name.ru' /> */}
    //     {/* {/* <TextInput source='name.ua' /> */}
    //     <TextInput source='text.ru' />
    //     {/* <TextInput source='text.ua' /> */}
    //   </Datagrid>
    // </ArrayField>
  });

  return <ul>
    {Items}
  </ul>
}