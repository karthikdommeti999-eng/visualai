import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils'; // Assuming this exists

export const AICoach = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("OFFLINE"); // "OFFLINE", "LISTENING", "PROCESSING", "SPEAKING"
    const [messages, setMessages] = useState([]); // Keep track for context, but don't show text by default if requested
    const [audioData, setAudioData] = useState(new Array(5).fill(10)); // For visualizer

    // --- VOICE RECOGNITION SETUP ---
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false; // Stop after one sentence
            recognition.lang = 'en-US';

            recognition.onstart = () => setStatus("LISTENING");

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                handleUserQuery(transcript);
            };

            recognition.onerror = () => setStatus("IDLE");
            recognition.onend = () => {
                // If we were listening and it just stopped silence, go back to idle
                if (status === "LISTENING") setStatus("IDLE");
            };

            recognitionRef.current = recognition;
        }
    }, [status]);

    const startListening = () => {
        if (status === "SPEAKING") window.speechSynthesis.cancel();
        recognitionRef.current?.start();
        setStatus("LISTENING");
    };

    // --- AI RESPONSE & TTS ---
    const handleUserQuery = async (text) => {
        setStatus("PROCESSING");

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            if (!res.ok) throw new Error("Brain Disconnected");
            const data = await res.json();

            speak(data.reply);

        } catch (err) {
            speak("I am currently unable to connect to the neural network. Please check your connection.");
        }
    };

    const speak = (text) => {
        setStatus("SPEAKING");
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Mark'));
        if (preferred) utterance.voice = preferred;

        utterance.onend = () => setStatus("IDLE");
        window.speechSynthesis.speak(utterance);
    };

    // --- VISUALIZER ANIMATION LOOP ---
    useEffect(() => {
        let animationFrame;
        const animate = () => {
            if (status === "SPEAKING" || status === "LISTENING") {
                // Generate random heights for the bars
                setAudioData(prev => prev.map(() => Math.random() * 40 + 10));
            } else if (status === "PROCESSING") {
                setAudioData([20, 20, 20, 20, 20]); // Pulse or flat
            } else {
                setAudioData([5, 5, 5, 5, 5]); // Flatline
            }
            animationFrame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, [status]);


    // --- STOP SPEECH ON EXIT ---
    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);


    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden text-cyan-400 font-mono">

            {/* --- TOP CONTROLS --- */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-20">
                <Button variant="ghost" className="text-cyan-500 hover:text-white" onClick={() => navigate('/')}>
                    <ArrowLeft size={24} /> <span className="ml-2 hidden sm:inline">EXIT SYSTEM</span>
                </Button>
                <div className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full", status === "OFFLINE" ? "bg-red-500" : "bg-green-500 animate-pulse")} />
                    <span className="text-xs tracking-widest opacity-70">{status}</span>
                </div>
            </div>

            {/* --- CENTRAL INTERFACE (EYES & MOUTH) --- */}
            <div className="relative z-10 flex flex-col items-center gap-12 cursor-pointer" onClick={startListening}>

                {/* EYES */}
                <div className="flex gap-16 relative">
                    {/* Left Eye */}
                    <div className={cn("w-24 h-8 border-t-4 border-cyan-400 rounded-t-full shadow-[0_-5px_20px_rgba(0,255,255,0.5)] transition-all duration-300",
                        status === "LISTENING" ? "scale-y-150 border-cyan-200" : "scale-y-100",
                        status === "PROCESSING" ? "animate-pulse" : "")} />

                    {/* Right Eye */}
                    <div className={cn("w-24 h-8 border-t-4 border-cyan-400 rounded-t-full shadow-[0_-5px_20px_rgba(0,255,255,0.5)] transition-all duration-300",
                        status === "LISTENING" ? "scale-y-150 border-cyan-200" : "scale-y-100",
                        status === "PROCESSING" ? "animate-pulse" : "")} />
                </div>

                {/* MOUTH / AUDIO VIZ */}
                <div className="h-16 flex items-center justify-center gap-2">
                    {audioData.map((height, i) => (
                        <div
                            key={i}
                            style={{ height: `${height}px` }}
                            className="w-3 bg-gradient-to-t from-cyan-600 to-white rounded-full transition-all duration-75 shadow-[0_0_10px_cyan]"
                        />
                    ))}
                </div>

                {/* STATUS TEXT PROMPT */}
                <div className="text-center mt-8 space-y-2">
                    {status === "IDLE" && (
                        <p className="text-sm tracking-[0.2em] animate-pulse text-cyan-500/60">TAP SCREEN TO SPEAK</p>
                    )}
                    {status === "LISTENING" && (
                        <p className="text-lg tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">LISTENING...</p>
                    )}
                    {status === "PROCESSING" && (
                        <p className="text-lg tracking-widest text-cyan-200 animate-bounce">THINKING...</p>
                    )}
                </div>

            </div>

            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

        </div>
    );
};
