import { useEffect, useState } from 'react';
import './popup.scss';

function Popup() {

	const [city, setCity] = useState(null);
	const [temperature, setTemperature] = useState(null);


	useEffect(()=>{
		window.AMap.plugin('AMap.Weather', function() {
			//创建天气查询实例
			let weather = new window.AMap.Weather();
			//执行实时天气信息查询
			weather.getLive('上海市', function(err, data) {
				setCity(data.city);
				setTemperature(data.temperature);
			});
		});

		window.AMap.plugin('AMap.Geolocation', function() {
			var geolocation = new window.AMap.Geolocation();
			geolocation.getCurrentPosition(function(status,result){
				console.log(result);
		  });
		});

	}, [])

	return (
		<div className="Popup">
			<h3 className="title">天气预报</h3>
			<p>地点：{city}</p>
			<p>温度：{temperature}</p>
		</div>
	);

	
}

export default Popup;