const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json()); 


const allowedOrigins = [
  'http://localhost:3000',
  'https://cinema-ms.vercel.app'  
];


const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


app.use(cors(corsOptions));


mongoose.connect('mongodb+srv://manoj852407:cJBHyB30RYfvM2g8@stone-paper-scissors.takw4.mongodb.net/?retryWrites=true&w=majority&appName=stone-paper-scissors', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Failed to connect to MongoDB", err);
});

const cinemaRoutes = require('./routes/cinema');
const theatreRoutes = require('./routes/theatre');
const screenRoutes = require('./routes/screen');
const seatRoutes = require('./routes/seat');
const movieRoutes = require('./routes/movie');
const showtimeRoutes = require('./routes/showtime');


app.use('/api', cinemaRoutes);
app.use('/api', theatreRoutes);
app.use('/api', screenRoutes);
app.use('/api', seatRoutes);
app.use('/api', movieRoutes);
app.use('/api', showtimeRoutes);


app.get('/', (req, res) => {
  res.send('Cinema Theatre System API');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
