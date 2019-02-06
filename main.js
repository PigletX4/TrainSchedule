var config = {
    apiKey: "AIzaSyAWH8ElNptdxJBZyvlsym66ZNjJAtZM1rM",
    authDomain: "trainschedule-77d4a.firebaseapp.com",
    databaseURL: "https://trainschedule-77d4a.firebaseio.com",
    projectId: "trainschedule-77d4a",
    storageBucket: "trainschedule-77d4a.appspot.com",
    messagingSenderId: "558693170968"
};

firebase.initializeApp(config);
var database = firebase.database(); 
var ref = database.ref('trains');
ref.on("value", pullInfo, errInfo);







function addTrain(){
    
    var a = $("#trainNameBox").val().trim();
    var b = $("#destinationBox").val().trim();
    var c = $("#firstTrainTimeBox").val().trim();
    var d = $("#frequencyBox").val().trim();

    var trainData = {
    name: a,
    destination: b,
    firstTrainTime: c,
    frequency: d
    };

    console.log(trainData);

   

    ref.push(trainData);

}

function pullInfo(data){
    $('#tbody').empty();
    
    
    var trains = data.val();
    
    var currentTime = moment();
    console.log(currentTime);

    var keys = Object.keys(trains);
    console.log(keys);;

    for (i = 0; i < keys.length; i++){

        var k = keys[i];


        var a = trains[k].name;
        var b = trains[k].firstTrainTime;
        var c = trains[k].frequency;
        var d = trains[k].destination;
        
        console.log(a);

        var timeConversion = moment(b, "HH:mm").subtract(1, "years"); 
        
        console.log(timeConversion);

        var timeDifference = moment().diff(moment(timeConversion), "minutes");
        
        console.log(timeDifference);

        var remainder = timeDifference % c;

        console.log(remainder);

        var f =  c - remainder;

        console.log(f);

        var e = moment().add(f, "minutes").format("hh:mm a");

        console.log(e);


        var nTname = $('<td></td>').text(a);
        var nTfrequency = $('<td></td>').text(c);
        var nTdest = $('<td></td>').text(d);
        var nTnextArr = $('<td></td>').text(e);
        var nTminsAwa = $('<td></td>').text(f);



        var newTrain = $('<tr style = align-content:\'\left\'\></tr>');

        newTrain.append(nTname);
        newTrain.append(nTdest);
        newTrain.append(nTfrequency);
        newTrain.append(nTnextArr);
        newTrain.append(nTminsAwa);


        $("#tbody").append(newTrain);




    }



}

function errInfo(){
    console.log('Error');
    console.log(err);


}



