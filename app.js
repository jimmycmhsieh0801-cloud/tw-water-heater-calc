function calcWaterHeater(people, rate, tempRise = 20, standbyKwhPerDay = 1.5) {
  const p = Math.max(1, Number(people) || 1);
  const r = Math.max(0, Number(rate) || 0);
  const dt = Math.max(1, Number(tempRise) || 20);
  const sb = Math.max(0, Number(standbyKwhPerDay) || 0);
  // 40L per person * 1.163 Wh/(L*C) / 1000 / 0.92 efficiency
  const dailyHeatKwh = (p * 40 * dt * 1.163) / 1000 / 0.92;
  const monthlyKwh = (dailyHeatKwh + sb) * 30;
  const monthlyElecCost = Math.round(monthlyKwh * r);
  const monthlyGasCost = Math.round(monthlyElecCost * 0.42);
  return { monthlyKwh: Math.round(monthlyKwh * 10) / 10, monthlyElecCost, monthlyGasCost };
}
if (typeof document !== "undefined") {
  const ids = ["peopleInput", "elecRateInput", "tempRiseInput", "standbyInput"];
  function render() {
    const [p, rate, dt, sb] = ids.map(id => document.getElementById(id).value);
    const res = calcWaterHeater(p, rate, dt, sb);
    document.getElementById("whKwhEl").textContent = `${res.monthlyKwh} 度`;
    document.getElementById("whCostEl").textContent = `NT$ ${res.monthlyElecCost.toLocaleString()}`;
    document.getElementById("gasCostEl").textContent = `約 NT$ ${res.monthlyGasCost.toLocaleString()}`;
  }
  ids.forEach(id => document.getElementById(id).addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcWaterHeater };