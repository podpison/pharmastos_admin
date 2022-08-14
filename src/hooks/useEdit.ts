import { useEffect } from "react";

export const useEdit = () => {
  useEffect(() => {
    const callback = (e: MouseEvent) => {
      console.log(e)
    };
    let editButton = document.getElementsByClassName('edit')[0]?.querySelector('button');
    editButton?.addEventListener('click', callback);
    return () => {
      editButton?.removeEventListener('click', callback);
    }
  }, [])
};