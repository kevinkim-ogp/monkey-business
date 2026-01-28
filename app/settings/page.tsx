"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import SettingsForm from "@/components/SettingsForm";

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        {/* Settings Card */}
        <div className="max-w-2xl bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Account Settings
          </h2>
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
