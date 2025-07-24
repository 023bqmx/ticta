
const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");

// const { MongoClient } = require("mongodb");
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:8080", // frontend
  credentials: true
}));

app.use(session({ secret: "secretkey", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// === Google OAuth Strategy ===
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("Google profile:", profile);

      // ✅ ใช้ object mock แทน MongoDB
      const user = {
        googleId: profile.id,
        username: profile.displayName,
        email: profile._json.email,
        photo: profile._json.picture
      };
      return done(null, user);

      // ❌ โค้ดเดิม (ใช้ MongoDB)
      /*
      await client.connect();
      const db = client.db("users");
      const users = db.collection("users");

      let user = await users.findOne({ googleId: profile.id });
      if (!user) {
        user = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile._json.email,
          photo: profile._json.picture
        };
        await users.insertOne(user);
      }
      return done(null, user);
      */

    } catch (err) {
      console.error("Google OAuth error:", err);
      return done(err);
    }
  }
));

// ✅ serialize ทั้ง object
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// ❌ โค้ดเดิม (ใช้ MongoDB)
/*
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
  await client.connect();
  const db = client.db("users");
  const users = db.collection("users");
  const user = await users.findOne({ googleId: id });
  done(null, user);
});
*/

// === Routes ===
app.get("/", (req, res) => {
  res.send(`<h1>Welcome! <a href="/auth/google">Login/Register with Google</a></h1>`);
});

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    // ✅ Redirect ไป frontend (เปลี่ยนได้ตาม dev/prod)
    res.redirect("http://localhost:8080/dashboard");
  }
);

app.get("/login-success", (req, res) => {
  res.send(`<h1>Login Success</h1><p>Hello, ${req.user?.username || "User"}</p>`);
});

app.get("/login-failure", (req, res) => {
  res.send("<h1>Login Failed</h1>");
});

// ข้อมูลผู้ใช้หลัง login
app.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// === Email/Password Login แบบธรรมดา (mock) ===
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ❌ MongoDB
    /*
    await client.connect();
    const db = client.db("users");
    const users = db.collection("users");
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
    res.json({ token: user.email, username: user.username });
    */

    // ✅ mock login ชั่วคราว
    if (email === "test@example.com" && password === "123456") {
      return res.json({ token: email, username: "Test User" });
    } else {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});

// Start server
app.listen(8081, () => {
  console.log("✅ Server running on http://localhost:8081");
});