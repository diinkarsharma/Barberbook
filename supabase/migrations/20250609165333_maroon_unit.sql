/*
  # Seed Initial Data for BarberBook Application

  1. Sample Data
    - Insert sample barbershops
    - Insert sample barbers
    - Insert sample services
    - Create admin user profile
*/

-- Insert sample barbershops
INSERT INTO barbershops (id, name, location, image_url, rating, wait_time) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Blade & Fade', 'Karol Bagh, Delhi', 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=500', 4.8, '15 mins'),
  ('550e8400-e29b-41d4-a716-446655440002', 'The Cut Spot', 'T. Nagar, Chennai', 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=500', 4.5, '25 mins'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Royal Cuts', 'Bandra West, Mumbai', 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=500', 4.7, '10 mins');

-- Insert sample barbers
INSERT INTO barbers (id, barbershop_id, name, image_url, speciality, available, rating) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Rajesh Kumar', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 'Fade Expert', true, 4.8),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Amit Singh', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150', 'Beard Styling', false, 4.6),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Vikram Sharma', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 'Traditional Shaves', true, 4.9),
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Suresh Reddy', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 'Classic Cuts', true, 4.7),
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Karthik Nair', 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150', 'Modern Styles', true, 4.5),
  ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Ravi Sharma', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', 'Traditional Shaves', true, 4.9);

-- Insert sample services
INSERT INTO services (barbershop_id, name, price, duration) VALUES
  -- Blade & Fade services
  ('550e8400-e29b-41d4-a716-446655440001', 'Classic Fade', 150, 30),
  ('550e8400-e29b-41d4-a716-446655440001', 'Beard Trim', 100, 20),
  ('550e8400-e29b-41d4-a716-446655440001', 'Premium Cut', 200, 45),
  ('550e8400-e29b-41d4-a716-446655440001', 'Hair Wash', 80, 15),
  ('550e8400-e29b-41d4-a716-446655440001', 'Styling', 120, 25),
  
  -- The Cut Spot services
  ('550e8400-e29b-41d4-a716-446655440002', 'Premium Cut', 200, 45),
  ('550e8400-e29b-41d4-a716-446655440002', 'Styling', 120, 25),
  ('550e8400-e29b-41d4-a716-446655440002', 'Head Massage', 150, 30),
  ('550e8400-e29b-41d4-a716-446655440002', 'Classic Fade', 180, 35),
  
  -- Royal Cuts services
  ('550e8400-e29b-41d4-a716-446655440003', 'Royal Treatment', 300, 60),
  ('550e8400-e29b-41d4-a716-446655440003', 'Quick Trim', 100, 20),
  ('550e8400-e29b-41d4-a716-446655440003', 'Shave & Style', 180, 40),
  ('550e8400-e29b-41d4-a716-446655440003', 'Beard Sculpting', 150, 30);