import axios from 'axios';

export const getCount = () => {
  //setIsLoading(true);
  
    axios('http://localhost:8090/counts')
      .then(response => {
        //setIsLoading(false);
        console.log(response.data);
        document.getElementById("msg").innerHTML = "<center><h1>" + response.data.totalPop + "</h1></center>";
      })
      .catch(error => {
        //setIsLoading(false);
        console.error('Error fetching data:', error);
        document.getElementById("msg").innerHTML = "<h3>Error fetching data</h3>";
      });
  }

