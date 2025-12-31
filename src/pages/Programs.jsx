import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for beginners exploring AI fitness.",
        features: ["Basic workout logging", "Standard AI recommendations", "Community access"],
        color: "bg-gray-500"
    },
    {
        name: "Pro Athlete",
        price: "$29/mo",
        description: "Advanced analytics and personalized coaching.",
        features: ["Unlimited AI adjustments", "Form analysis (Video)", "Nutrition tracking", "Priority support"],
        color: "bg-brand-neon",
        popular: true
    },
    {
        name: "Elite",
        price: "$99/mo",
        description: "1-on-1 access to elite human + AI hybrid coaching.",
        features: ["Everything in Pro", "Weekly video calls", "Custom meal prep plans", "Gear discounts"],
        color: "bg-brand-purple"
    }
];

export const Programs = () => {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose Your <span className="text-gradient">Path</span></h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Whether you're just starting or training for the Olympics, our AI adapts to your level instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                    <div key={idx} className={`relative p-8 rounded-4xl bg-dark-700 border border-white/5 flex flex-col transition-transform hover:scale-[1.02] ${plan.popular ? 'ring-2 ring-brand-neon shadow-[0_0_40px_rgba(204,255,0,0.15)] transform md:-translate-y-4' : ''}`}>
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-neon text-dark-900 font-bold px-4 py-1 rounded-full text-sm">
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-4xl font-bold mb-4">{plan.price}</div>
                        <p className="text-gray-400 mb-8">{plan.description}</p>

                        <div className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-brand-neon/20 text-brand-neon' : 'bg-white/10 text-gray-300'}`}>
                                        <Check size={12} />
                                    </div>
                                    <span className="text-sm text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                            Get Started
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
