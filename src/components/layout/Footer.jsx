import { Zap, Github, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-dark-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-cyan rounded-lg flex items-center justify-center">
                                <Zap className="text-dark-900 w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold">Karthik <span className="text-brand-teal">Dommeti</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            AI-powered personalized platform by Karthik Dommeti.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-brand-neon cursor-pointer">AI Generation</li>
                            <li className="hover:text-brand-neon cursor-pointer">Analytics</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-brand-neon cursor-pointer">About Karthik</li>
                            <li className="hover:text-brand-neon cursor-pointer">Careers</li>
                            <li className="hover:text-brand-neon cursor-pointer">Blog</li>
                            <li className="hover:text-brand-neon cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                            <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Karthik Dommeti. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
