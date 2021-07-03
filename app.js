const express = require('express');
const cors = require('cors');

// routers
const authRoutes = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const vendorRouter = require('./routes/vendorRoutes');

const notificationRouter = require('./routes/notificationRoutes');

const orderRouter = require('./routes/orderRoutes');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;


// start express
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// swagger js initial config
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Gas & Me API",
            description: `A proposed solution 
            (Web and Mobile App) for LPG(Cooking Gas) 
            retailing across Africa.`,
            version: "1.0.0",
            contact: {
                name: "Backend Team",
                email: "sammygopeh@gmail.com",
                url: "https://www.comingup.com"
            }
        },
        servers: [
            {
                url: "https://gas-and-me-api.herokuapp.com"
            },
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ["./docs/*.js"]
}

// Generate swagger specifications
const specs = swaggerJsDoc(options);


// Routes
app.use('/auth', authRoutes);
app.use('/user', userRouter);
app.use('/vendor', vendorRouter);

app.use('/notifications', notificationRouter);

app.use('/order', orderRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req, res) => {
    return res.status(200).json({message: 'Welcome to Gas & Me'})
});

module.exports = app;   