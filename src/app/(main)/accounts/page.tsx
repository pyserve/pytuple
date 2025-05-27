"use client";

import AccountSettings from "@/components/accounts/settings-accounts";
import AppearanceSettings from "@/components/accounts/settings-appearance";
import NotificationSettings from "@/components/accounts/settings-notifications";
import SecuritySettings from "@/components/accounts/settings-security";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, CreditCard, Moon, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => setFormSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  return (
    <div className="min-h-fit bg-white dark:bg-black text-black dark:text-white">
      <div className="mx-auto">
        <Tabs defaultValue="account" className="rounded-0">
          <TabsList className="min-w-full flex flex-wrap justify-center sm:justify-start gap-2 mb-8 p-1 dark:bg-gray-800 shadow-inner h-15 rounded-none">
            <TabsTrigger
              value="account"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-rose-400 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <User className="h-5 w-5 mr-2" />
              Account & Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-rose-400 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-rose-400 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <Moon className="h-5 w-5 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-rose-400 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <Shield className="h-5 w-5 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-rose-400 text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {formSubmitted && (
            <Alert className="mt-6 mb-8 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800 rounded-lg shadow-md animate-fade-in-down">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-lg font-semibold text-green-900 dark:text-green-200">
                Success!
              </AlertTitle>
              <AlertDescription className="text-sm text-green-700 dark:text-green-300">
                Your settings have been saved successfully.
              </AlertDescription>
            </Alert>
          )}

          <main className="p-4">
            <AccountSettings setFormSubmitted={setFormSubmitted} />

            <NotificationSettings setFormSubmitted={setFormSubmitted} />

            <AppearanceSettings setFormSubmitted={setFormSubmitted} />

            <SecuritySettings setFormSubmitted={setFormSubmitted} />

            <TabsContent value="billing" className="mt-8">
              <div className="p-8 border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Billing Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  View your payment methods, subscriptions, and billing history.
                </p>
                <button
                  onClick={() => setFormSubmitted(true)}
                  className="px-6 py-3 bg-rose-600 text-white rounded-lg shadow-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </TabsContent>
          </main>
        </Tabs>
      </div>
    </div>
  );
}
