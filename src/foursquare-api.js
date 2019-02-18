export const getAPI = () => {
	fetch('https://api.foursquare.com/v2/venues/explore?client_id=NRQZ3OTXP3KJH05HXL3RKRKRTF3WJW4MCNMHZFPIY3HKVWHH&client_secret=GTDZ10LLV2HYUJBTSRWV1ULDBWKXBJDZ5EQ4HAEZTCVG4AL4&v=20180323&ll=40.7243,-74.0018&query=coffee')
	    .then(response => {
	        console.log(response)
	    })
	    .catch(err => {
	        console.log(err)
	    });	
}