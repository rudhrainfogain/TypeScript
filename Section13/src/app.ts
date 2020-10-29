import axios from 'axios';
//get access to  form
const form = document.querySelector('form')!;
//get access to input box
const addressInput = document.getElementById('address')! as HTMLInputElement;
//custom type for response for address search
type coordinates = [{ lat: number; lon: number }];
//  search handler function
function searchAddressHandler(event: Event) {
  //prevent default behaviour of form submission
  event.preventDefault();
  //get value eneterd by user in address input  box
  const enteredAddress = addressInput.value;
  //send get request to fetch co ordinates
  axios
    .get<coordinates>(
      `https://nominatim.openstreetmap.org/search/${encodeURI(
        enteredAddress
      )}?format=json&addressdetails=1&limit=1`
    )
    .then(response => {
      console.log(response);
      //if no address returned throw an error
      if (response.data.length <= 0) {
        throw new Error('No address found');
      }
      //fetch latitude and longitude
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      console.log('lat', latitude);
      console.log('lon', longitude);
    })
    .catch(error => {
      //throw an alert in case of error
      alert(error.message);
      console.log(error);
    });
}
//add event listener to form to listen to the submit event
form.addEventListener('submit', searchAddressHandler);
