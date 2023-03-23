//import app
const app = require("./backend/app");
//make server listening on PORT 3000
app.listen(3002, () => {
  console.log("App is listening on PORT 3002...");
});
