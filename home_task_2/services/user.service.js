const service = require("./users.service");
const router = require("../routes/users/route");

router.addRoute("GET", "/", async (req, res) => {
  try {
    const data = await service.showUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});


router.addRoute("PUT", "/user/:id", async (req, res) => {
   const userId = parseInt(req.params.id);
  try {

     if (isNaN(userId) || userId <= 0) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid user ID" }));
    }

    const data = await service.getUser(userId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});
router.addRoute("POST", "/add", (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    const userData = JSON.parse(body);
    const newUser = service.addUser(userData);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  });
});


router.addRoute("DELETE", "/delete", (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    const userData = JSON.parse(body);
    const deletedUser = service.deleteUser(userData);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(deletedUser));
  });
});


module.exports = router;
