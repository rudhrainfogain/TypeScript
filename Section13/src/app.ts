import axios from 'axios';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';

//get access to  form
const form = document.querySelector('form')!;
//get access to input box
const addressInput = document.getElementById('address')! as HTMLInputElement;
//custom type for response for address search
type coordinates = [{ lat: number; lon: number }];
//declare var for openlayers
//declare var ol: any;

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
      //clear the div before rendering the map
      document.getElementById('map')!.innerHTML = '';
      //render the map

      new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 16
        })
      });

      /* new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([longitude, latitude]),
          zoom: 16
        })
      }); */
    })
    .catch(error => {
      //throw an alert in case of error
      alert(error.message);
      console.log(error);
    });
}
//add event listener to form to listen to the submit event
form.addEventListener('submit', searchAddressHandler);
