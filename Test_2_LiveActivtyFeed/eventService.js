var MAX_SIZE = 50;
var events = [];

//private function 1
function validate(data) {
  if (!data.type || !data.message || !data.priority) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  var priorityEnum = ["low", "normal", "high"];
  if (!priorityEnum.includes(data.priority)) {
    return {
      success: false,
      error: "priority must be one of 'low', 'normal', or 'high'",
    };
  }

  return { success: true };
}

//private function 2
function filterEvents() {
  var notHighEvents = events.filter(function (event) {
    return event.priority !== "high";
  });

  if (notHighEvents.length == 0) {
    return false;
  }

  var lowEvents = notHighEvents.filter(function (event) {
    return event.priority == "low";
  });

  var beDroppedEvent = lowEvents.length > 0 ? lowEvents : notHighEvents;

  var oldest = beDroppedEvent.reduce(function (event, currEvent) {
    return new Date(event.timestamp) < new Date(currEvent.timestamp)
      ? event
      : currEvent;
  });

  events.splice(events.indexOf(oldest), 1);
  return true;
}

// public functions 
function createEvent(data) {
  var validation = validate(data);
  if (!validation.success) {
    return { success: false, status: 422, error: validation.error };
  }

  if (events.length >= MAX_SIZE) {
    var filter = filterEvents();
    if (!filter) {
      return {
        success: false,
        status: 429,
        error:
          "No more events can be created (maximum 50 high-priority events).",
      };
    }
  }

  var event = {
    id: Date.now() + "-" + Math.random().toString(36).substr(2, 5),
    type: data.type,
    message: data.message,
    priority: data.priority,
    timestamp: new Date().toISOString(),
  };

  events.push(event);
  return { success: true, event: event };
}

function getEvents() {
  return events.slice().sort(function (a, b) {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
}

function getCounts() {
  return {
    low: events.filter(function (event) {
      return event.priority == "low";
    }).length,
    normal: events.filter(function (event) {
      return event.priority == "normal";
    }).length,
    high: events.filter(function (event) {
      return event.priority == "high";
    }).length,
  };
}

module.exports = {
  createEvent: createEvent,
  getEvents: getEvents,
  getCounts: getCounts,
};
