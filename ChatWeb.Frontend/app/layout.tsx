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
  return (
    <html lang="en">
      <body className={inter.className}>
        <MessageContextProvider>
          <AuthContextProvider
            token={await cookies().get("token")?.value}
            baseUrl={process.env.API_URL!}
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
