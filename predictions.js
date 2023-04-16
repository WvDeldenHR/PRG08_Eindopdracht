const nn = ml5.neuralNetwork({ task: 'regression', debug: true });

nn.load('./models/model.json', modelLoaded);

function modelLoaded() {
    const durationField = document.getElementById("duration");
    const keyField = document.getElementById("key");
    const loudnessField = document.getElementById("loudness");
    const speechinessField = document.getElementById("speechiness");
    const acousticnessField = document.getElementById("acousticness");
    const instrumentalnessField = document.getElementById("instrumentalness");
    const tempoField = document.getElementById("tempo");
   
    const predictButton = document.getElementById("predictionsButton");
    const result = document.getElementById("result");
   
    predictButton.addEventListener("click", makePrediction);
    async function makePrediction() {
        const duration = Number(durationField.value);
        const key = Number(keyField.value);
        const loudness = Number(loudnessField.value);
        const speechiness = Number(speechinessField.value);
        const acousticness = Number(acousticnessField.value);
        const instrumentalness = Number(instrumentalnessField.value);
        const tempo = Number(tempoField.value);

        const results = await nn.predict({ duration, key, loudness, speechiness, acousticness, instrumentalness, tempo });
        const estimatedDanceability = results[0].danceability;
   
        result.innerText = `Predicted Danceability: ${estimatedDanceability}`
    }
}