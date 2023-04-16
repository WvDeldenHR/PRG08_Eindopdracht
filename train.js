import { createChart, updateChart } from "./scatterplot.js"

const nn = ml5.neuralNetwork({task: 'regression', debug: true})

let testData = []

function loadData() {
    Papa.parse("./data/Features.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: results => checkData(results.data)
    })
}
loadData()

function checkData(data) {
    console.table(data)

    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))    
    testData  = data.slice(Math.floor(data.length * 0.8) + 1)

    for(let songData of trainData){
        nn.addData({ duration: songData.duration, key: songData.key, loudness: songData.loudness, speechiness: songData.speechiness, acousticness: songData.acousticness, instrumentalness: songData.instrumentalness, tempo: songData.tempo }, { danceability: songData.danceability })
    }
    nn.normalizeData()

    nn.train({ epochs: 10 }, () => finishedTraining())

    const chartdata = data.map(song => ({
        x: song.danceability,
        y: song.tempo,
    }))

    // for (let mobile of data) {
    //     nn.addData({ title: mobile.title }, { genres: mobile.genres })
    // }

    createChart(chartdata)
}

async function finishedTraining() {
    // let predictions = []
    // for (let pr = 80; pr < 260; pr += 1) {
    //     const pred = await nn.predict({price: pr})
    //     predictions.push({x: pr, y: pred[0].storage})
    // }
    // updateChart("Predictions", predictions)

    console.log('Prediction Succesfull')
    makePrediction()
}

async function makePrediction() {
    const testSongData = { duration:testData[0].duration, key:testData[0].key, loudness:testData[0].loudness, speechiness:testData[0].speechiness, acousticness:testData[0].acousticness, instrumentalness:testData[0].instrumentalness, tempo:testData[0].tempo }
    const pred = await nn.predict(testSongData)
    console.log(pred[0].danceability)
    // const results = await nn.predict({ price: 90 })
    // console.log(`Geschat verbruik: ${results[0].storage}`)
}

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  nn.save();
  console.log("Model saved!");
});