const request = require('postman-request')

const geocode = (address, callback) =>{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidG9raW8tdGhlLWNhcGl0YWwiLCJhIjoiY2t6cm92c2t3MDJ4bTJucGtzOXFuNjljMiJ9.SQPvsu1bhcdRwvmub3iMyQ&limit=1';
    
    request({url, json: true, }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location service.', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
            console.log("Latitude:" + body.features[0].center[0] + "Longitude: " + body.features[0].center[1]);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].text,
            })
        }
    })
}

module.exports = geocode