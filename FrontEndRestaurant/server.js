const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 8081;

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Raidenshogun18042004',
  database: 'csit'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware để xử lý JSON payloads
app.use(express.json());
app.use(cors());

app.put('/restaurant/signup', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra email đã tồn tại
  connection.query('SELECT * FROM restaurants WHERE Email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.status(401).json({ message: 'Email already registered' });
      return;
    }

    // Chèn dữ liệu mới vào bảng restaurants
    const addRestaurant = `
      INSERT INTO restaurants (Email, Password, res_name, res_category, res_address, start_time, end_time, Phone, post_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const res_name = 'New Restaurant'; 
    const res_category = 'fast_food'; 
    const res_address = '123 New Address'; 
    const start_time = '08:00:00'; 
    const end_time = '22:00:00'; 
    const phone = '1234567890'; 
    const post_code = '12345'; 

    connection.query(addRestaurant, [email, password, res_name, res_category, res_address, start_time, end_time, phone, post_code], (error, results) => {
      if (error) {
        console.error('Error inserting new restaurant:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }

      res.status(201).json({ message: 'Restaurant registered' });
    });
  });
});
// Middleware để xử lý JSON payloads
app.use(express.json());
app.use(cors());

app.post('/customers/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM restaurants WHERE email = ? AND password = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Restaurant owner logged in' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
