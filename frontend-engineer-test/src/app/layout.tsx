import '@/app/globals.css';

export const metadata = {
  title: 'Star Wars Characters',
  description: 'Star Wars Characters from SWAPI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pt-16 pb-16 px-8"> 
        {children}
      </body>
    </html>
  );
}
