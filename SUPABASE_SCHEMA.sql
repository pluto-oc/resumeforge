-- ResumeForge Database Schema

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  generated_resume TEXT,
  generated_cover_letter TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON resumes(user_id);
CREATE INDEX IF NOT EXISTS resumes_created_at_idx ON resumes(created_at DESC);

-- RLS Policies (Row Level Security)
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own resumes
CREATE POLICY "Users can read own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow anyone to create resumes (for MVP, no auth required)
CREATE POLICY "Anyone can create resumes"
  ON resumes FOR INSERT
  WITH CHECK (true);

-- Allow users to update their own resumes
CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);
