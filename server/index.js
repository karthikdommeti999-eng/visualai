import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the React client build
app.use(express.static(path.join(__dirname, '../dist')));

// Mock AI Logic (In production, this would call OpenAI API)
const generateAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('workout') || lowerMsg.includes('plan')) {
        return "Based on your profile, I recommend a High-Intensity Interval Training (HIIT) session today. 20 minutes active, 10 minutes rest. Focus on burpees and mountain climbers.";
    }
    if (lowerMsg.includes('diet') || lowerMsg.includes('food')) {
        return "For muscle recovery, ensure you're getting 2g of protein per kg of bodyweight. Try adding a whey protein shake or chicken breast to your next meal.";
    }
    if (lowerMsg.includes('pain') || lowerMsg.includes('hurt')) {
        return "If you're experiencing pain, please stop immediately. It might be due to poor form. Rest for 24 hours and try applying ice if there's swelling.";
    }
    return "I'm analyzing your request... As your AI Fitness Coach, I suggest keeping your heart rate between 140-160 BPM for optimal fat loss today. How else can I assist you?";
};

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Simulate AI processing delay
        setTimeout(() => {
            const response = generateAIResponse(message);
            res.json({
                reply: response,
                timestamp: new Date().toISOString(),
                aiModel: 'ChatGPT-4o-Sport'
            });
        }, 1000);

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ error: 'Failed to process AI request' });
    }
});

// Handle React routing, return all requests to React app
app.use((req, res) => {
    // Check if request is for API
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Keep process alive just in case
    setInterval(() => { }, 10000);
});
