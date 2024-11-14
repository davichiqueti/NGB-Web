import Navigation from '../components/navigation/aside/aside.js'

export default function Home() {
  return (
    <>
      <Navigation />

      <div className="flex items-center justify-center h-screen bg-blue-500">
        <h1 className="text-4xl font-bold text-white">Hello, Tailwind CSS!</h1>
      </div>
    </>
  );
}
