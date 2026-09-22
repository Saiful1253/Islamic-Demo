"use client";

import { useCallback, useState, type CSSProperties } from "react";
import ContentArea from "./ContentArea";
import Header from "./Header";
import IconRail from "./IconRail";
import SettingsPanel from "./SettingsPanel";
import Sidebar from "./Sidebar";
import { SECTION_DEFAULT } from "@/lib/data";
import { ACCENTS, defaultSettings, type Settings } from "@/lib/settings";

const DEFAULT_ACTIVE_ITEM = "The most important thing to ask Allah for";

export default function DuaApp() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState(DEFAULT_ACTIVE_ITEM);
  const [sectionTitle, setSectionTitle] = useState(SECTION_DEFAULT);
  const [toast, setToast] = useState<string | null>(null);

  const update = useCallback(
    (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch })),
    [],
  );

  const closeDrawers = useCallback(() => {
    setSidebarOpen(false);
    setSettingsOpen(false);
  }, []);

  const handleSelect = useCallback((label: string) => {
    setActiveLabel(label);
    setSectionTitle(label.replace(/^\d+\.\s*/, ""));
    setSidebarOpen(false);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const accent = ACCENTS[settings.accent];
  const accentVars = {
    "--accent": accent.accent,
    "--accent-soft": accent.soft,
    "--accent-ink": accent.ink,
  } as CSSProperties;

  return (
    <div
      style={accentVars}
      className="flex min-h-screen flex-col bg-page text-ink"
    >
      <Header
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        onOpenSettings={() => {
          setSettingsOpen(true);
          update({ fontOpen: true });
        }}
        onSupport={() =>
          showToast(
            "Jazākallāhu khayran — thank you for supporting Al Hisnul Muslim 💚",
          )
        }
      />

      {/* Document-scrolling three-column body: rail / sidebar / content / settings */}
      <div className="flex flex-1 items-stretch">
        <IconRail onToggleMenu={() => setSidebarOpen((v) => !v)} />

        <Sidebar
          open={sidebarOpen}
          activeLabel={activeLabel}
          onSelect={handleSelect}
        />

        <ContentArea sectionTitle={sectionTitle} settings={settings} />

        {/* Settings gutter: zero-width below xl (panel is a fixed drawer),
            fixed-width column with the panel in flow at xl+ */}
        <div className="w-0 shrink-0 xl:w-[369px]">
          <SettingsPanel
            open={settingsOpen}
            settings={settings}
            onChange={update}
          />
        </div>

        {(sidebarOpen || settingsOpen) && (
          <div
            className="fixed inset-0 top-16 z-30 bg-black/30 xl:hidden"
            onClick={closeDrawers}
            aria-hidden
          />
        )}
      </div>

      {toast && (
        <div
          role="status"
          className="pointer-events-none fixed bottom-6 left-1/2 z-[60] max-w-[90vw] -translate-x-1/2 rounded-full bg-[#1f2a22]/95 px-4 py-2 text-center text-[12px] font-semibold text-white shadow-xl"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
