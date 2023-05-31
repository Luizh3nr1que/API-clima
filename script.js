const erro = document.querySelector('.erro');
const resultado = document.querySelector('.resultado');
const carregando = document.querySelector('.carregando');

document.querySelector('.busca').addEventListener('submit', function (event) {
    event.preventDefault();

    var input = document.querySelector('#searchInput').value;

    if (input !== '') {
        carregando.innerHTML = 'Carregando...';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=171b165c1d7106064b4ca3c9a08f84fc&units=metric&lang=pt_br`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.cod === 200) {
                    showInfo({
                        name: data.name,
                        country: data.sys.country,
                        temp: data.main.temp,
                        windSpeed: data.wind.speed,
                        windAngle: data.wind.deg,
                        weather: data.weather[0].description,
                    });
                } else {
                    resultado.style.display = 'none';
                    erro.innerHTML = 'Não encontramos esta localização.';
                    carregando.innerHTML = '';

                }

                console.log(data)

            });
    }
});

function showInfo(obj) {
    erro.innerHTML = ''
    carregando.innerHTML = '';
    var name = obj.name;
    var country = obj.country;
    var temp = obj.temp;
    var windSpeed = obj.windSpeed;
    var weather = obj.weather

    resultado.style.display = 'block';


    document.querySelector('.titulo').innerHTML = name + ', ' + country;
    document.querySelector('.tempInfo').innerHTML = temp + ' <sup>ºC</sup>';
    document.querySelector('.ventoInfo').innerHTML = windSpeed + ' <span>km/h</span>';
    document.querySelector('.descriptionInfo').innerHTML = weather;
}
