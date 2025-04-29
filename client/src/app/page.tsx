import ChatWindow from '@/components/ChatWindow';
import ThemeSelector from '@/components/themes/ThemeSelector';

export default function Home() {
    return (
        <main className="container mx-auto p-4 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">💁</h1>
                <ThemeSelector />
            </div>
            <ChatWindow />
        </main>
    );
}