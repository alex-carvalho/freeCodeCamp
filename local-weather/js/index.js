const icons = {
    clear: "sunny",
    clouds: "cloudy",
    rain: "rainy",
    snow: "snowy",
    thunderstom: "stormy"
};

const vm = new Vue({
    el: "#app",
    data: {
        data: {},
        isCelsius: true,
        temperature: 0
    },

    computed: {
        main: function () {
            return this.data.weather ? this.data.weather[0].main.toLowerCase() : "";
        },
        icon: function () {
            return this.main ? icons[this.main] : "";
        }
    },

    mounted() {
        getLocation();
    },

    methods: {
        toggle() {
            this.isCelsius = !this.isCelsius;

            this.temperature = this.isCelsius ? toCelsius(this.temperature) : toFahrenheit(this.temperature);
        }
    }
});

function getLocation() {
    // workaround: preview codepen remove all occurrence word geolocation
    let geoLo = "geo" + "location";

    if (!geoLo in navigator) {
        alert("Geolocation is not supported by this browser.");
        return;
    }

    navigator[geoLo].getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
            .then(res => res.data)
            .then(json => {
                vm.data = json;
                vm.temperature = Math.round(vm.data.main.temp);
            })
            .catch(err => {
                console.log(err);
                alert("Error getting the weather forecast.")
            });
    });
}

function toFahrenheit(temperature) {
    return Math.round(((temperature / 5) * 9) + 32);
}

function toCelsius(temperature) {
    return Math.round((temperature - 32) / 1.8);
}