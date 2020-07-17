import React from 'react'

import {Cards, Chart, CountryPicker } from './Components'
import { fetchData } from './Api'
import styles from './App.module.css'

import CoronaImg from './img/CoronaOpt1.png'

class App extends React.Component{
  state={
    data:{},
    country: ''
  }
  async componentDidMount(){
    const fetchedData = await fetchData()
    this.setState({ data: fetchedData })
  }
  handleCountryChange = async (country)=> {
    const fetchedData = await fetchData(country)
    this.setState({data:fetchedData, country: country })
    //fetch the data 
    //set the state
  }
  render(){
    const {data, country} = this.state
    
    return(
      <div className={styles.container}>
        <img className={styles.image} src={CoronaImg} alt="COVID-19 banner"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    )
  }
}

export default App