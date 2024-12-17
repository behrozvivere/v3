import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusCard } from "./StatusCard";
import { useTranslations } from "next-intl";
import { getCount, getGitHubStars } from "@/lib/server/count";

interface QrbtfStatusProps {
}

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

export default async function QrbtfStatus(props: QrbtfStatusProps) {
  const t = useTranslations("index.status");

  let results = [];

  const names = [
    "download_count",
    "generate_count",
    "page_view",
    "github_stars",
  ] as const;

  try {
    const promises = names.map(async (name, index) => {
      if (name === "github_stars") {
        return getGitHubStars();
      } else {
        return getCount("counter_global", name);
      }
    });
    results = (await Promise.all(promises)).map((number) =>
      number ? number.toLocaleString() : "N/A",
    );
  } catch (error) {
    results = names.map(() => "N/A");
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {names.map((name, index) => (
        <StatusCard title={t(name)} key={name}>
          <div>{results[index] || "N/A"}</div>
        </StatusCard>
      ))}
    </div>
  );
}
