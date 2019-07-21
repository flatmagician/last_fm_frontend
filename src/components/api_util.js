const axios = require("axios");
const fs = require("fs");

class Request {

    constructor(user, category, period, rows, cols) {
        this.category_options = {
            albums: "getTopAlbums",
            artists: "getTopArtists",
            tracks: "getTopTracks"
        }

        this.period_options = {
            overall: "overall",
            seven_day: "7day",
            one_month: "1month",
            three_months: "3month",
            six_months: "6month",
            year: "12month"
        };

        this.user = user;
        this.category = this.category_options[category];
        this.period = this.period_options[period];
        this.rows = rows;
        this.cols = cols;
        this.limit = rows * cols;
        this.api_key = "57ee3318536b23ee81d6b27e36997cde";
        this.request = `http://ws.audioscrobbler.com/2.0/?method=user.${this.category}&user=${this.user}&api_key=${this.api_key}&format=json&period=${this.period}&limit=${this.limit}`;
        this.getResponse = async () => {
            const response = await axios.post(this.request)
                .then(function (response) {
                    fs.writeFile("../assets/Image/file1.txt", JSON.stringify(response.data.topalbums.album, null, 2), 'utf8',
                        () => { return response.data.topalbums.album });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

let user = "bentaussig";
let category = "albums";
let period = "one_month";
let rows = 3;
let cols = 3;

console.log("creating new request")
let test_request = new Request(user, category, period, rows, cols);
const response = test_request.getResponse()




//user can choose between small/medium/large/extralarge images
//should be able to place album name, artist name, playcount on image

