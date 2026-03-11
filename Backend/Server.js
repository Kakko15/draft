const Express = require('express');
const Cors = require('cors');
const DotEnv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

DotEnv.config();

const App = Express();
const Port = process.env.PORT || 3000;

App.use(Cors());
App.use(Express.json());

const Supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

App.get('/Api/Health', (Req, Res) => {
    Res.status(200).json({ Status: 'Active', System: 'SmartClearance' });
});

App.listen(Port, () => {
    console.log(`ServerActive:${Port}`);
});