import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/auth-context";
import { cookies } from "next/headers";
import { MessageContextProvider } from "@/contexts/message-context";
import { Toaster } from "@/components/ui/toaster";
import { SearchContextProvider } from "@/contexts/search-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatWeb",
  description: "ChatWeb",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Base URL:");
  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MessageContextProvider>
          <AuthContextProvider
            token={token}
            baseUrl={process.env.NEXT_PUBLIC_API_URL!}
          >
            <SearchContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </SearchContextProvider>
          </AuthContextProvider>
        </MessageContextProvider>
      </body>
    </html>
  );
}
