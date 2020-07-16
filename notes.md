-> React hooks
-> Using Covid API
-> Material UI

-> You can destructure data received from an API doing: 
```javascript 
import axios from 'axios'
const url = 'https://covid19.mathdro.id/api'
export const fetchData = async() => {
  try{
    const { 
      data:{ confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(url)
    const modData = { confirmed, recovered, deaths, lastUpdate }
    return modData
  }catch(error){
    console.log(error)
  }
}
```

-> These two things are equal, but the first one is more
commonly put into classes
```javascript
const [dailyData, setDailyData] = useState({})
//Same as:
state={
  dailyData:{}
}
```

