Vue.component("app-switch", {
    props: ["value"],
    template: `
      <label class="switch">
        <input type="checkbox" v-model="value" @change="onToggle">
        <span class="slider round"></span>
      </label>`,
    methods: {
        onToggle: function (event) {
            this.$emit("input", event.target.checked);
        }
    }
});

const app = new Vue({
    el: "#app",
    data() {
        return {
            showOff: true,
            users: [],
            loading: true,
            usernames: [
                "ESL_SC2",
                "OgamingSC2",
                "cretetion",
                "freecodecamp",
                "storbeck",
                "habathcx",
                "RobotCaleb",
                "noobs2ninjas"
            ]
        };
    },
    computed: {
        filteredUsers: function () {
            let values = this.users;

            if (!this.showOff) {
                values = this.users.filter(user => user.stream);
            }

            return values.sort((userA, userB) => userA.name > userB.name);
        }
    },
    mounted() {
        const promises = this.usernames.map(user =>
            axios.get(`https://wind-bow.glitch.me/twitch-api/users/${user}`)
        );

        axios
            .all(promises)
            .then(responses => responses.map(res => res.data))
            .then(users => {
                users.forEach(user => {
                    axios
                        .get(`https://wind-bow.glitch.me/twitch-api/streams/${user.name}`)
                        .then(res => res.data)
                        .then(data => {
                            if (data.status && data.status != 200) {
                                alert(data.message);
                                console.log(data);
                            } else {
                                user.stream = data.stream;
                            }

                            this.users.push(user);
                            this.loading = false;
                        })
                        .catch(err => alert(err));
                });
            })
            .catch(err => alert(err));
    }
});