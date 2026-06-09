"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiRecord = Record<string, unknown>;

type Project = {
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  regionName: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

type Event = {
  id: string;
  name: string;
  slug: string;
  description: string;
  eventDate: string;
  location: string;
  regionName: string;
};

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
  const direct = textFrom(item.region_name) || textFrom(item.regionName);

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

function normalizeProject(item: ApiRecord): Project {
  const name =
    textFrom(item.name) || textFrom(item.title) || "Untitled project";
  const slug = textFrom(item.slug) || textFrom(item.id) || slugify(name);

  return {
    id: `project-${slug}`,
    name,
    slug,
    status: textFrom(item.status) || textFrom(item.project_status),
    description:
      textFrom(item.description) ||
      textFrom(item.summary) ||
      textFrom(item.short_description),
    regionName: getRegionName(item),
    startDate: textFrom(item.start_date) || textFrom(item.startDate),
    endDate: textFrom(item.end_date) || textFrom(item.endDate),
    createdAt: textFrom(item.created_at) || textFrom(item.createdAt),
  };
}

function normalizeEvent(item: ApiRecord): Event {
  const name = textFrom(item.name) || textFrom(item.title) || "Untitled event";
  const slug = textFrom(item.slug) || textFrom(item.id) || slugify(name);

  return {
    id: `event-${slug}`,
    name,
    slug,
    description:
      textFrom(item.description) ||
      textFrom(item.summary) ||
      textFrom(item.short_description),
    eventDate: textFrom(item.event_date) || textFrom(item.eventDate),
    location: textFrom(item.location) || textFrom(item.venue),
    regionName: getRegionName(item),
  };
}

function dateTime(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDate(value: string): string {
  if (!value) {
    return "";
  }

  const parsed = Date.parse(value);

  if (Number.isNaN(parsed)) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(parsed));
}

function dateRange(startDate: string, endDate: string): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end;
}

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProgrammes() {
      if (!API_URL) {
        setError("API URL is not configured yet.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const [projectsResponse, eventsResponse] = await Promise.all([
          fetch(`${API_URL}/api/projects/`, { signal: controller.signal }),
          fetch(`${API_URL}/api/events/`, { signal: controller.signal }),
        ]);

        if (!projectsResponse.ok || !eventsResponse.ok) {
          throw new Error("Could not load programmes.");
        }

        const [projectsData, eventsData]: [unknown, unknown] = await Promise.all([
          projectsResponse.json(),
          eventsResponse.json(),
        ]);

        setProjects(arrayFromResponse(projectsData).map(normalizeProject));
        setEvents(arrayFromResponse(eventsData).map(normalizeEvent));
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError(
          "We could not load programmes right now. Please try again soon.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgrammes();

    return () => controller.abort();
  }, []);

  const sortedProjects = useMemo(
    () =>
      [...projects].sort(
        (first, second) =>
          dateTime(second.createdAt) - dateTime(first.createdAt),
      ),
    [projects],
  );

  const sortedEvents = useMemo(
    () =>
      [...events].sort((first, second) => {
        const firstDate = dateTime(first.eventDate);
        const secondDate = dateTime(second.eventDate);

        if (!firstDate && !secondDate) {
          return 0;
        }

        if (!firstDate) {
          return 1;
        }

        if (!secondDate) {
          return -1;
        }

        return firstDate - secondDate;
      }),
    [events],
  );

  const hasProgrammes = sortedProjects.length > 0 || sortedEvents.length > 0;

  return (
    <PageShell>
      <div className="space-y-12">
        <SectionHeader
          eyebrow="Programmes"
          title="Projects and events"
          description="Explore active initiatives and events across the RetroSlate Foundation network as they are added to the database."
        />

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="min-h-52 border-2 border-retro-black bg-retro-white p-5 shadow-[6px_6px_0_#1c1c1c]"
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
          <EmptyState title="Programmes are offline" description={error} />
        ) : null}

        {!isLoading && !error && !hasProgrammes ? (
          <EmptyState
            title="No programmes or events yet."
            description="New initiatives will appear here as the Foundation database grows."
          />
        ) : null}

        {!isLoading && !error && sortedProjects.length > 0 ? (
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Projects"
              title="Projects"
              description="Latest foundation initiatives and field programmes."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedProjects.map((project, index) => (
                <Card
                  accent={
                    index % 3 === 1
                      ? "pink"
                      : index % 3 === 2
                        ? "indigo"
                        : "lime"
                  }
                  key={project.id}
                >
                  <Badge tone={project.status ? "lime" : "black"}>
                    {project.status || "Project"}
                  </Badge>
                  <h2 className="mt-5 text-2xl font-black uppercase leading-tight tracking-normal">
                    {project.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6">
                    {project.description || "No description available yet."}
                  </p>
                  {project.regionName ? (
                    <p className="mt-4 border-t-2 border-retro-black pt-3 font-mono text-xs font-bold uppercase">
                      Region: {project.regionName}
                    </p>
                  ) : null}
                  {dateRange(project.startDate, project.endDate) ? (
                    <p className="mt-3 font-mono text-xs font-bold uppercase">
                      Timeline: {dateRange(project.startDate, project.endDate)}
                    </p>
                  ) : null}
                  <Link
                    className="mt-6 inline-flex font-black uppercase underline"
                    href={`/projects/${project.slug}`}
                  >
                    Open project
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {!isLoading && !error && sortedEvents.length > 0 ? (
          <section className="space-y-6">
            <SectionHeader
              eyebrow="Events"
              title="Upcoming Events"
              description="Convenings, field moments, and public sessions connected to the foundation network."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedEvents.map((event, index) => (
                <Card
                  accent={
                    index % 3 === 1
                      ? "pink"
                      : index % 3 === 2
                        ? "indigo"
                        : "lime"
                  }
                  key={event.id}
                >
                  <Badge tone="pink">Event</Badge>
                  <h2 className="mt-5 text-2xl font-black uppercase leading-tight tracking-normal">
                    {event.name}
                  </h2>
                  {event.eventDate ? (
                    <p className="mt-4 font-mono text-xs font-bold uppercase">
                      Date: {formatDate(event.eventDate)}
                    </p>
                  ) : null}
                  {event.location ? (
                    <p className="mt-3 font-mono text-xs font-bold uppercase">
                      Location: {event.location}
                    </p>
                  ) : null}
                  {event.regionName ? (
                    <p className="mt-3 font-mono text-xs font-bold uppercase">
                      Region: {event.regionName}
                    </p>
                  ) : null}
                  <p className="mt-4 border-t-2 border-retro-black pt-3 text-sm leading-6">
                    {event.description || "No description available yet."}
                  </p>
                  <Link
                    className="mt-6 inline-flex font-black uppercase underline"
                    href={`/events/${event.slug}`}
                  >
                    Open event
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
