import * as React from 'react';
import { Category } from 'src/models/category';
import { Chip, ThemeProvider } from '@material-ui/core';
import { ColorDataMap } from 'src/theme';

interface ChipProps {
  category: Category,
  [x:string]: any
}

export function CategoryChip({category, ...props}: ChipProps) {
  return (
    <ThemeProvider theme={ColorDataMap[category.color].theme}>
      <Chip label={category.name} color='primary' {...props} />
    </ThemeProvider>
  );
}