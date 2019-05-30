import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewPerson = personObject => axios.post(`${firebaseUrl}/people.json`, personObject);

export default { addNewPerson };
