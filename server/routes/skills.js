const express = require("express");
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all skills (with optional search)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
    const skills = await Skill.find(filter).sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a new skill (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newSkill = new Skill({
      title,
      description,
      category,
      offeredBy: req.user.id,
      ownerName: req.user.name,
    });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete a skill (protected, only owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    if (skill.offeredBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
