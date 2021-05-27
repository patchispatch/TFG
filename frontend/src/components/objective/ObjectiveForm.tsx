import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import {Form, Item, NumberField, Picker, TextField} from '@adobe/react-spectrum';
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';

export function ObjectiveForm() {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // Category list
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // Form control
  let [name, setName] = useState('');
  let [goal, setGoal] = useState<number>();
  let [category, setCategory] = useState<any>();

  // On init
  useEffect(() => {
    // Populate category list
    categoryService.list().subscribe(response => setCategoryList(response));
  }, [])


  // Render
  return (
    <Form>
      <TextField 
        label="name" 
        value={name}
        onChange={setName}
        isRequired={true}
      />
      <NumberField 
        label="goal"
        value={goal}
        onChange={setGoal}
        minValue={1} 
        isRequired={true}
      />
      <Picker 
        label="category"
        items={categoryList}
        onSelectionChange={setCategory}
      >
        {(item) => <Item>{item.name}</Item>}
      </Picker>
    </Form>
  );
}