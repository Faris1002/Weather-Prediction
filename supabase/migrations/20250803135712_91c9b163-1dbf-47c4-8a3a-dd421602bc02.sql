-- Fix security issues

-- 1. Fix function search path for handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Enable RLS on moods table (it was missing RLS)
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- Create policies for moods table
CREATE POLICY "Users can view their own moods" 
ON moods FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own moods" 
ON moods FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own moods" 
ON moods FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own moods" 
ON moods FOR DELETE 
USING (auth.uid() = user_id);