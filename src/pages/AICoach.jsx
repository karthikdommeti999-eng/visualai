import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Send, Bot, Sparkles, Activity, Trash2, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export const AICoach = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "SYSTEM ONLINE. I am V-AI (Visual Artificial Intelligence). I am calibrated for high-performance athletic coaching. State your biometric status or requested training protocol."
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Cleanup Audio on Unmount
    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
        const voices = window.speechSynthesis.getVoices();
        // Try to find a robotic or deep voice if possible, otherwise default
        const preferred = voices.find(v => v.name.includes('Microsoft Mark') || v.name.includes('Google US English'));
        if (preferred) utterance.voice = preferred;
        utterance.rate = 1.05; // Slightly faster
        utterance.pitch = 0.9; // Slightly lower
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const text = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            if (!res.ok) throw new Error("Neural Link Unstable");

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            const reply = data.reply;
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            speak(reply);

        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "⚠️ **CONNECTION ERROR**: Neural link to core processor failed. Please verify API credits or network status."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Browser does not support voice input.");

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
        setIsListening(true);

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
    };

    return (
        <div className="flex flex-col h-screen bg-black text-white relative overflow-hidden font-mono">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-4 border-b border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-teal/20 flex items-center justify-center border border-brand-teal animate-pulse-slow">
                        <Bot className="text-brand-teal" size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-neon">V-AI COACH / 2.0</h1>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setMessages([])} className="text-gray-500 hover:text-red-500">
                        <Trash2 size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-gray-500 hover:text-white">
                        <ArrowLeft size={20} />
                    </Button>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={cn("flex gap-4 max-w-3xl mx-auto animate-fade-in", msg.role === 'user' ? "flex-row-reverse" : "")}>

                        {/* Avatar */}
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                            msg.role === 'assistant' ? "bg-brand-teal/10 border-brand-teal text-brand-teal" : "bg-dark-800 border-white/20 text-gray-300")}>
                            {msg.role === 'assistant' ? <Zap size={16} /> : <Activity size={16} />}
                        </div>

                        {/* Bubble */}
                        <div className={cn("p-4 rounded-xl border max-w-[80%]",
                            msg.role === 'assistant'
                                ? "bg-dark-900/80 border-brand-teal/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                                : "bg-white/5 border-white/10")}>
                            {msg.role === 'assistant' && (
                                <div className="text-[10px] uppercase tracking-widest text-brand-teal/70 mb-2 font-bold">V-AI Cortex</div>
                            )}
                            <div className="prose prose-invert prose-sm text-gray-200">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-4 max-w-3xl mx-auto">
                        <div className="w-8 h-8 rounded-lg bg-brand-teal/10 border border-brand-teal text-brand-teal flex items-center justify-center animate-pulse">
                            <Sparkles size={16} />
                        </div>
                        <div className="flex items-center gap-1 h-12">
                            <span className="w-1 h-3 bg-brand-teal animate-[bounce_1s_infinite]" />
                            <span className="w-1 h-5 bg-brand-teal animate-[bounce_1s_infinite_0.1s]" />
                            <span className="w-1 h-3 bg-brand-teal animate-[bounce_1s_infinite_0.2s]" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="p-4 relative z-10 border-t border-white/10 bg-black/90">
                <div className="max-w-3xl mx-auto flex gap-3">
                    <button
                        onClick={startListening}
                        className={cn("p-4 rounded-xl border transition-all",
                            isListening
                                ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                                : "bg-dark-800 border-white/10 text-gray-400 hover:border-brand-teal hover:text-brand-teal")}
                    >
                        <Mic size={24} />
                    </button>

                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Input command parameters..."
                            className="w-full h-full bg-dark-800 border border-white/10 rounded-xl px-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-teal font-mono"
                        />
                    </div>

                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="h-auto px-6 rounded-xl bg-brand-teal text-black hover:bg-brand-neon font-bold"
                    >
                        <Send size={20} />
                    </Button>
                </div>
                <div className="text-center mt-2">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">Visual AI • Neural Network Active • v2.1.0</p>
                </div>
            </footer>
        </div>
    );
};
