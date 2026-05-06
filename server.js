require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Furever Companions API is running' });
});

// Patients
let patients = [];
app.get('/api/patients', (req, res) => res.json(patients));
app.post('/api/patients', (req, res) => {
  const patient = { id: Date.now(), ...req.body };
  patients.push(patient);
  res.json(patient);
});
app.put('/api/patients/:id', (req, res) => {
  const idx = patients.findIndex(p => p.id == req.params.id);
  if (idx >= 0) { patients[idx] = { ...patients[idx], ...req.body }; res.json(patients[idx]); }
  else res.status(404).json({ error: 'Patient not found' });
});

// SOAP Notes
let soapNotes = [];
app.get('/api/soap', (req, res) => res.json(soapNotes));
app.post('/api/soap', (req, res) => {
  const note = { id: Date.now(), ...req.body };
  soapNotes.push(note);
  res.json(note);
});

// Invoices
let invoices = [];
app.get('/api/invoices', (req, res) => res.json(invoices));
app.post('/api/invoices', (req, res) => {
  const invoice = { id: Date.now(), ...req.body };
  invoices.push(invoice);
  res.json(invoice);
});

// Inventory
let inventory = [];
app.get('/api/inventory', (req, res) => res.json(inventory));
app.post('/api/inventory', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  inventory.push(item);
  res.json(item);
});

// DEA Log
let deaLog = [];
app.get('/api/dea', (req, res) => res.json(deaLog));
app.post('/api/dea', (req, res) => {
  const entry = { id: Date.now(), ...req.body };
  deaLog.push(entry);
  res.json(entry);
});

// Vaccines
let vaccines = [];
app.get('/api/vaccines', (req, res) => res.json(vaccines));
app.post('/api/vaccines', (req, res) => {
  const vax = { id: Date.now(), ...req.body };
  vaccines.push(vax);
  res.json(vax);
});

app.listen(PORT, () => {
  console.log(`Furever Companions running on port ${PORT}`);
});
