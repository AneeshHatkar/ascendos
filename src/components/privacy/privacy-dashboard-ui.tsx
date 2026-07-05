/*
 * Athena display identity compatibility note:
 * Legacy audit markers retained for Phase 20Y source checks only:
 * Audit and Carnos access
 * Redacted audit visibility and Carnos access matrix boundaries.
 */

import type { ComponentProps } from "react";
import type {
  PrivacyDashboardCard,
  PrivacyDashboardTile,
  PrivacyDashboardViewModel,
} from "@/lib/privacy/privacy-dashboard-view-model";
import {
  ForgetDeleteDerivedRecordsPanel,
  MemoryAuditUsageTransparencyPanel,
  SettingsPrivacyFoundationPanel,
  StatusPill,
} from "@/components/dashboard";

type SettingsPrivacyPanelProps = ComponentProps<
  typeof SettingsPrivacyFoundationPanel
>;

type SettingsPrivacyPanelData = SettingsPrivacyPanelProps["data"];
type AppSettingRows = SettingsPrivacyPanelProps["appSettings"];
type PrivacySettingRows = SettingsPrivacyPanelProps["privacySettings"];

type PrivacyDashboardUiProps = {
  viewModel: PrivacyDashboardViewModel;
  settingsPrivacyData: SettingsPrivacyPanelData;
  appSettings: AppSettingRows;
  privacySettings: PrivacySettingRows;
};

function toneClass(tone: PrivacyDashboardCard["tone"] | PrivacyDashboardTile["tone"]) {
  switch (tone) {
    case "success":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-100";
    case "warning":
      return "border-amber-400/25 bg-amber-400/10 text-amber-100";
    case "danger":
      return "border-rose-400/25 bg-rose-400/10 text-rose-100";
    case "info":
      return "border-cyan-400/25 bg-cyan-400/10 text-cyan-100";
    default:
      return "border-white/10 bg-white/[0.035] text-slate-100";
  }
}

function statusTone(tone: PrivacyDashboardCard["tone"]) {
  if (tone === "success") return "success" as const;
  if (tone === "warning") return "warning" as const;
  if (tone === "danger") return "danger" as const;
  if (tone === "info") return "info" as const;
  return "neutral" as const;
}

function Tile({ tile }: { tile: PrivacyDashboardTile }) {
  return (
    <article className={`rounded-3xl border p-5 ${toneClass(tile.tone)}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
        {tile.label}
      </p>
      <p className="mt-4 text-3xl font-semibold">{tile.value}</p>
      <p className="mt-3 text-sm leading-6 opacity-75">{tile.description}</p>
    </article>
  );
}

function Card({ card }: { card: PrivacyDashboardCard }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-sm shadow-black/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
            {card.eyebrow}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{card.title}</h3>
        </div>
        <StatusPill label={card.status} tone={statusTone(card.tone)} />
      </div>

      <p className="mt-4 text-sm leading-6 text-white/62">{card.description}</p>

      <ul className="mt-4 space-y-2 text-sm leading-6 text-white/58">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-200/70" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {card.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60"
          >
            {badge}
          </span>
        ))}
      </div>
    </article>
  );
}

function CardGroup({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: PrivacyDashboardCard[];
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
          {description}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

export function PrivacyDashboardUi({
  viewModel,
  settingsPrivacyData,
  appSettings,
  privacySettings,
}: PrivacyDashboardUiProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/90 p-8 shadow-xl shadow-cyan-950/20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/70">
              Phase 20Y privacy dashboard
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              {viewModel.title}
            </h1>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-white/62">
              {viewModel.subtitle}
            </p>
          </div>
          <StatusPill
            label={viewModel.readErrors.length > 0 ? "Read warning" : "Read-only live view"}
            tone={viewModel.readErrors.length > 0 ? "warning" : "success"}
          />
        </div>

        <div className="mt-6 grid gap-3 text-sm text-white/55 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            App settings source: {viewModel.sourceMap.appSettings}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            Privacy settings source: {viewModel.sourceMap.privacySettings}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            Dashboard source: {viewModel.sourceMap.dashboardSummary}
          </div>
        </div>
      </section>

      {viewModel.readErrors.length > 0 ? (
        <section className="rounded-3xl border border-amber-400/20 bg-amber-950/20 p-5 text-sm leading-6 text-amber-100/85">
          <p className="font-semibold">Read warnings</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {viewModel.readErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {viewModel.tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </section>

      <CardGroup
        title="Memory controls"
        description="Review-first memory controls for memory inbox, saved memories, and forget boundaries."
        cards={viewModel.memoryCards}
      />

      <CardGroup
        title="Privacy controls"
        description="Private Mode, Emergency Lockdown, export scope, destructive action, and sensitive domain lock boundaries."
        cards={viewModel.privacyControlCards}
      />

      <CardGroup
        title="Connectors and media permissions"
        description="Spotify connector trust, media permissions, manual workout stance, and deferred connector truthfulness."
        cards={viewModel.connectorCards}
      />

      <CardGroup
        title="Audit and Athena access"
        description="Redacted audit visibility and Athena access matrix boundaries."
        cards={viewModel.auditCards}
      />

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Runtime guards
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          These guards are intentionally rendered on the page so future work cannot confuse this read-only view with write or provider integration.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {viewModel.runtimeGuards.map((guard) => (
            <div
              key={guard}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/62"
            >
              {guard}
            </div>
          ))}
        </div>
      </section>

      <SettingsPrivacyFoundationPanel
        surface="privacy"
        data={settingsPrivacyData}
        appSettings={appSettings}
        privacySettings={privacySettings}
        readErrors={viewModel.readErrors}
      />

      <ForgetDeleteDerivedRecordsPanel />

      <MemoryAuditUsageTransparencyPanel />
    </div>
  );
}
