import express  from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is the general route");
})

export default router;
