require("./bot.js"); // ← LANCE TON BOT AUTOMATIQUEMENT

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

const CLIENT_ID = "1519078404408737944";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = "https://lookup-backend-paux.onrender.com/auth/callback";
const REQUIRED_GUILD = "1519446526093688983";

const app = express();

app.use(cors({
    origin: "https://lookup-by-pyro-xlm.web.app",
    credentials: true
}));

app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ["identify", "guilds"]
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.get("/auth/discord", passport.authenticate("discord"));

app.get("/auth/callback", passport.authenticate("discord", {
    failureRedirect: "/"
}), (req, res) => {
    res.redirect("https://lookup-by-pyro-xlm.web.app");
});

app.get("/me", (req, res) => {
    if (!req.user) {
        return res.json({ authenticated: false });
    }

    const inGuild = req.user.guilds?.some(g => g.id === REQUIRED_GUILD);

    if (!inGuild) {
        return res.json({
            authenticated: false,
            reason: "not_in_guild"
        });
    }

    res.json({
        authenticated: true,
        username: req.user.username,
        id: req.user.id,
        avatar: req.user.avatar
    });
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});
