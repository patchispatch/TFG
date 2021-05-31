import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import {Button, ButtonGroup, Content, Dialog, Divider, Form, Heading, Item, NumberField, Picker, TextField} from '@adobe/react-spectrum';
import {ObjectiveService} from 'src/services/objective-service';
import {CategoryService} from 'src/services/category-service';
import { Category } from 'src/models/category';
import { Objective } from 'src/models/objective';

// Props
interface ObjectiveFormProps {
  title: string,
  close: () => void,
  objective?: Objective
}

export function ObjectiveForm({title, objective, close}: ObjectiveFormProps) {
  // Services
  const objectiveService = useMemo(() => new ObjectiveService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  // Submit button text
  const submitText = useMemo(() => objective === undefined ? 'Create' : 'Edit', [objective]);

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

    // If an objective is passed as props, populate form
    if (objective) {
      setName(objective.name);
      setGoal(objective.goal)
    }
  }, [categoryService, objective])

  // Validate input
  function validate(field: any): boolean {
    return field !== undefined ? true : false;
  }

  function validationState(valid: boolean | undefined): any {
    if (valid !== undefined) {
      return valid ? 'valid' : 'invalid';
    }
    
    return undefined;
  }

  // Handle submit
  function handleSubmit(): void {

    // If editing, modify object and send put
    if (validate(name) && validate(goal)) {
      if (objective) {
        objective.name = name;
        objective.goal = goal!;
        objective.categoryId = category;
        console.log(objective);
        objectiveService.update(objective).subscribe();
      }
      else {
        // Create objective with form data
        const new_objective = new Objective(name, goal!, category);
        objectiveService.post(new_objective).subscribe();
      }
    }
  }

  // Render
  const form = <Form>
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

  return (
    <Dialog>
      <Heading>{title}</Heading>
      <Divider />

      <Content>
        {form}
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={close}>
          Cancel
        </Button>
        <Button variant="cta" onPress={handleSubmit}>
          {submitText}
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}