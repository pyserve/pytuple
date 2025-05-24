"use client";

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
      <div className="mx-auto p-6">
        <Tabs defaultValue="account" className="">
          <TabsList className="min-w-full flex flex-wrap justify-center sm:justify-start gap-2 mb-8 p-1 bg-rose-50 dark:bg-gray-800 rounded-lg shadow-inner h-12">
            <TabsTrigger
              value="account"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <User className="h-5 w-5 mr-2" />
              Account & Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Moon className="h-5 w-5 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-rose-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Shield className="h-5 w-5 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center px-6 py-3 rounded-md transition-all duration-200 ease-in-out data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
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

          <TabsContent value="account" className="mt-8">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Account & Profile Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage your personal information and account preferences here.
              </p>
              <button
                onClick={() => setFormSubmitted(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
              >
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-8">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Notifications Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Configure how you receive notifications from us.
              </p>
              <button
                onClick={() => setFormSubmitted(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
              >
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-8">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Appearance Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Customize the look and feel of your interface.
              </p>
              <button
                onClick={() => setFormSubmitted(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
              >
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-8">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Security Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Manage your password, two-factor authentication, and more.
              </p>
              <button
                onClick={() => setFormSubmitted(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
              >
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-8">
            <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Billing Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                View your payment methods, subscriptions, and billing history.
              </p>
              <button
                onClick={() => setFormSubmitted(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out font-semibold"
              >
                Save Changes
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
