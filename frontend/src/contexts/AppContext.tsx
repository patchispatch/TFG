import * as React from 'react';
import { createContext } from 'react';
import { Category } from 'src/models/category';

export interface AppContextTypes {
  categoryList: Category[],
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>,
  reloadContext: () => void
}

const appDefaultContext: AppContextTypes = {
  categoryList: [],
  setCategoryList: () => {},
  reloadContext: () => {}
}

export const AppContext = createContext(appDefaultContext);
