/*import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusCard } from "@/components/StatusCard";
import { useTranslations } from "next-intl";
import { getCount, getGitHubStars } from "@/lib/server/count";

interface QrbtfStatusProps {
  children?: React.ReactNode;
}

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

export default async function QrbtfStatus(props: QrbtfStatusProps) {
  const t = useTranslations("index.status");

  let results = [];

  const names = [
    "github_stars",
    "generate_count",
    "download_count",
    "page_view",
  ] as const;

  try {
    let promises = names.map((name, index) => {
      if (index === 0) {
        return getGitHubStars();
      } else {
        return getCount("counter_global", name);
      }
    });
    results = (await Promise.all(promises)).map((number) =>
      number ? number.toLocaleString() : "N/A",
    );
  } catch (error) {
    results = names.map((name) => "N/A");
  }
  return (
    <>
    
      
      {names.map((name, index) => (
        <StatusCard title={t(name)} key={name}>
          
          <div>{results[index] || "N/A"}</div>
        </StatusCard>
      ))}
    </>
  );
} 
*/
import React from "react";
import { StatusCard } from "@/components/StatusCard";
import { useTranslations } from "next-intl";
import { getCount, getGitHubStars } from "@/lib/server/count";

interface QrbtfStatusProps {
  children?: React.ReactNode;
}

const keyMap = {
  github_stars: "visitors",
  generate_count: "qr_created",
  download_count: "qr_downloaded",
  page_view: "google_play",
} as const;

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

export default async function QrbtfStatus(props: QrbtfStatusProps) {
  const t = useTranslations("index.status");

  let results = [];
  const names = ["github_stars", "generate_count", "download_count", "page_view"] as const;

  try {
    let promises = names.map((name, index) => {
      if (index === 0) {
        return getGitHubStars();
      } else {
        return getCount("counter_global", name);
      }
    });
    results = (await Promise.all(promises)).map((number) =>
      number ? number.toLocaleString() : "N/A"
    );
  } catch (error) {
    results = names.map(() => "N/A");
  }

  return (
    <>
      {names.map((name, index) => (
        <StatusCard title={t(keyMap[name])} key={name}>
          <div>{results[index] || "N/A"}</div>
        </StatusCard>
      ))}
    </>
  );
}
