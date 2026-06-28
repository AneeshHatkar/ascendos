-- Phase 14B Voice Foundation
-- Adds voice session and transcript storage only.
-- No audio storage is enabled by default.
-- No STT/TTS provider, API route, browser microphone, or voice UI is implemented here.

create table if not exists public.voice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  chat_session_id uuid references public.chat_sessions(id) on delete set null,
  source_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  session_type text not null default 'general_chat',
  voice_mode text not null default 'friend_voice',
  status text not null default 'draft',
  started_at timestamptz not null default timezone('utc', now()),
  ended_at timestamptz,
  transcript_summary text,
  detected_emotion_label text,
  sensitive_default boolean not null default true,
  audio_saved boolean not null default false,
  audio_retained boolean not null default false,
  audio_retention_consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint voice_sessions_session_type_check check (
    session_type in (
      'quick_log',
      'daily_command',
      'night_reflection',
      'interview_practice',
      'learning_tutor',
      'gym_checkin',
      'research_mentor',
      'general_chat',
      'crisis_soft'
    )
  ),
  constraint voice_sessions_voice_mode_check check (
    voice_mode in (
      'friend_voice',
      'strict_coach_voice',
      'calm_mentor_voice',
      'morning_command_voice',
      'night_reflection_voice',
      'teacher_voice',
      'research_mentor_voice',
      'gym_coach_voice',
      'crisis_soft_voice'
    )
  ),
  constraint voice_sessions_status_check check (
    status in (
      'draft',
      'active',
      'ended',
      'discarded',
      'pending_confirmation',
      'saved',
      'error'
    )
  ),
  constraint voice_sessions_audio_consent_check check (
    audio_retained = false or audio_retention_consent = true
  )
);

create table if not exists public.voice_transcripts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  voice_session_id uuid not null references public.voice_sessions(id) on delete cascade,
  source_message_id uuid references public.chat_messages(id) on delete set null,
  source_ai_action_id uuid references public.ai_actions(id) on delete set null,
  speaker text not null default 'user',
  transcript_text text not null,
  transcript_source text not null default 'voice',
  segment_index integer not null default 0,
  started_at timestamptz,
  ended_at timestamptz,
  occurred_at timestamptz,
  logged_at timestamptz not null default timezone('utc', now()),
  confidence_score numeric(5,4),
  needs_review boolean not null default true,
  correction_text text,
  detected_emotion_label text,
  is_sensitive boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint voice_transcripts_speaker_check check (
    speaker in ('user', 'carnos', 'system')
  ),
  constraint voice_transcripts_source_check check (
    transcript_source in ('voice', 'manual', 'simulated', 'text')
  ),
  constraint voice_transcripts_confidence_score_check check (
    confidence_score is null or (confidence_score >= 0 and confidence_score <= 1)
  )
);

alter table public.voice_sessions enable row level security;
alter table public.voice_transcripts enable row level security;

create policy "Users can view their own voice sessions"
  on public.voice_sessions
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own voice sessions"
  on public.voice_sessions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own voice sessions"
  on public.voice_sessions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own voice sessions"
  on public.voice_sessions
  for delete
  using (auth.uid() = user_id);

create policy "Users can view their own voice transcripts"
  on public.voice_transcripts
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own voice transcripts"
  on public.voice_transcripts
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own voice transcripts"
  on public.voice_transcripts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own voice transcripts"
  on public.voice_transcripts
  for delete
  using (auth.uid() = user_id);

create index if not exists voice_sessions_user_started_idx
  on public.voice_sessions(user_id, started_at desc);

create index if not exists voice_sessions_user_status_idx
  on public.voice_sessions(user_id, status);

create index if not exists voice_sessions_chat_session_idx
  on public.voice_sessions(chat_session_id);

create index if not exists voice_sessions_source_message_idx
  on public.voice_sessions(source_message_id);

create index if not exists voice_sessions_source_ai_action_idx
  on public.voice_sessions(source_ai_action_id);

create index if not exists voice_transcripts_user_logged_idx
  on public.voice_transcripts(user_id, logged_at desc);

create index if not exists voice_transcripts_session_segment_idx
  on public.voice_transcripts(voice_session_id, segment_index);

create index if not exists voice_transcripts_source_message_idx
  on public.voice_transcripts(source_message_id);

create index if not exists voice_transcripts_source_ai_action_idx
  on public.voice_transcripts(source_ai_action_id);
