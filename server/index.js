const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Auth routes
app.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ token });
});

// Protected routes
app.get('/nutrition', async (req, res) => {
  const nutrition = await prisma.nutrition.findMany();
  res.json(nutrition);
});

app.get('/workouts', async (req, res) => {
  const workouts = await prisma.workout.findMany();
  res.json(workouts);
});

app.get('/profiles', authenticateToken, async (req, res) => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user.id } });
  res.json(profile);
});

app.post('/profiles', authenticateToken, async (req, res) => {
  const profile = await prisma.profile.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.json(profile);
});

app.get('/weekly-plans', authenticateToken, async (req, res) => {
  const plans = await prisma.weeklyPlan.findMany({ where: { userId: req.user.id } });
  res.json(plans);
});

app.post('/weekly-plans', authenticateToken, async (req, res) => {
  const plan = await prisma.weeklyPlan.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.json(plan);
});

app.get('/progress', authenticateToken, async (req, res) => {
  const progress = await prisma.progressEntry.findMany({ where: { userId: req.user.id } });
  res.json(progress);
});

app.post('/progress', authenticateToken, async (req, res) => {
  const entry = await prisma.progressEntry.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.json(entry);
});

app.get('/checklist', authenticateToken, async (req, res) => {
  const items = await prisma.checklistItem.findMany({ where: { userId: req.user.id } });
  res.json(items);
});

app.post('/checklist', authenticateToken, async (req, res) => {
  const item = await prisma.checklistItem.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});