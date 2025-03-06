import { useState } from 'react'
import './WeatherApp.css'


export const WeatherApp = () => {

//3- para generar cambios en el estado actual y modificarlos necesutamos usar el Hook useState() que se encargara de poder indicarnos como queremos que inicie el input que en este caso sera vacio y con el setCity poder actualizar el estado. teniendo en cuenta que city sera la ciudad actual que se agregue, setCity se encargara de buscar la info de la api para esa ciudad que se agrego y el useState es como iniciara el estado actual, o sea en vacio hasta que el usurario agregue alguna ciudad.
    const [city, setCity] = useState('')

//6- vamos a realizar un useState con la info del clima
  const [weatherData, setWeatherData] = useState(null)// null para que no aparezca nada si no hay nada. pero si se agrega una ciudad en el input esta usará el setWeatherData() y mostrará la info del clima de dicha ciudad.



  //1- preparamos la informacion externa que necesitamos como la api, la api key y el diferenciador para convertir en grados. esto lo guardamos en variables
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '14013d1b1773c7083ef13349d8f3b3c6'
    const difKelvin = 273.15 //para lograr obtener grados celsious debemos restar este numero a los grados kelvin

//5-usamos la function para integrar el metodo fetch y poder llamar la api del clima a nuestra aplicacion, luego de hacerla recordar que necesitamos hacer tambien un useState con el fin de poder setear los datos del clima de la api del clima y pasar el setWeatherData dentro de esta function :
    const fetchWeatherData = async () => {//usamos async, await para facilitar la legibilidad del codigo.
      try{
          const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)//fetch devuelve una promesa y le ponemos await para que espere la respuesta
          const data = await response.json()//convierte la respuesta a un .json un objeto manipulable y modificable
          console.log(data)
          setWeatherData(data)
      }catch(error){
        console.error('Ha habido un error', error)
      }
    }

  

    //4-en la function handleCityChange() es donde vamos a permitir que se realicen los cambios cuando el usuario escriba en el input y le de click en el button
    const handleCityChange = (event) =>{
      setCity(event.target.value)//direccionamos para que al hacer click con la info agregada este se vincule al value que esta dentro del target que a su vez hace parte del event.

    }
    //esta function la podemos hacer inmediatamente agreguemos el onSubmit en el form
    const handleSubmit= (event) =>{
    event.preventDefault()
    fetchWeatherData()
    setCity('')//lo que hacemos es crear un nuevo estado en el form y que se quede en vacio el input una vez se realizo una busqueda.
  }

  return (
    //2- preparamos nuestra estructura html y css, en este caso en el jsx de react
    <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>{/*esta function se encargara de ejecutar el event.preventDefault() para que no reinicie el button*/}
            <input 
            type="text" 
            placeholder="Ingrese una ciudad"
            //recordemos que siempre dentro de los form en el input debemos agregar value que sera el valor que agregara el ususario y onchange que sera la funcion que se encargara de ejecutar los cambios cuando el usuario agregue valor al input
            value={city}
            onChange={handleCityChange}
            />
            <button type="submit">Buscar</button>
        </form>
{/*7- ¿Bueno, y donde mostraremos la info del clima segun la ciudad que busquemos?
aqui haremos todo el bloque donde incormporaremos la api con la informacion del clima de cada ciudad.*/}
        {weatherData && (

          <div>
            <h2>{weatherData.name},{weatherData.sys.country}</h2>
            <p>La temperatura actual es de {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
            <p>Condición meteorológica: {weatherData.weather[0].description}</p>
            <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description}/>
          </div>
        )}
    </div>
   

  )
}
