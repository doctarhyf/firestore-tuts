

// Initialize Firebase

var config = {
    apiKey: "AIzaSyAe4ZPOECMnRh7B-krxZPmJ9dlSkpFaZcY",
    authDomain: "https://quotes-6d11e.firebaseio.com",
    databaseURL: "https://quotes-6d11e.firebaseio.com",
    projectId: "quotes-6d11e",
    storageBucket: "https://quotes-6d11e.appspot.com",
    messagingSenderId: "481939644350"
};


firebase.initializeApp(config);

var firestore = firebase.firestore();

const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {

    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " ro Firestore");
    docRef.set({

        hotDogStatus: textToSave

    }).then(function () {
        console.log("Status saved!");
    }).catch(function  (error) {
        console.log("Got an error ", error);
    });
});

loadButton.addEventListener("click", function () {
    docRef.get().then(function (doc) {
        if (doc && doc.exists){
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

getRealtimeUpdates = function() {
    docRef.onSnapshot(function (doc) {
        const myData = doc.data();
        outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
    });

    
}

getRealtimeUpdates();