'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Database, Trash2, Download, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { clearAllAnalyses as idbClearAll } from '@/lib/indexed-db';

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, analyses } = useAppStore();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      return;
    }

    setIsClearing(true);
    try {
      await idbClearAll();
      useAppStore.getState().clearAllAnalyses();
    } catch (err) {
      console.error('Failed to clear data:', err);
    } finally {
      setIsClearing(false);
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(analyses, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskmind-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const storageUsed = new Blob([JSON.stringify(analyses)]).size;
  const storageUsedKB = (storageUsed / 1024).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your TaskMind AI preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Use dark theme</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative h-10 w-16 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-1 h-8 w-8 rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  } flex items-center justify-center`}
                >
                  {darkMode ? (
                    <Moon className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* AI Provider */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              AI Provider
            </CardTitle>
            <CardDescription>Server-side analysis provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium">OpenRouter</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Text analysis is processed server-side through OpenRouter using the app&apos;s configured API key.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Your saved analysis history stays in local browser storage, but AI inference no longer runs on-device.
            </p>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Storage
            </CardTitle>
            <CardDescription>Manage your local data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Storage Used</p>
                  <p className="text-xs text-muted-foreground">
                    {analyses.length} analyses stored
                  </p>
                </div>
                <p className="text-lg font-bold">{storageUsedKB} KB</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                disabled={analyses.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearData}
                disabled={analyses.length === 0 || isClearing}
                className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About
            </CardTitle>
            <CardDescription>TaskMind AI information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium">TaskMind AI</p>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Task extraction powered by OpenRouter with local history saved in your browser.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
