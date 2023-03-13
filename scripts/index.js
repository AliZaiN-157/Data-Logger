// after every 5 sec getAllData function will be called

// setInterval(() => {
//   const result = window.backendConnector.invoke("getAllData");
//   result.then((res) => console.log(res));
// }, 5000);

const result = window.backendConnector.invoke("getAllData");
result.then((res) => console.log(res));
