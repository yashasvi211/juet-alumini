// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating OTPs

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: 'mysql-cb57fd2-yashasvi3000-7705.l.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_c1KiOI-NgVD1VJLOyPv',
    database: 'alumni',
    port: 24692,
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your email service
    auth: {
        user: 'anujkumarsharma267@gmail.com', // Your email
        pass: 'mato ricb wqcg cbys' // Your email password (use an app password for security)
    },
});

// Store OTPs temporarily (in-memory for simplicity)
let otpStore = {};

// Endpoint to send OTP
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a random 6-digit OTP
    otpStore[email] = otp; // Store OTP temporarily

    const mailOptions = {
        from: 'Juet Alumni',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to email.' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email]; // Remove OTP after verification
        res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid OTP.' });
    }
});

// Check if the database is connected
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Database connection successful');
        connection.release(); // Release the connection back to the pool
    }
});

// Endpoint to register a new user
app.post('/register', (req, res) => {
    const {
        personal_details,
        contact_details,
        professional_details,
    } = req.body;

    // Basic validation
    if (!personal_details.first_name || !personal_details.last_name ||
        !personal_details.email || !personal_details.course ||
        !personal_details.branch || !personal_details.password ||
        !personal_details.about) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Insert personal details
    const personalQuery = `
        INSERT INTO personal_details (first_name, last_name, email, course, branch, password, about, roll_number, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(personalQuery, [
        personal_details.first_name,
        personal_details.last_name,
        personal_details.email,
        personal_details.course,
        personal_details.branch,
        personal_details.password, // Ensure this is hashed
        personal_details.about,
        personal_details.roll_number || null, // optional field
        personal_details.imageUrl || null, // optional field
    ], (err, personalResults) => {
        if (err) {
            console.error('Error inserting personal details:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Insert contact details if provided
        if (contact_details) {
            const contactQuery = `
                INSERT INTO contact_details (person_id, facebook, twitter, linkedin, phone_number, github, email)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            pool.query(contactQuery, [
                personalResults.insertId,
                contact_details.facebook || null, // optional field
                contact_details.twitter || null, // optional field
                contact_details.linkedin || null, // optional field
                contact_details.phone_number || null, // optional field
                contact_details.github || null, // optional field
                personal_details.email, // email is mandatory
            ], (err) => {
                if (err) {
                    console.error('Error inserting contact details:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
            });
        }

        // Insert professional details if provided
        if (professional_details) {
            const professionalQuery = `
                INSERT INTO professional_details (person_id, company_name, role, job_function, from_date, to_date)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            pool.query(professionalQuery, [
                personalResults.insertId,
                professional_details.company_name || null, // optional field
                professional_details.role || null, // optional field
                professional_details.job_function || null, // optional field
                professional_details.from_date || null, // optional field
                professional_details.to_date || null, // optional field
            ], (err) => {
                if (err) {
                    console.error('Error inserting professional details:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                // Respond with success
                res.status(201).json({ message: 'User registered successfully' });
            });
        } else {
            // Respond with success if no professional details are provided
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
});
// Endpoint to login a user
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const query = `
        SELECT * FROM personal_details WHERE email = ?;
    `;

    pool.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the passwords (you should hash passwords in production)
        if (user.password === password) {
            // Password is correct, send success response
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Endpoint to fetch all alumni data
app.get('/network', (req, res) => {
    const query = `
        SELECT pd.person_id AS id, 
               CONCAT(pd.first_name, ' ', pd.last_name) AS name, 
               pd.about, 
               YEAR(pr.from_date) AS year, 
               pd.imageUrl,  -- Add the imageUrl field here
               cd.facebook, 
               cd.twitter, 
               cd.linkedin, 
               cd.phone_number, 
               cd.github 
        FROM personal_details pd 
        LEFT JOIN professional_details pr ON pd.person_id = pr.person_id 
        LEFT JOIN contact_details cd ON pd.person_id = cd.person_id 
        WHERE pr.to_date IS NULL 
        ORDER BY pd.person_id;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error querying the database:', error);
            return res.status(500).send('Server error');
        }
        res.json(results);
    });
});

// Endpoint to get profile data by person_id
app.get('/user-profile/:personId', (req, res) => {
    const personId = req.params.personId;

    const query = `
        SELECT pd.first_name, pd.last_name, pd.branch, pd.course, pd.roll_number, 
               pd.imageUrl, 
               cd.facebook, cd.twitter, cd.linkedin, cd.github, cd.phone_number,
               pro.company_name, pro.role, pro.job_function, pro.from_date, pro.to_date
        FROM personal_details pd
        LEFT JOIN contact_details cd ON pd.person_id = cd.person_id
        LEFT JOIN professional_details pro ON pd.person_id = pro.person_id
        WHERE pd.person_id = ?;
    `;

    pool.query(query, [personId], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
        } else {
            if (results.length === 0) {
                res.status(404).send('No data found');
            } else {
                const userProfile = {
                    first_name: results[0].first_name,
                    last_name: results[0].last_name,
                    branch: results[0].branch,
                    course: results[0].course,
                    roll_number: results[0].roll_number,
                    imageUrl: results[0].imageUrl, // Include imageUrl
                    facebook: results[0].facebook,
                    twitter: results[0].twitter,
                    linkedin: results[0].linkedin,
                    github: results[0].github,
                    phone_number: results[0].phone_number,
                    experiences: results.map(row => ({
                        company_name: row.company_name,
                        role: row.role,
                        job_function: row.job_function,
                        from_date: row.from_date,
                        to_date: row.to_date
                    })).filter(exp => exp.company_name) // filter out empty experiences
                };

                res.json(userProfile);
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
