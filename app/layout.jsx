export const metadata = {
  title: "Terpene Prescriber Intelligence",
  description: "Clinical decision support for medicinal cannabis prescribing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
