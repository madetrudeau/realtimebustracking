const appID = "7CBB98B4AE7C7662E47CCD101";
console.log(appID);
//const fs = require('fs').promises;


async function run(){
    const vehicleLocation = await getVehiclesCurrentLocation();
    const stopInformation    = await getStopInfo('./gtfs/stops.txt');
    console.log(new Date());
    console.log("Latitude: " + vehicleLocation.vehicle[0].latitude);
    console.log("Longitude: " + vehicleLocation.vehicle[0].longitude);
    //console.log(stopInformation);
    //console.log(resultSet)

    //Timer
    setTimeout(run, 15000);
}

async function getVehiclesCurrentLocation(){
    const url = 'https://developer.trimet.org/ws/v2/vehicles&appID=' + appID;
    const response = await fetch(url);
    const json     = await response.json();
    return json.resultSet;
}

async function getStopInfo(filename){
    try{
        const contents = await fs.readFile(filename, 'utf8');
        const contentSplit = contents.split(/\r\n/);
        const titleSplit = contentSplit[0].split(',');
        let stopData = {};
        for(let i=0;i<titleSplit.length;i++){
            let tempArray = new Array;
            let interpArray = new Array;
            for(let j=1;j<contentSplit.length;j++){
                tempArray = contentSplit[j].split(',');
                if(isNaN(tempArray[i])){
                    interpArray.push(tempArray[i]);
                }else{
                    interpArray.push(Number(tempArray[i]));
                }
            }
            stopData[titleSplit[i]] = interpArray;
        }    
        return stopData;
    }
    catch(err){
        console.log(err);
    }
}

run();
