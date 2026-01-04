import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'goal', 'activityLevel', 'dietType'];
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') newErrors[field] = 'Required';
    });

    if (formData.age && (formData.age < 10 || formData.age > 120)) newErrors.age = 'Invalid age';
    if (formData.height && (formData.height < 50 || formData.height > 250)) newErrors.height = 'Invalid height';
    if (formData.weight && (formData.weight < 20 || formData.weight > 300)) newErrors.weight = 'Invalid weight';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightM = height / 100;
      return (weight / (heightM * heightM)).toFixed(1);
    }
    return null;
  };

  const calculateBMR = (gender, age, height, weight) => {
    if (!gender || !age || !height || !weight) return null;
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
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onProfileChange(formData);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to save.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for Input Fields to keep JSX clean
  const InputField = ({ label, name, type = "text", placeholder, options, ...props }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-sub uppercase tracking-wider">{label}</label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-input border rounded-xl text-main focus:ring-2 focus:ring-primary outline-none transition-all ${errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-border/50'}`}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-input border rounded-xl text-main focus:ring-2 focus:ring-primary outline-none transition-all ${errors[name] ? 'border-red-500 ring-1 ring-red-500' : 'border-border/50'}`}
          {...props}
        />
      )}
      {errors[name] && <span className="text-xs text-red-500 font-medium">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end border-b border-border/50 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-main tracking-tight uppercase">Athlete Profile</h2>
          <p className="text-sub mt-2 text-lg font-light">Manage your biometrics & performance goals.</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="hover:bg-primary hover:text-white border-primary text-primary"
          >
            Edit Dashboard
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {errors.submit && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-500 p-4 rounded text-sm font-bold">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Stats */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border space-y-6">
              <h3 className="text-xl font-bold text-main border-b border-border/50 pb-4">Personal Stats</h3>
              <InputField label="Full Name" name="name" placeholder="John Doe" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Age" name="age" type="number" placeholder="25" min="10" max="120" />
                <InputField label="Gender" name="gender" options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Height (cm)" name="height" type="number" placeholder="180" min="50" max="250" />
                <InputField label="Weight (kg)" name="weight" type="number" placeholder="75" min="20" max="300" step="0.1" />
              </div>
            </div>

            {/* Performance Goals */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border space-y-6">
              <h3 className="text-xl font-bold text-main border-b border-border/50 pb-4">Performance Goals</h3>
              <InputField label="Primary Goal" name="goal" options={[
                { label: 'Weight Loss', value: 'Weight Loss' },
                { label: 'Weight Gain', value: 'Weight Gain' },
                { label: 'Muscle Gain', value: 'Strength / Muscle Gain' },
                { label: 'Maintain', value: 'Maintain' }
              ]} />
              <InputField label="Activity Level" name="activityLevel" options={[
                { label: 'Sedentary', value: 'Sedentary' },
                { label: 'Light (1-3 days/wk)', value: 'Light' },
                { label: 'Moderate (3-5 days/wk)', value: 'Moderate' },
                { label: 'Heavy (6-7 days/wk)', value: 'Heavy' }
              ]} />
              <InputField label="Diet Type" name="dietType" options={[
                { label: 'Vegetarian', value: 'Veg' },
                { label: 'Non-Vegetarian', value: 'Non-Veg' },
                { label: 'Contains Egg', value: 'Egg' },
                { label: 'Vegan', value: 'Vegan' }
              ]} />
            </div>

            {/* Logistics */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border space-y-6 md:col-span-2">
              <h3 className="text-xl font-bold text-main border-b border-border/50 pb-4">Logistics & Equipment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField label="Training Time" name="preferredWorkoutTime" options={[{ label: 'Morning', value: 'Morning' }, { label: 'Evening', value: 'Evening' }, { label: 'Flexible', value: 'Flexible' }]} />
                  <div className="mt-4">
                    <InputField label="Work Schedule" name="workSchedule" options={[{ label: 'Student', value: 'Student' }, { label: '9-5 Job', value: 'Job' }, { label: 'Shift Work', value: 'Shift Worker' }, { label: 'Flexible', value: 'Flexible' }]} />
                  </div>
                  <div className="mt-4">
                    <InputField label="Medical Conditions" name="medicalConditions" placeholder="None" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-sub uppercase tracking-wider mb-3 block">Equipment Available</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Bodyweight', 'Dumbbells', 'Barbell', 'Gym Machine', 'Resistance Bands', 'Kettlebell'].map(equip => (
                      <label key={equip} className={`
                                    flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all font-medium text-sm text-center select-none
                                    ${formData.equipmentAvailable.includes(equip)
                          ? 'bg-primary text-white border-primary shadow-md transform scale-[1.02]'
                          : 'bg-input text-sub border-transparent hover:bg-hover hover:text-main'}
                                `}>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={formData.equipmentAvailable.includes(equip)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...formData.equipmentAvailable, equip]
                              : formData.equipmentAvailable.filter(item => item !== equip);
                            setFormData(prev => ({ ...prev, equipmentAvailable: updated }));
                          }}
                        />
                        {equip}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="flex-1 py-4 text-sub hover:bg-input hover:text-main">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-[2] py-4 text-lg font-bold shadow-lg shadow-primary/20">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Analysis Section */}
          {(profile.height && profile.weight) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BMI Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3a1 1 0 011 1v16a1 1 0 11-2 0V4a1 1 0 011-1zm-4 8a1 1 0 011 1v7a1 1 0 11-2 0v-7a1 1 0 011-1zm8-4a1 1 0 011 1v11a1 1 0 11-2 0V8a1 1 0 011-1z" /></svg>
                </div>
                <div className="text-xs font-bold text-sub uppercase tracking-widest mb-2">BMI Score</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-main tracking-tighter">
                    {calculateBMI(profile.height, profile.weight)}
                  </span>
                </div>
                <div className="mt-4">
                  <Badge variant={
                    (() => {
                      const bmi = calculateBMI(profile.height, profile.weight);
                      if (bmi < 18.5) return 'warning';
                      if (bmi < 25) return 'success';
                      if (bmi < 30) return 'warning';
                      return 'danger';
                    })()
                  } size="large" className="shadow-sm">
                    {(() => {
                      const bmi = calculateBMI(profile.height, profile.weight);
                      if (bmi < 18.5) return 'Underweight';
                      if (bmi < 25) return 'Healthy Weight';
                      if (bmi < 30) return 'Overweight';
                      return 'Obese';
                    })()}
                  </Badge>
                </div>
              </div>

              {/* TDEE Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM11.995 13h.009v.009h-.009V13z" /></svg>
                </div>
                <div className="text-xs font-bold text-sub uppercase tracking-widest mb-2">Daily Targets</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-main tracking-tighter">
                    {(() => {
                      const bmr = calculateBMR(profile.gender, profile.age, profile.height, profile.weight);
                      return calculateMaintenanceCalories(bmr, profile.activityLevel) || '—';
                    })()}
                  </span>
                  <span className="text-sm font-medium text-sub">kcal</span>
                </div>
                <div className="mt-4 text-sm font-medium text-primary">
                  Maintenance Calories
                </div>
              </div>

              {/* BMR Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="text-xs font-bold text-sub uppercase tracking-widest mb-2">Basal Rate (BMR)</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-main tracking-tighter">
                    {calculateBMR(profile.gender, profile.age, profile.height, profile.weight) || '—'}
                  </span>
                  <span className="text-sm font-medium text-sub">kcal</span>
                </div>
                <div className="mt-4 text-sm font-medium text-sub opacity-70">
                  Calories burned at rest
                </div>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-main mb-6 uppercase tracking-wide opacity-80 border-b border-border/50 pb-2">Stats & Bio</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Name</span><span className="text-main font-bold">{profile.name}</span></div>
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Biometrics</span><span className="text-main font-bold">{profile.age}y • {profile.height}cm • {profile.weight}kg</span></div>
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Goal</span>
                  <Badge variant="secondary" className="font-bold">{profile.goal}</Badge>
                </div>
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Activity</span><span className="text-main font-bold">{profile.activityLevel}</span></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-main mb-6 uppercase tracking-wide opacity-80 border-b border-border/50 pb-2">Training Parameters</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Diet</span><span className="text-main font-bold">{profile.dietType}</span></div>
                <div className="flex justify-between items-center"><span className="text-sub font-medium">Preferred Time</span><span className="text-main font-bold">{profile.preferredWorkoutTime}</span></div>
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-sub font-medium">Equipment Access</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.equipmentAvailable?.map(e => <span key={e} className="px-2 py-1 bg-input rounded text-xs font-semibold text-sub border border-border">{e}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;