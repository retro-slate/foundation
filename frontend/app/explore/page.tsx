"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ContentType = "regions" | "entities" | "projects" | "events" | "reports";
type FilterType = "all" | ContentType;

type ApiRecord = Record<string, unknown>;

type SearchResult = {
  id: string;
  title: string;
  type: ContentType;
  summary: string;
  regionName: string;
  href: string;
};

const endpoints: Array<{ type: ContentType; path: string; label: string }> = [
  { type: "regions", path: "/api/regions/", label: "Region" },
  { type: "entities", path: "/api/entities/", label: "Entity" },
  { type: "projects", path: "/api/projects/", label: "Project" },
  { type: "events", path: "/api/events/", label: "Event" },
  { type: "reports", path: "/api/reports/", label: "Report" },
];

const filters: Array<{ type: FilterType; label: string }> = [
  { type: "all", label: "All" },
  { type: "regions", label: "Regions" },
  { type: "entities", label: "Entities" },
  { type: "projects", label: "Projects" },
  { type: "events", label: "Events" },
  { type: "reports", label: "Reports" },
];

function textFrom(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function arrayFromResponse(data: unknown): ApiRecord[] {
  if (Array.isArray(data)) {
    return data.filter((item): item is ApiRecord => Boolean(item));
  }

  if (data && typeof data === "object") {
    const record = data as ApiRecord;
    const nested = record.results ?? record.data ?? record.items;

    if (Array.isArray(nested)) {
      return nested.filter((item): item is ApiRecord => Boolean(item));
    }
  }

  return [];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getRegionName(item: ApiRecord): string {
  const direct =
    textFrom(item.region_name) ||
    textFrom(item.regionName) ||
    textFrom(item.location) ||
    textFrom(item.country);

  if (direct) {
    return direct;
  }

  const region = item.region;

  if (typeof region === "string") {
    return region;
  }

  if (region && typeof region === "object") {
    const regionRecord = region as ApiRecord;
    return (
      textFrom(regionRecord.name) ||
      textFrom(regionRecord.title) ||
      textFrom(regionRecord.slug)
    );
  }

  return "";
}

function normalizeRecord(item: ApiRecord, type: ContentType): SearchResult {
  const endpoint = endpoints.find((entry) => entry.type === type);
  const title =
    textFrom(item.name) ||
    textFrom(item.title) ||
    textFrom(item.label) ||
    `${endpoint?.label ?? "Result"} record`;
  const slug =
    textFrom(item.slug) ||
    textFrom(item.id) ||
    textFrom(item.uuid) ||
    slugify(title);
  const summary =
    textFrom(item.summary) ||
    textFrom(item.description) ||
    textFrom(item.short_description) ||
    textFrom(item.shortDescription);
  const regionName = getRegionName(item);

  return {
    id: `${type}-${slug}`,
    title,
    type,
    summary,
    regionName,
    href: `/${type}/${slug}`,
  };
}

function typeLabel(type: ContentType): string {
  return endpoints.find((entry) => entry.type === type)?.label ?? "Result";
}

function badgeTone(type: ContentType) {
  if (type === "reports") {
    return "indigo";
  }

  if (type === "events") {
    return "pink";
  }

  return "lime";
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      if (!API_URL) {
        setError("API URL is not configured yet.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const allResults = await Promise.all(
          endpoints.map(async (endpoint) => {
            const response = await fetch(`${API_URL}${endpoint.path}`, {
              signal: controller.signal,
            });

            if (!response.ok) {
              throw new Error(`Could not load ${endpoint.label.toLowerCase()}s`);
            }

            const data: unknown = await response.json();
            return arrayFromResponse(data).map((item) =>
              normalizeRecord(item, endpoint.type),
            );
          }),
        );

        setResults(allResults.flat());
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(
          "We could not load Explore results right now. Please try again soon.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();

    return () => controller.abort();
  }, []);

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return results.filter((result) => {
      const matchesType =
        activeFilter === "all" || result.type === activeFilter;

      if (!matchesType) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        result.title,
        typeLabel(result.type),
        result.type,
        result.summary,
        result.regionName,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeFilter, query, results]);

  return (
    <PageShell>
      <div className="space-y-10">
        <SectionHeader
          eyebrow="Discovery"
          title="Explore"
          description="Search regions, projects, organizations, events, reports, and initiatives across the RetroSlate Foundation network."
        />

        <section className="border-2 border-retro-black bg-retro-white p-4 shadow-[6px_6px_0_#5d00ff]">
          <label className="sr-only" htmlFor="platform-search">
            Search the platform
          </label>
          <input
            className="w-full border-2 border-retro-black bg-retro-white px-4 py-3 font-mono text-sm uppercase text-retro-black outline-none placeholder:text-retro-black focus:bg-retro-lime"
            id="platform-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the platform..."
            type="search"
            value={query}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.type;

              return (
                <button
                  className={`border-2 border-retro-black px-3 py-2 text-xs font-black uppercase tracking-normal transition ${
                    isActive
                      ? "bg-retro-lime text-retro-black"
                      : "bg-retro-white text-retro-black hover:bg-retro-black hover:text-retro-white"
                  }`}
                  key={filter.type}
                  onClick={() => setActiveFilter(filter.type)}
                  type="button"
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                className="min-h-48 border-2 border-retro-black bg-retro-white p-5 shadow-[6px_6px_0_#1c1c1c]"
                key={item}
              >
                <div className="h-5 w-24 bg-retro-lime" />
                <div className="mt-6 h-8 w-3/4 bg-retro-black" />
                <div className="mt-5 h-3 w-full bg-retro-pink" />
                <div className="mt-3 h-3 w-2/3 bg-retro-indigo" />
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <EmptyState title="Explore is offline" description={error} />
        ) : null}

        {!isLoading && !error && results.length === 0 ? (
          <EmptyState
            title="No results yet."
            description="Data will appear here as the Foundation database grows."
          />
        ) : null}

        {!isLoading &&
        !error &&
        results.length > 0 &&
        filteredResults.length === 0 ? (
          <EmptyState
            title="No matching results"
            description="Try a different search term or switch the content type filter."
          />
        ) : null}

        {!isLoading && !error && filteredResults.length > 0 ? (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((result, index) => (
              <Card
                accent={index % 3 === 1 ? "pink" : index % 3 === 2 ? "indigo" : "lime"}
                key={result.id}
              >
                <div className="flex h-full flex-col">
                  <Badge tone={badgeTone(result.type)}>
                    {typeLabel(result.type)}
                  </Badge>
                  <h2 className="mt-5 text-2xl font-black uppercase leading-tight tracking-normal">
                    {result.title}
                  </h2>
                  {result.summary ? (
                    <p className="mt-3 text-sm leading-6">{result.summary}</p>
                  ) : (
                    <p className="mt-3 text-sm leading-6">
                      No summary available yet.
                    </p>
                  )}
                  {result.regionName ? (
                    <p className="mt-4 border-t-2 border-retro-black pt-3 font-mono text-xs font-bold uppercase">
                      Region: {result.regionName}
                    </p>
                  ) : null}
                  <Link
                    className="mt-6 inline-flex font-black uppercase underline"
                    href={result.href}
                  >
                    Open detail page
                  </Link>
                </div>
              </Card>
            ))}
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
