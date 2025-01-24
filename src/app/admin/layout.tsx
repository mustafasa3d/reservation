import ProtectRoute from "@/components/ProtectRoute";
/* generate meta here if we need */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectRoute user="admin" />
      {children}
    </>
  );
}
