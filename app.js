const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const xlsx = require('xlsx')

const app = express();

app.set('view engine', 'ejs');

const workbook = xlsx.readFile(__dirname +"/akario-admin.xlsx")

const rolesWorkSheet = workbook.Sheets["roles"]
const eventsWorkSheet = workbook.Sheets["events"]

const rolesData = xlsx.utils.sheet_to_json(rolesWorkSheet)
const eventsData = xlsx.utils.sheet_to_json(eventsWorkSheet)

for (let rolsee of rolesData) {
  rolsee.role =  textToBinary(String(rolsee.role))
}

for (let event of eventsData) {
  event.event = textToBinary(String(event.event))
  event.event_result = textToBinary(String(event.event_result))
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render("main")
})

app.get('/store', (req, res) => {
  res.render("store")
})

app.get('/admin', (req, res) => {

  res.render("admin", {
    roles: rolesData,
    events: eventsData
  })
})

function textToBinary(input) {
  let output = "";
  output = input
    .split("")
    .map((latter) => latter.charCodeAt(0))
    .map((latter) => latter.toString(2))
    .join(" ");

  return output;
}

app.listen(process.env.PORT || 4000, function() {
  console.log("Server started on port 4000");
});
