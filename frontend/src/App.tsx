import * as React from 'react';
import './App.css';
import {ObjectiveService} from './services/objective-service';
import {Objective} from './models/objective';
import {useState, useEffect, useMemo} from 'react';
import {Provider, Button, Grid, View, defaultTheme, DialogTrigger, ActionButton, Heading, Divider, Content, Dialog, ButtonGroup} from '@adobe/react-spectrum';
import {ObjectiveForm} from 'src/components/objective/ObjectiveForm';

function App() {

  // Initialize services
  let objectiveService = useMemo(() => new ObjectiveService(), []);



  return (
    <Provider theme={defaultTheme}>
      <Grid
        areas={['sidebar header', 'sidebar content']}
        columns={['400px auto']}
        rows={['75px auto']}
        gap="size-0"
        height="100vh"
      >
        <View backgroundColor="gray-50" gridArea="content" position="relative">
          <DialogTrigger>
            <ActionButton
              position="absolute"
              top="size-200"
              left="size-200"
            >
              Objective form
            </ActionButton>

            {(close) => (
              <Dialog>
                <Heading>New objective</Heading>
                <Divider />

                <Content>
                  <ObjectiveForm />
                </Content>

                <ButtonGroup>
                  <Button variant="secondary" onPress={close}>
                    Cancel
                  </Button>
                  <Button variant="cta" onPress={close}>
                    Create
                  </Button>
                </ButtonGroup>
              </Dialog>
            )}
          </DialogTrigger>
        </View>
        <View backgroundColor="gray-200" gridArea="sidebar">
        </View>
        <View backgroundColor="gray-100" gridArea="header">
        </View>
      </Grid>
      
    </Provider>
  );
}

export default App;
