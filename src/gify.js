export default class Gify {

    async getGif(percent) {
        let level = 'you-tried';
    
        if (percent >= 90) {
          level = 'unicorn';
        } else if (percent < 89 && percent > 75) {
          level = 'amazing';
        } else if (percent <= 35) {
          level = 'trash-fire';
        }
        try {
          let response = await fetch(`https://api.giphy.com/v1/stickers/random?api_key=h5McL5EQHo1vpCQAUyNI9CcSQaa01NUU&tag=${level}&rating=PG-13`);
          let { data: { images: { original:{ url } }} } = await response.json();
          
          return url;
        } catch(error) {
          console.log("ERROR ERROR!" + error.message);
        }
      }
}