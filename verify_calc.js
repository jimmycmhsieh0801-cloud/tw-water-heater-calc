const assert = require("assert");
const { calcWaterHeater } = require("./app.js");
const r = calcWaterHeater(2, 5, 20, 1.5);
assert(r.monthlyKwh > 90 && r.monthlyElecCost > 450);
console.log("WATER_HEATER_TESTS_PASSED");