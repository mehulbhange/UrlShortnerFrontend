import axios from "axios";

const BASE_URL = "http://localhost:8081/";

class ShortUrlService{

    async addUrl(longUrl){
        return await axios.post("http://localhost:8081/addUrl", longUrl);
    }

    

}

export default new ShortUrlService();