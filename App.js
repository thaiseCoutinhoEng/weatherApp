import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class WeatherScreen extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }
  //funcao para obter os dados JASON da API e para o estado weather.
  getWeather = async () => {
    //alterar latitude e longitude
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=05&lon=35';
    return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        weather: responseJson,
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <Text>Carregando...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              Previsão do Tempo
            </Text>
            <Image
              style={styles.cloudImage}
              source={require('./clouds.png')}
            />
            <View style={styles.textContainer}>
            <Text style={{ fontSize: 18}}>
              {this.state.weather.main.temp}&deg;C
            </Text>
            <Text style={{ fontSize: 20, margin:10}}>
              Umidade : {this.state.weather.main.humidity}
            </Text>
            <Text style={{fontSize: 20}}>
              {this.state.weather.weather[0].description}
            </Text>
          </View>
          </View>    
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex:1
  },
  subContainer : { 
    flex: 1, 
    borderWidth: 1, 
    alignItems: 'center' 
    },
    title:{ 
      marginTop: 50, 
      fontSize: 30,
      fontWeight: '550' 
    },
    cloudImage :{ 
      width: 200, 
      height: 200, 
      marginTop: 30 
    },
    textContainer : { 
      flex: 1,
      alignItems: 'center', 
      flexDirection:'row', 
      marginTop:-150
    }
});