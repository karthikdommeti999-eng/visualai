
import dotenv from 'dotenv';
// import fetch from 'node-fetch'; // Native fetch is available in Node 18+

dotenv.config();

console.log("\n========================================");
console.log("      VISUAL AI CONNECTION DOCTOR      ");
console.log("========================================\n");

async function runDiagnostics() {
    let hasError = false;

    // 1. Check API Key
    console.log("1. Checking Environment Variables...");
    if (process.env.OPENROUTER_API_KEY) {
        console.log("   ✅ OPENROUTER_API_KEY found.");
    } else {
        console.log("   ❌ OPENROUTER_API_KEY is MISSING in .env file.");
        console.log("      --> Logic: The key is required to talk to the AI brain.");
        hasError = true;
    }

    // 2. Check Backend Server
    console.log("\n2. Pinging Local Backend (http://localhost:5001)...");
    try {
        const healthCheck = await fetch('http://localhost:5001/api/health');
        if (healthCheck.ok) {
            const data = await healthCheck.json();
            console.log("   ✅ Server is ONLINE.");
            console.log(`   ℹ️  Status: ${data.status}`);
            console.log(`   ℹ️  Brain Link: ${data.brain}`);
        } else {
            console.log(`   ❌ Server returned error: ${healthCheck.status}`);
            hasError = true;
        }
    } catch (error) {
        console.log("   ❌ Server is unreachable.");
        console.log("      --> Error: " + error.message);
        console.log("      --> Solution: Ensure 'npm run dev:full' is running in another terminal.");
        hasError = true;
    }

    // 3. Test External AI Connection
    if (!hasError) {
        console.log("\n3. Testing Direct AI Brain Connection (OpenRouter)...");
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-chat",
                    "messages": [{ "role": "user", "content": "Ping" }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("   ✅ AI Brain responded successfully.");
                // console.log("      --> Response: " + data.choices[0].message.content);
            } else {
                console.log(`   ❌ AI Brain Connection Failed: ${response.status}`);
                const err = await response.text();
                console.log("      --> Details: " + err);
                hasError = true;
            }
        } catch (error) {
            console.log("   ❌ Failed to reach OpenRouter Network.");
            console.log("      --> " + error.message);
            hasError = true;
        }
    } else {
        console.log("\n⚠️  Skipping Step 3 due to previous errors.");
    }

    console.log("\n========================================");
    if (!hasError) {
        console.log("🎉 DIAGNOSTIC PASSED: SYSTEM IS 100% HEALTHY");
        console.log("   You can confidently use the AI Coach.");
    } else {
        console.log("🛑 DIAGNOSTIC FAILED: See above for details.");
    }
    console.log("========================================\n");
}

runDiagnostics();
