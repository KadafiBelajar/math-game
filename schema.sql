-- Simple schema for a math problems table

CREATE TABLE math_problems (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data

INSERT INTO math_problems (question, answer)
VALUES
  ('2 + 2', '4'),
  ('10 - 3', '7'),
  ('5 * 5', '25');
