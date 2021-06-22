const fs = require('fs');

fs.readFile('./users_data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err)
    return 
  }
  let data = JSON.parse(jsonString)
});