"use client";

import ConnectedAppCard from "@/components/connected-app-card";
import { useFetchRecords } from "@/hooks/fetch-records";
import { apps } from "@/lib/data";

export default function ConnectedApps() {
  const { data: connections } = useFetchRecords({
    module: "api_credentials",
  });

  return (
    <div className="container max-w-6xl space-y-6 p-4">
      {apps.map((app) => (
        <ConnectedAppCard
          key={app.id}
          app={app}
          connections={connections || []}
        />
      ))}
    </div>
  );
}
