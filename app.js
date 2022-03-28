const city_nameEl = document.querySelector('.city_name')
const searchForm  = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const info = document.querySelector('.info')
const weatherStatus = document.querySelector('.weather-status')
const min = document.querySelector('.min')
const max = document.querySelector('.max')
const overlay = document.querySelector('.overlay')
const infoIcon = document.querySelector('.infoIcon')
const infoIconImg = document.querySelector('.infoIconImg')
const speed = document.querySelector('.speed')

let apiKey = '467143a2e9e1de3de89328bf80dd0625'
let apiLink =  'https://api.openweathermap.org/data/2.5/weather'
// let cityname = "London"


   async function sendReq(city_name) {
       overlay.classList.remove('hidden')
       try {
        const req = await fetch(`${apiLink}?q=${city_name}&units=metric&appid=${apiKey}`)
        console.log(req);
        
        if(req.statusText == "Unauthorized") {
            throw new Error(
                "So'rov bilan bog'liq xatolik bor"
            )
        }
       else if(!req.ok) {
            throw new Error(
                "Noto'g'ri shahar nomini kiritdingiz.Iltimos to'g'ri ma'lumot kiriting"
                )
        }
        const data = await req.json()
        getData(data)
       }   catch(err) {
           console.log('try bilan bogliq muammo bor');
           console.log(err.message);
           overlay.textContent = `${err.message}`
       }

        function getData(data) {
            console.log(1)
            overlay.classList.add('hidden')
            const weather = data
            console.log(weather)
            city_nameEl.innerHTML = `<span>${weather.name}, <span>${weather.sys.country}</span></span>`
            info.textContent = `${weather.main.temp.toFixed(0)}℃`
            max.textContent = `${Math.ceil(weather.main.temp_max)}℃`
            min.textContent = `${Math.ceil(weather.main.temp_min)}℃`
            weatherStatus.textContent = `${weather.weather[0].main}`
            infoIcon.src = ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            speed.textContent = `${weather.wind.speed} m/s`

            // if(infoIcon.src = 'Clouds') {
            //     infoIconImg.style.background = 'red'
            // }
            // if(infoIcon.src = 'Rain') {
            //     infoIconImg.style.background = 'blue'
            // }
            // if(infoIcon.src = 'Haze') {

            // }
           
        }
    }

    searchForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        const nameOfCity = searchInput.value
        searchInput.value = ''
        sendReq(nameOfCity)
    })

    overlay.addEventListener('click', ()=> {
        overlay.textContent = 'Loading...'
        overlay.classList.add('hidden')
        searchInput.value = ''
        city_nameEl.textContent = 'Which city?'
        console.clear()
    })


