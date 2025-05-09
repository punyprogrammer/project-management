// Import required modules
import express from "express"; // Express web framework
import dotenv from "dotenv"; // Loads environment variables from a .env file
import morgan from "morgan"; // HTTP request logger middleware
import helmet from "helmet"; // Helps secure Express apps by setting HTTP headers
import bodyParser from "body-parser"; // Parses incoming request bodies
import cors from "cors"; // Enables Cross-Origin Resource Sharing

// Route imports (you can add your route imports here)

// Load environment variables from .env file
dotenv.config();

// Initialize an Express application
const app = express();

// Middleware configuration

app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Apply security-related HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Allow cross-origin resource sharing for images, etc.

app.use(morgan("common")); // Log HTTP requests using the "common" format
app.use(bodyParser.json()); // Parse application/json requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(cors()); // Enable CORS for all routes

// Define routes

// Root route - responds to GET requests at the root URL
app.get("/", (req, res) => {
  res.send("This is the home router"); // Send a simple text response
});

// Server setup

const port = process.env.PORT || 8000; // Use PORT from .env or default to 8000

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`The backend is running on port ${port}`);
});
