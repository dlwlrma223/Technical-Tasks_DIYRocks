1. Which real-time approach did you choose and why? What are the trade-offs you considered?

I chose Polling, sending a GET request to the server every 5 seconds. On the frontend, I use angular.equals for deep comparison so that the DOM is only updated when the events have actually changed.

Reason: It is simple to develop, and since this is a small project, polling is enough.

2. The priority-based eviction logic — how would this change if we needed to persist events to a database? What would you change in the architecture?

If we use a database to save data, the way we get and change events in the service would change. Instead of using an in-memory array, we would query the database.

For example, array.filter to get priority events and reduce to get oldest low priority events ,
it will be change using MySQL. We would first define an Event model (use knex.js builder), then use methods like Event.find, Event.create to do.

3. If this needed to handle 10,000 connected clients, what would break first and what would you change?

Polling will be break first. 10,000 clients each sending a GET request every 5 seconds would be too much for Node.js to handle. I would switch to SSE or WebSocket so that the server push update to clients, significantly reducing the number of requests.

4. What did you intentionally leave out that you would add for production?

- Add a database to save data, so that events are not lost when the server shuts down.
- Add role/permission function to all users from allow to create events, which could lead to too many requests.
- Improve the frontend layout by adding a Font Awesome loading icon to make the page more user-friendly.