import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-dark-900 text-white overflow-x-hidden selection:bg-brand-neon selection:text-dark-900">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};
