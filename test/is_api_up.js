(async function () {
    console.log("We're going to test if the API is responding");

    const url = 'https://api.spacetraders.io/v2/';
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.status);
      console.log("version: " + data.version);
    } catch (error) {
      console.error(error);
    }
})()