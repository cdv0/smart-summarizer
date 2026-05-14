// server.js

// COMMAND TO START SERVER: node server/server.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateText } from "ai";
import { model } from "./gemini.js";
import { supabase } from "./supabase.js";

// ******************** SUMMARIZE **********************

// Sets up server. Creates API server. Allows requests from extension. Parses JSON body.
// The .use() commands are basically setting up settings
const app = express();  // Creates Express app/server object
app.use(cors());  // Enables CORS (allows frontend to make requests to backend/server from a different origin. Without this, browser block requests for security reasons)
app.use(express.json({ limit: "10mb" })); // Automatically parse incoming JSON request bodies. Converts JSON into req.body. Max request size is 10MB

// Endpoint called. Can name the endpoint anything intuitive
// app.post("/summarize", ...) means if a POST request comes to /summarize endpoint from the frontend, run this API function
// Use the appropriate HTTP method for Express based on what the function is doing
/*  Most express route handlers look like:
        app.get(..., (req, res) => {})
        app.post(..., (req, res) => {})
        app.put(..., (req, res) => {})
        app.delete(..., (req, res) => {})
    Add async typically in backend code, because they usually run asynchronously
*/
// API for both summarize page and summarize content
app.post("/summarize", async (req, res) => { 
  // req.body is shaped by user's input. So in frontend, we included html and summaryLength, so we can extract that in backend
  const { content, summaryLength = "short" } = req.body ?? {};

  const allowedLengths = ["short", "medium", "detailed"];
  const finalSummaryLength = allowedLengths.includes(summaryLength) ? summaryLength : "short";

  console.log("Incoming /summarizePage request");
  console.log("Has content:", typeof content === "string");  // typeof part is mainly for debugging
  console.log("Summary Length:", summaryLength);

  // If html is not a string, or no html was sent, return error
  if (typeof content !== "string" || !content) {
    return res.status(400).json({ error: "Missing or invalid content" });
  }

  // Gemini API call to execute Smart Summarizer
  try {
    const result = await generateText({
      model,
      system: `
        You summarize webpage content using only the provided content.

        Rules:
        1. Use only the provided content.
        2. Do not invent information.
        3. If the summary length is "short", write 1 to 3 sentences.
        4. If the summary length is "medium", write 4 to 7 sentences.
        5. If the summary length is "detailed", write 8 or more sentences.
      `,
        prompt: `
            Summary length: ${finalSummaryLength}

            Page content:
            ${content}
        `,
    });

    console.log("generateText result:", result);
    console.log("Returned AI-generated summary:", result.text);

    return res.json({ summary: result.text });

  } catch (err) {
    console.error("Smart Summarizer backend error:", err);

    // HTTP 500: Intenral server error
    return res.status(500).json({
      error: err?.message || "Failed to process",  // Send back the error from the API if it exists, or send "Failed to process" message
      details: err?.cause || null, // If err.cause exists, send that too
    });
  }
});

// AUTH NOTE: Auth routes almost always use POST so it sends data in the body instead of URL -- safer for sensitive date

// ******************** LOG IN **********************
app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ 
    user: data.user,
    session: data.session // Save session whenever user signs in
  });

})

// ******************** SIGN UP **********************
app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body ?? {};

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    return res.json({ user: data.user });
});

// ******************** SIGN OUT ********************
app.post("/signout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Get only the bearer token value

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  const { error } = await supabase.auth.admin.signOut(token); // 'admin.signOut' uses token to sign out. more used for backend/servers. auth.signOut uses the current logged in session automatically, meant for frontend usage

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({ success: true })
})


// ******************** EXPRESS SERVER **********************
// Starts the Express server and tells it to listen for incoming requests on port 3000
// Port 3000 is a commonly used development port for backend servers. We could have used any port and it would work.
app.listen(3000, () => {
  console.log("Smart Summarizer server running on port 3000");
});