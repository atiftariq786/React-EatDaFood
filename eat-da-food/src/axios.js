import axios from "axios";

const instance = axios.create({
    baseURL:"https://eat-da-food.firebaseio.com/"
});

export default instance;