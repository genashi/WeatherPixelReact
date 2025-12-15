export const saveToLocalStorage = (key: string, state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (e) {
      console.error(`Не удалось сохранить ${key} в localStorage:`, e);
    }
  };
  
  export const loadFromLocalStorage = (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) return undefined; 
      
      return JSON.parse(serializedState);
    } catch (e) {
      console.error(`Не удалось загрузить ${key} из localStorage:`, e);
      return undefined;
    }
  };