import { Theme } from '@material-ui/core';
import * as React from 'react';
import { createContext } from 'react';
import { Category } from 'src/models/category';
import { defaultTheme } from 'src/theme';
import { AppView } from "src/models/shared";

export interface AppContextTypes {
  categoryList: Category[],
  currentTheme: Theme,
  resetDay: number,
  defaultView: AppView,
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>,
  reloadContext: () => void
}

const appDefaultContext: AppContextTypes = {
  categoryList: [],
  currentTheme: defaultTheme,
  resetDay: 0,
  defaultView: AppView.OBJECTIVES,
  setCategoryList: () => {},
  reloadContext: () => {}
}

export const AppContext = createContext(appDefaultContext);
