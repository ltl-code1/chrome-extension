import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './popup.scss';
import options from '../common/js/cities';
import { Cascader, Button } from 'antd'

function Popup() {
	const [city, setCity] = useState(null);
	const [temperature, setTemperature] = useState(null);
	const [localCity, setLocalCity] = useState(null);
	const [weather, setWeather] = useState(null);
	const [windPower, setWindPower] = useState(null);
	const [windDirection, setWindDirection] = useState(null);
	const [isCitySearch, setIsCitySearch] = useState(true);


	const getWeather = (city)=> {
		//创建天气查询实例
		let weather = new window.AMap.Weather();
		//执行实时天气信息查询
		weather.getLive(city, function(err, data) {
			setTemperature(data.temperature);
			setWeather(data.weather);
			setWindPower(data.windPower);
			setWindDirection(data.windDirection);
		});
	}
	useEffect(()=>{
		if(isCitySearch){
			//创建定位查询实例对象
			let citySearch = new window.AMap.CitySearch();
			//执行定位查询
			citySearch.getLocalCity((status, result) => {
				if (status === 'complete' && result.info === 'OK') {
					setCity(result.city);
				}
				getWeather(result.city);
			});
			setIsCitySearch(false);
		}else{
			getWeather(city);
		}
		
	}, [city]);

	return (
		<div className="Popup">
			<h3 className="title">天气预报</h3>
			<table className="weather-container">
				<tbody>
					<tr>
						<th>地点</th>
						<th>天气</th>
						<th>温度</th>
						<th>风速</th>
						<th>风向</th>
					</tr>
					<tr>
						<td>{city}</td>
						<td>{weather}</td>
						<td>{temperature}</td>
						<td>{windPower}</td>
						<td>{windDirection}</td>
					</tr>
				</tbody>
			</table>
			{/* <input type="text" className="localcity" onChange={e => setLocalCity(e.target.value)}/>
			<button onClick={() => setCity(localCity)}>提交</button> */}
				<div className="select-city">
					<Cascader
						className="city-select"
						defaultValue={localCity}
						options={options}
						onChange={e => setLocalCity(e)}
					/>
					<Button className="switch-button" onClick={() => {if(localCity){
						setCity(localCity[2] ? localCity[2] : localCity[1])
					}}}>切换城市</Button>
				</div>
		</div>
	);

	
}

export default Popup;