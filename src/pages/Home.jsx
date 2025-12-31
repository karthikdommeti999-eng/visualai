import { ArrowRight, Layers, BarChart3, Wand2, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export const Home = () => {
    return (
        <div className="relative min-h-screen bg-dark-900 overflow-hidden selection:bg-brand-teal selection:text-black">
            {/* Ambient Backgrounds */}
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
            <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 flex flex-col items-center justify-center min-h-screen text-center px-4">

                {/* Text Content */}
                <div className="relative z-20 max-w-5xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                        THE NEW ERA OF <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-white to-brand-cyan glow-text">
                            KARTHIK'S AI
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed border-l-2 border-brand-teal/20 pl-6">
                        Empower your creativity with AI-driven insights. Generate, analyze, and refine your visual data in real-time with our matte-black precision engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button size="lg" className="w-full sm:w-auto shadow-[0_0_40px_rgba(0,240,255,0.3)]">
                            Get Started <ArrowRight size={20} />
                        </Button>
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            Request a Demo
                        </Button>
                    </div>
                </div>

                {/* Central Visual Element - 3D Ring/Orb */}
                <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center perspective-1000 group">

                    {/* The Ring System */}
                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
                        {/* Core Sphere */}
                        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-brand-teal to-brand-accent blur-md animate-pulse-glow" />

                        {/* Outer Ring 1 */}
                        <div className="absolute inset-0 rounded-full border border-brand-teal/30 animate-spin-slow"
                            style={{ transform: 'rotateX(70deg)' }}></div>

                        {/* Outer Ring 2 (Cross) */}
                        <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-spin-slow animation-delay-500"
                            style={{ transform: 'rotateY(70deg)' }}></div>

                        {/* Outer Ring 3 (Static Glow) */}
                        <div className="absolute inset-[-40px] rounded-full border border-dashed border-white/5 animate-spin-slow reverse"></div>


                        {/* Floating Tooltips */}
                        <FloatingCard
                            icon={Layers} label="Export Layers"
                            className="top-0 left-0 -translate-x-12 translate-y-10 animate-float"
                        />
                        <FloatingCard
                            icon={Wand2} label="AI Gen"
                            className="top-10 right-0 translate-x-12 animate-float animation-delay-1000"
                        />
                        <FloatingCard
                            icon={BarChart3} label="Analytics"
                            className="bottom-10 left-10 -translate-x-8 animate-float animation-delay-2000"
                        />
                        <FloatingCard
                            icon={Share2} label="Collaborate"
                            className="bottom-0 right-10 translate-x-8 animate-float animation-delay-3000"
                        />
                    </div>
                </div>

            </section>

            {/* Footer Mock */}
            <footer className="border-t border-white/5 bg-dark-900 py-12 text-center text-gray-500 text-sm">
                <p>© 2024 VisualAI Inc. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Helper Component for Floating Cards
const FloatingCard = ({ icon: Icon, label, className }) => (
    <div className={cn(
        "absolute p-4 rounded-xl glass-panel flex items-center gap-3 w-40 hover:scale-105 transition-transform cursor-pointer",
        className
    )}>
        <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal">
            <Icon size={18} />
        </div>
        <span className="text-sm font-medium text-gray-200">{label}</span>
    </div>
)
