export const corsOptions = {
  origin: ["http://localhost:3000", "https://ticktocktreasures.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Add this if cookies or credentials are required
};
