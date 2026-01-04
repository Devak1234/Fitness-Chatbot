import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import '../styles/ProfileForm.css';

function ProfileForm({ profile, onProfileChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...profile,
    allergies: profile.allergies || '',
    workSchedule: profile.workSchedule || '',
    preferredWorkoutTime: profile.preferredWorkoutTime || 'Flexible',
    equipmentAvailable: profile.equipmentAvailable || [],
    medicalConditions: profile.medicalConditions || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'goal', 'activityLevel', 'dietType'];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    // Numeric validations
    if (formData.age && (formData.age < 10 || formData.age > 120)) {
      newErrors.age = 'Age must be between 10 and 120 years';
    }

    if (formData.height && (formData.height < 50 || formData.height > 250)) {
      newErrors.height = 'Height must be between 50 and 250 cm';
    }

    if (formData.weight && (formData.weight < 20 || formData.weight > 300)) {
      newErrors.weight = 'Weight must be between 20 and 300 kg';
    }

    // Name validation
    if (formData.name && formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightM = height / 100;
      return (weight / (heightM * heightM)).toFixed(2);
    }
    return null;
  };

  const calculateBMR = (gender, age, height, weight) => {
    if (!gender || !age || !height || !weight) return null;
    // Mifflin-St Jeor Equation
    const base = gender === 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    return Math.round(base);
  };

  const getActivityMultiplier = (activityLevel) => {
    switch (activityLevel) {
      case 'Sedentary': return 1.2;
      case 'Light': return 1.375;
      case 'Moderate': return 1.55;
      case 'Heavy': return 1.725;
      default: return 1.2;
    }
  };

  const calculateMaintenanceCalories = (bmr, activityLevel) => {
    if (!bmr) return null;
    const multiplier = getActivityMultiplier(activityLevel);
    return Math.round(bmr * multiplier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      onProfileChange(formData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">👤 Fitness Profile</h2>
          <p className="text-gray-500">Manage your personal information and fitness goals</p>
        </div>
        <Button
          onClick={() => {
            setIsEditing(!isEditing);
            setErrors({});
          }}
          variant={isEditing ? "secondary" : "primary"}
        >
          {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
        </Button>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-6">
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm font-medium">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <Card title="📋 Basic Information" className="h-fit">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">👤 Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">🎂 Age *</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        placeholder="18"
                        min="10"
                        max="120"
                      />
                      {errors.age && <span className="text-xs text-red-500 font-medium">{errors.age}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">⚧️ Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <span className="text-xs text-red-500 font-medium">{errors.gender}</span>}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Physical Metrics Card */}
              <Card title="📏 Physical Metrics" className="h-fit">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">📐 Height (cm) *</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.height ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        placeholder="170"
                        min="50"
                        max="250"
                      />
                      {errors.height && <span className="text-xs text-red-500 font-medium">{errors.height}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">⚖️ Weight (kg) *</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.weight ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                        placeholder="70"
                        min="20"
                        max="300"
                        step="0.1"
                      />
                      {errors.weight && <span className="text-xs text-red-500 font-medium">{errors.weight}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">🎯 Fitness Goal *</label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.goal ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    >
                      <option value="">Select your goal</option>
                      <option value="Weight Gain">Weight Gain</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Strength / Muscle Gain">Strength / Muscle Gain</option>
                      <option value="Maintain">Maintain Weight</option>
                    </select>
                    {errors.goal && <span className="text-xs text-red-500 font-medium">{errors.goal}</span>}
                  </div>
                </div>
              </Card>

              {/* Lifestyle Card */}
              <Card title="🏃 Lifestyle & Preferences" className="h-fit">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">🏋️ Activity Level *</label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.activityLevel ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    >
                      <option value="">Select activity level</option>
                      <option value="Sedentary">Sedentary (little exercise)</option>
                      <option value="Light">Light (1-3 days/week)</option>
                      <option value="Moderate">Moderate (3-5 days/week)</option>
                      <option value="Heavy">Heavy (6-7 days/week)</option>
                    </select>
                    {errors.activityLevel && <span className="text-xs text-red-500 font-medium">{errors.activityLevel}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">🥗 Diet Type *</label>
                      <select
                        name="dietType"
                        value={formData.dietType}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.dietType ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      >
                        <option value="">Select diet type</option>
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                        <option value="Egg">Egg (includes eggs)</option>
                        <option value="Vegan">Vegan</option>
                      </select>
                      {errors.dietType && <span className="text-xs text-red-500 font-medium">{errors.dietType}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">⏰ Time</label>
                      <select
                        name="preferredWorkoutTime"
                        value={formData.preferredWorkoutTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Health & Equipment Card */}
              <Card title="🏥 Health & Equipment" className="h-fit">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">🚫 Allergies</label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g., nuts, dairy (optional)"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">💼 Work Schedule</label>
                    <select
                      name="workSchedule"
                      value={formData.workSchedule}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="">Select schedule</option>
                      <option value="Student">Student</option>
                      <option value="Job">9-5 Job</option>
                      <option value="Shift Worker">Shift Worker</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">🏋️ Equipment</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Bodyweight', 'Dumbbells', 'Barbell', 'Gym Machine', 'Resistance Bands', 'Kettlebell'].map(equip => (
                        <label key={equip} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            checked={formData.equipmentAvailable.includes(equip)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.equipmentAvailable, equip]
                                : formData.equipmentAvailable.filter(item => item !== equip);
                              setFormData(prev => ({ ...prev, equipmentAvailable: updated }));
                            }}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{equip}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full md:w-1/3 py-3 text-lg"
              >
                {isSubmitting ? '💾 Saving...' : '💾 Save Profile'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Health Metrics Overview */}
          {(profile.height && profile.weight) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-3xl">📊</div>
                <div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">BMI</div>
                  <div className="text-3xl font-bold text-gray-900 leading-none mb-1">{calculateBMI(profile.height, profile.weight)}</div>
                  <Badge variant={
                    (() => {
                      const bmi = calculateBMI(profile.height, profile.weight);
                      if (bmi < 18.5) return 'warning';
                      if (bmi < 25) return 'success';
                      if (bmi < 30) return 'warning';
                      return 'danger';
                    })()
                  }>
                    {(() => {
                      const bmi = calculateBMI(profile.height, profile.weight);
                      if (bmi < 18.5) return 'Underweight';
                      if (bmi < 25) return 'Normal';
                      if (bmi < 30) return 'Overweight';
                      return 'Obese';
                    })()}
                  </Badge>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-3xl">🔥</div>
                <div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Daily Calories</div>
                  <div className="text-3xl font-bold text-gray-900 leading-none mb-1">
                    {(() => {
                      const bmr = calculateBMR(profile.gender, profile.age, profile.height, profile.weight);
                      return calculateMaintenanceCalories(bmr, profile.activityLevel) || 'N/A';
                    })()}
                  </div>
                  <div className="text-sm text-gray-400">kcal/day</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-3xl">⚡</div>
                <div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">BMR</div>
                  <div className="text-3xl font-bold text-gray-900 leading-none mb-1">
                    {calculateBMR(profile.gender, profile.age, profile.height, profile.weight) || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-400">kcal/day</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card title="📋 Basic Information">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">👤 Name:</span>
                  <span className="text-gray-900 font-medium">{profile.name || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🎂 Age:</span>
                  <span className="text-gray-900 font-medium">{profile.age ? `${profile.age} years` : 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">⚧️ Gender:</span>
                  <span className="text-gray-900 font-medium">{profile.gender || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">📐 Height:</span>
                  <span className="text-gray-900 font-medium">{profile.height ? `${profile.height} cm` : 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">⚖️ Weight:</span>
                  <span className="text-gray-900 font-medium">{profile.weight ? `${profile.weight} kg` : 'Not set'}</span>
                </div>
              </div>
            </Card>

            {/* Fitness Goals */}
            <Card title="🎯 Fitness Goals">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🎯 Goal:</span>
                  <span className="text-gray-900 font-medium">
                    {profile.goal ? (
                      <Badge variant={
                        profile.goal === 'Weight Loss' ? 'success' :
                          profile.goal === 'Weight Gain' ? 'warning' : 'secondary'
                      }>
                        {profile.goal}
                      </Badge>
                    ) : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🏋️ Activity:</span>
                  <span className="text-gray-900 font-medium">{profile.activityLevel || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🥗 Diet:</span>
                  <span className="text-gray-900 font-medium">
                    {profile.dietType ? (
                      <Badge variant="secondary">{profile.dietType}</Badge>
                    ) : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">⏰ Time:</span>
                  <span className="text-gray-900 font-medium">{profile.preferredWorkoutTime || 'Flexible'}</span>
                </div>
              </div>
            </Card>

            {/* Equipment & Preferences */}
            <Card title="🏋️ Equipment & Preferences">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">💼 Work Schedule:</span>
                  <span className="text-gray-900 font-medium">{profile.workSchedule || 'Not set'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-gray-600 text-sm pl-1">Available Equipment:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.equipmentAvailable?.length ? (
                      profile.equipmentAvailable.map(equip => (
                        <Badge key={equip} variant="default" size="small">
                          {equip}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400 italic text-sm pl-1">None specified</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Health Information */}
            <Card title="🏥 Health Information">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🚫 Allergies:</span>
                  <span className="text-gray-900 font-medium">{profile.allergies || 'None'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-600">🏥 Conditions:</span>
                  <span className="text-gray-900 font-medium">{profile.medicalConditions || 'None'}</span>
                </div>
              </div>
              {profile.medicalConditions && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex items-center gap-2">
                    ⚠️ Please consult healthcare providers
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;