export const metadata = {
  title: 'My App',
  description: 'An amazing application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-white">{children}</body>
    </html>
  );
}
