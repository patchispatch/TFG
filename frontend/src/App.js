import React, {useState, useEffect} from 'react'
import axios from "axios"
import Activity from './components/Activity'

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/activities")
    .then(res => setActivities(res.data))
    .catch(err => console.log(err))

    console.log(activities)
  }, [])

  return (
    <main>
      <h1>Hello World</h1>
      {activities.map((act) => {
        return (
        <Activity 
          key={act.id}
          title={act.title}
          description={act.description}
          date={act.date}
          time={act.time}
        />)
      })}
    </main>
  );
}

export default App;
