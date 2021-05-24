import * as React from 'react';
import './App.css';
import {ObjectiveService} from './services/objective-service';
import {Objective} from './models/objective';
import {useState, useEffect, useMemo} from 'react';
import {Provider, Button, Grid, View, defaultTheme} from '@adobe/react-spectrum';

function App() {

  // Initialize services
  let objectiveService = useMemo(() => new ObjectiveService(), []);

  // State
  let [objectiveList, setObjectiveList] = useState<Objective[]>([]);

  // On initialization
  useEffect(() => {
    objectiveService.list().subscribe(result => setObjectiveList(result));
  }, [objectiveService])

  return (
    <Provider theme={defaultTheme}>
      <Grid
        areas={['header header', 'sidebar content', 'footer footer']}
        columns={['1fr 3fr']}
        gap="size-100"
        height="100vh"
      >
        <View backgroundColor="blue-400" gridArea="content" position="relative">
          <Button 
            variant="overBackground" 
            onPress={() => console.log(objectiveList)}
            position="absolute"
            bottom="size-200"
            right="size-200"

          >
            Hello React Spectrum!
          </Button>
        </View>
        <View backgroundColor="celery-400" gridArea="footer">
        </View>
        <View backgroundColor="fuchsia-400" gridArea="sidebar">
        </View>
        <View backgroundColor="purple-400" gridArea="header">
        </View>
      </Grid>
      
    </Provider>
  );
}

export default App;
