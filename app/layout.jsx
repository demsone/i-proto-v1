export const metadata = {
  title: "Terpene Intelligence v1.0",
  description: "Find the right flower based on terpene science, not THC guesswork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#08080B" }}>
        {children}
      </body>
    </html>
  );
}
