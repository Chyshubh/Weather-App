
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import search_icon from '../assets/search.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
    const inputRef = useRef();
    const [WeatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }
    const search = async(city)=>{
        if(city === ''){
            alert('Please Enter City Name')
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_App_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;

            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                WindSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error('Error in fetching weather data')
        }
    }
    useEffect(()=>{
        search('Delhi');
    },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src={search_icon} alt='' onClick={ ()=>search(inputRef.current.value)} />
            </div>
{WeatherData?
<>
    <img src={WeatherData.icon} alt='' className='clear-icon'/>
        <p className='temperature'>{WeatherData.temprature}°c</p>
        <p className='location'>{WeatherData.location}</p>
        <div className='weather-data'>
        <div className='col'>
        <img src={humidity_icon} alt=''/>
    <div>
        <p>{WeatherData.humidity} %</p>
            <span> Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind_icon} alt='' />
            <div>
                <p>{WeatherData.WindSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
</>:<></>}
            
</div>
  )
}

export default Weather
