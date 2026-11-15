import "@fontsource-variable/manrope";
import "@fontsource-variable/noto-sans-arabic";
import "../../globals.css";
export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
