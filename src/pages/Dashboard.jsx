import { Activity, Flame, Timer, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
    <div className="p-6 rounded-3xl bg-dark-700 border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp size={14} /> +2.5%
            </span>
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
    </div>
)

export const Dashboard = () => {
    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Athlete</h1>
                    <p className="text-gray-400">Here's your daily performance summary.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-sm text-gray-400">Current Streak</div>
                    <div className="text-xl font-bold text-brand-neon">🔥 12 Days</div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in delay-100">
                <StatCard icon={Activity} label="Workout Volume" value="12,450 kg" color="bg-brand-blue" />
                <StatCard icon={Flame} label="Calories Burned" value="840 kcal" color="bg-orange-500" />
                <StatCard icon={Timer} label="Active Minutes" value="94 min" color="bg-brand-purple" />
                <StatCard icon={TrendingUp} label="Recovery Score" value="92%" color="bg-brand-neon" />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in delay-200">
                {/* Chart Area (Mock) */}
                <div className="lg:col-span-2 p-8 rounded-4xl bg-dark-700 border border-white/5 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold mb-6">Weekly Progress</h3>
                    <div className="flex-grow flex items-end justify-between gap-4 px-4 h-full">
                        {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full h-full flex flex-col justify-end group">
                                <div className="w-full bg-dark-600 rounded-t-xl relative overflow-hidden transition-all duration-500 group-hover:bg-dark-500 h-full">
                                    <div
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-brand-neon to-brand-blue opacity-80 group-hover:opacity-100 transition-all duration-500 rounded-t-xl"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-gray-400 text-sm font-medium">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Next Workout */}
                <div className="p-8 rounded-4xl bg-gradient-to-br from-dark-700 to-dark-800 border border-white/5 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-6">Next Workout</h3>
                        <div className="mb-6">
                            <div className="text-sm text-brand-neon font-bold mb-1">TODAY • 5:00 PM</div>
                            <h4 className="text-2xl font-bold">Upper Body Power</h4>
                            <p className="text-gray-400 text-sm">Focus: Hypertrophy & Strength</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <span className="text-gray-400">Duration</span>
                                <span className="font-medium">60 min</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                <span className="text-gray-400">Intensity</span>
                                <span className="font-medium text-brand-purple">High</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 rounded-xl bg-white text-dark-900 font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                        Start Workout
                    </button>
                </div>
            </div>
        </div>
    );
};
