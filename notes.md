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

->Need to have a second param to condition the activation of useEffect
```javascript
const [fetchedCountries, setFetchedCountries] = useState([])
useEffect(()=>{
    const fetchCountries = async () =>{
      setFetchedCountries(await countries)
    }
    fetchedCountries()
  },[setFetchedCountries])
```

->Changing the country for example...
```javascript
// 1. fetch the data from the API 
//API/index.js
export const fetchCountries = async()=>{
  try{
    const {data:{countries}} = await axios.get(`${url}/countries`)
    return countries.map((country)=>country.name)

  }catch(error){
    console.log(error)
  }
}

//2. Import the new function into the component
//Components/CountryPicker.jsx
import {fetchCountries} from '../../Api'

//3. Create a useEffect function and put the result into the empty state
// in the same file... 
const CountryPicker = ({handleCountryChange})=>{
  const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(()=>{
    const fetchApi = async () =>{
      setFetchedCountries(await fetchCountries())
    }
    fetchApi()
  },[setFetchedCountries])
  console.log(fetchedCountries)
  return(
    <FormControl>
      <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
        <option value="global">Global</option>

        // returns the countries' names of each single country into the list. Key is super important! i is an index you can pass to the function //
        {fetchedCountries.map((country,i)=>
          <option 
            key={i} 
            value= {country}
          >{country}
          </option>)
        }
      </NativeSelect>
    </FormControl>
  )
}
//4. The state of the country will be kept into App
class App extends React.Component{
  state={
    data:{},
    country: ''
  }
  ...
  //method that changes the state
  handleCountryChange = async (country)=> {

    //fetch the data 
    //set the state
  }
  ...
  //pass method as a param
  render(){
    return(
      <CountryPicker handleCountryChange={this.handleCountryChange}/>
    )
  }

  //5. In the country Picker component you must destructure the passed function using {}
  //6. Need to put the func in the event 
  <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
 ```

**-> Whole thing step by step**
1. Started the APP.js with some initial states for data and country 
2. Then, we have the componentDidMount() asking for data from the API through the fetchData()
3. In the API file we have an implementation of fetchData(). It returns only what is needed
4. set the state with the Data provided from API
5. Make a handleCountry() to be able to choose the country or none
6. In Country picker we have a call to fetchCountries() from the API.js
7. The fetched Countries will go into a .map() to populate the list
8. Once the country is chosen it goes back to handleCountryChange()[this is set in the onChange event]
9. There we make one more request to the API, this time with the specified country, then set the new state.
10. To show the initial line chart we have an API call that is specific for the daily data 


