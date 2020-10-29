//get access to  form
const form = document.querySelector('form')!;
//get access to input box
const addressInput = document.getElementById('address')! as HTMLInputElement;

//  search handler function
function searchAddressHandler(event: Event) {
  //prevent default behaviour of form submission
  event.preventDefault();
  //get value eneterd by user in address input  box
  const enteredAddress = addressInput.value;
}
//add event listener to form to listen to the submit event
form.addEventListener('submit', searchAddressHandler);
