export interface PersonalData {
  name: string;
  height: number; // in cm
  weight: number; // in kg
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  goal: 'lose_weight' | 'gain_muscle' | 'lose_fat_maintain_muscle' | 'maintain_weight';
}

export interface HealthMetrics {
  bmi: number;
  bmr: number;
  dailyCalories: number;
  targetCalories: number;
  bmiCategory: string;
  idealWeight: number;
}