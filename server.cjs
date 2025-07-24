const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();
const app = express();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:8080", // ให้ตรงกับ frontend
  credentials: true
}));

app.use(session({ secret: "secretkey", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// === Passport Google Strategy ===
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("Google profile:", profile); // เพิ่ม log นี้
      // ...existing code...
    } catch (err) {
      console.error("Google OAuth error:", err); // เพิ่ม log error
      return done(err);
    }
  }
));

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

// === Routes ===

// หน้าแรก
app.get("/", (req, res) => {
  res.send(`<h1>Welcome! <a href="/auth/google">Login/Register with Google</a></h1>`);
});

// 🚪 เริ่ม Login/Register ด้วย Google
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/api/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// ✅ Callback กลับหลัง login/register
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    res.redirect("http://localhost:8080/login-success");
  }
);

// หน้า Login สำเร็จ
app.get("/login-success", (req, res) => {
  res.send(`<h1>Login Success</h1><p>Hello, ${req.user?.username || "User"}</p>`);
});

// หน้า Login ล้มเหลว
app.get("/login-failure", (req, res) => {
  res.send("<h1>Login Failed</h1>");
});


// === Email/Password Login ===
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db("users");
    const users = db.collection("users");
    // ค้นหาผู้ใช้จากอีเมล
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" });
    }
    // ตรวจสอบรหัสผ่าน (ตัวอย่าง: plaintext, ควรใช้ hash จริง)
    if (user.password !== password) {
      return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
    // ส่ง token กลับ (ตัวอย่าง: ส่ง email เป็น token, ควรใช้ JWT จริง)
    res.json({ token: user.email, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
});


app.listen(8081, () => {
  console.log("Server running on http://localhost:8081");
});