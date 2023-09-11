const express = require("express");
const rateLimit = require("express-rate-limit");
const { Client } = require("@notionhq/client");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Notion setup
const authToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionDbID = process.env.NOTION_DATABASE_ID;
const notion = new Client({ auth: authToken });

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/NotionAPIPost", limiter);

// API route for posting data to Notion
app.post("/NotionAPIPost", async (req, res) => {
  try {
    const { Name, Email, Message } = req.body;

    // Create a new page in the Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: notionDbID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: Name,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              text: {
                content: Email,
              },
            },
          ],
        },
        Message: {
          rich_text: [
            {
              text: {
                content: Message,
              },
            },
          ],
        },
      },
    });

    res.status(201).json({ message: "Success", data: response });
    console.log("Success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
