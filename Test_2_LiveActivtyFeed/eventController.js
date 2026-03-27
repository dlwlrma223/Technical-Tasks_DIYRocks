var express = require("express");
var router = express.Router();
var eventService = require("./eventService");

router.get("/events", function (req, res) {
  try {
    res.json({
      events: eventService.getEvents(),
      counts: eventService.getCounts(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to load events",
    });
  }
});

router.post("/events", function (req, res) {
  try {
    var result = eventService.createEvent(req.body);
    if (!result.success) {
      return res.status(result.status).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create event",
    });
  }
});

module.exports = router;
