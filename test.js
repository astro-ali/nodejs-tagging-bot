const fs = require('fs');

fs.readFile('./users_data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err)
    return 
  }
  let data = JSON.parse(jsonString)
});

// collecting user data
// let current_data = {};
// fs.readFile('./users_data.json', 'utf8', (err, jsonString) => {
//     if (err) {
//       console.log("File read failed:", err)
//       return 
//     }
//     current_data = JSON.parse(jsonString);
// });
// let user_name = ctx.message.from.username;
// users_set = new Set(current_data.table);
// users_set.add(user_name);
// array_form_set = Array.from(users_set);
// let json_to_json = {
//     "table": array_form_set
// }
// console.log(json_to_json);
// fs.writeFile("users_data.json", JSON.stringify(json_to_json), function(err){
//     if (err){
//         console.log(err);
//     }
//     else {
//         console.log('User data stored!');
//     }
// });