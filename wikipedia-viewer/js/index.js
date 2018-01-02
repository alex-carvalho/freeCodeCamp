Vue.component('result-item', {
    props: ['result'],
    template: `
    <div class="result-item">
      <a v-if="result.url" :href="result.url" target="black_">
        <div class="title">{{result.text}}</div>
        <div class="url" >{{result.url}}</div>
      </a>
      <div v-else class="title">{{result.text}}</div>
      <div class="description">{{result.description}}</div>
    </div>`
});

let app = new Vue({
    el: "#app",
    data: function () {
        return {
            searchValue: "",
            inFocus: true,
            results: []
        };
    },

    mounted: function () {
    },
    methods: {
        clear() {
            this.searchValue = '';
            this.$refs.input.focus();
        },
        search() {
            if (this.searchValue.trim()) {
                axios
                    .get(
                        `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${this
                            .searchValue}`
                    )
                    .then(response => response.data)
                    .then(data => {
                        let size = data[1].length;
                        this.results = [];

                        if (size > 1) {
                            for (let i = 1; i < size; i++) {

                                this.results.push(new Result(data[1][i], data[2][i], data[3][i]));
                            }
                        } else {
                            this.results.push(new Result("No results", "", ""));
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
});

class Result {
    constructor(text, description, url) {
        this.text = text;
        this.description = description;
        this.url = url;
    }
}