import axios from "axios";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;
const weatherbitKey = process.env.REACT_APP_WEATHERBIT_KEY;

export default {
    getWeather: function(location) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleKey}`)
            .then(res => {
                if (!res.data.results.length) {
                    return alert("Not a valid location!");
                }

                const { lat, lng: lon } = res.data.results[0].geometry.location;
                return axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=I&days=7&key=${weatherbitKey}`);


            })
            .catch(err => {
                console.log(err);
            })
    }
}