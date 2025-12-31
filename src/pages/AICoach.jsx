import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, StopCircle, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export const AICoach = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your AI Fitness Assistant. I can build workout plans, give nutrition advice, or correct your form. Speak or type to start!" }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Speech to Text Setup
    const startListening = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognition.start();
        } else {
            alert("Voice recognition not supported in this browser.");
        }
    };

    // Text to Speech Setup
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onstart = () => setIsSpeaking(true);

            // Allow selecting voices if needed, defaulting to first available
            const voices = window.speechSynthesis.getVoices();
            // Try to find a "Google US English" or similar premium voice if available
            const preferredVoice = voices.find(voice => voice.name.includes('Google') && voice.lang.includes('en-US'));
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Call our Backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await response.json();

            const aiMsg = { role: 'assistant', content: data.reply };
            setMessages(prev => [...prev, aiMsg]);

            // Auto speak reply
            speakText(data.reply);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
            <div className="flex-1 bg-dark-700/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 mb-6 overflow-y-auto flex flex-col gap-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "max-w-[80%] p-4 rounded-2xl animate-fade-in",
                            msg.role === 'user'
                                ? "self-end bg-brand-blue/10 text-brand-blue rounded-br-none border border-brand-blue/20"
                                : "self-start bg-dark-600 text-gray-200 rounded-bl-none border border-white/5"
                        )}
                    >
                        {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <Zap size={12} className="text-brand-neon" /> AI Coach
                            </div>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                    </div>
                ))}
                {loading && (
                    <div className="self-start bg-dark-600 p-4 rounded-2xl rounded-bl-none border border-white/5">
                        <div className="flex gap-2">
                            <span className="w-2 h-2 bg-brand-neon rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-brand-neon rounded-full animate-bounce delay-100" />
                            <span className="w-2 h-2 bg-brand-neon rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-dark-800 p-2 rounded-full border border-white/10 flex items-center gap-2 pl-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about workouts, diet, or form..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                />

                <button
                    onClick={startListening}
                    className={cn(
                        "p-3 rounded-full transition-all duration-300",
                        isListening
                            ? "bg-red-500/20 text-red-500 animate-pulse"
                            : "hover:bg-white/10 text-gray-400 hover:text-white"
                    )}
                >
                    <Mic size={20} />
                </button>

                <Button
                    onClick={handleSend}
                    className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                    disabled={!input.trim() && !loading}
                >
                    <Send size={18} />
                </Button>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={() => speakText(messages[messages.length - 1]?.content || "")}
                    className="text-xs text-gray-500 hover:text-brand-neon flex items-center justify-center gap-1 mx-auto"
                >
                    {isSpeaking ? <StopCircle size={12} /> : <Volume2 size={12} />}
                    {isSpeaking ? "Stop Speaking" : "Replay Last Message"}
                </button>
            </div>
        </div>
    );
};
