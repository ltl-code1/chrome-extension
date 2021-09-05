import { useEffect, useState } from 'react';
import './popup.scss';

function Popup() {
	const [city, setCity] = useState(null);
	const [temperature, setTemperature] = useState(null);
	const [localCity, setLocalCity] = useState(null);

	const getWeather = (city)=> {
		//创建天气查询实例
		let weather = new window.AMap.Weather();
		//执行实时天气信息查询
		weather.getLive(city, function(err, data) {
			setTemperature(data.temperature);
		});
	}
	useEffect(()=>{
		//创建定位查询实例对象
		let citySearch = new window.AMap.CitySearch();
		//执行定位查询
		citySearch.getLocalCity((status, result) => {
			if (status === 'complete' && result.info === 'OK') {
				setCity(result.city);
			}
			getWeather(result.city);
		});
	}, []);
	useEffect(()=>{
		getWeather(city);
	}, [city]);

	return (
		<div className="Popup">
			<h3 className="title">天气预报</h3>
			<input type="text" className="localcity" onChange={e => setLocalCity(e.target.value)}/>
			<button onClick={() => setCity(localCity)}>提交</button>
			<p>地点：{city}</p>
			<p>温度：{temperature}</p>
		</div>
	);

	
}

export default Popup;