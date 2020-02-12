function getZone() {
  if (!global["Zone"]) {
    require("zone.js");
  }
  return global["Zone"];
}

exports.getZone = getZone;
