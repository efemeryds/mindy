import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


  
export async function setItem(Key: string,item : string) {
    await Storage.set({
      key: Key,
      value:  item
    });
  }

  export async function getItem(Key:string) {
    const { value } = await Storage.get({ key: Key });
    return value;
  }

  export async  function removeItem() {
    await Storage.remove({ key: 'name' });
  }

  export async function clear() {
    await Storage.clear();
  }