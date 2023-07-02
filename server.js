const express = require('express');
const db = require('./database/db');
const { fullDB } = require('./database/tools');

const { REDIS_PORT, REDIS_URL, SESSION_SECRET } = require('./config/config');
const cors = require('cors');

// Redis
const session = require("express-session");
const RedisStore = require("connect-redis").default
const { createClient } = require("redis")

// Routes
const libraryRouter = require('./routes/libraryRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

const connectWithRetry = () => {
  db.authenticate()
    .then(() => {
      console.log('Successfully connected to MySQL on port 3306!')
      // Full DB from CSV
      // fullDB();
    })
    .catch(err => {
        console.error('Something went wrong', err);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// App Trust Proxy
app.set('trust proxy', 1);

// CORS
corsOptions = {
  origin: 'team5.com.ar',
  credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());


// Redis ------
// Initialize client.
let redisClient = createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT
  }
})


redisClient.connect()
.then(() => console.log(`Redis client connected on ${REDIS_URL}:${REDIS_PORT}`))
.catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:"
})

// Initialize sesssion storage.
app.use(
  session({
    name: 'library-session',
    store: redisStore,
    secret: SESSION_SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 86400, // 1 day
      sameSite: 'lax' // make sure sameSite is not none
    }
  })
);

app.get('/api/v1', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    }
);

// Custom Routes
app.use("/api/v1/libraries", libraryRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
    }
);
