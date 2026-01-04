# 📸 Missing Image Assets

This file tracks images that need to be added to complete the fitness application.

## 🥗 Food Images (`/public/images/foods/`)

### **Required Images** (95 total)
Add these images to `/public/images/foods/` directory:

- `chicken_breast.jpg`
- `paneer.jpg`
- `boiled_egg.jpg`
- `almonds.jpg`
- `milk.jpg`
- `banana.jpg`
- `oats.jpg`
- `curd.jpg`
- `brown_rice.jpg`
- `fish.jpg` (salmon)
- `lentils.jpg`
- `spinach.jpg`
- `sweet_potato.jpg`
- `peanut_butter.jpg`
- `greek_yogurt.jpg`
- `quinoa.jpg`
- `tofu.jpg`
- `avocado.jpg`
- `broccoli.jpg`
- `turkey.jpg`
- `chia_seeds.jpg`
- `cottage_cheese.jpg`
- `pumpkin_seeds.jpg`
- `kidney_beans.jpg`
- `mushrooms.jpg`
- `walnuts.jpg`
- `bell_peppers.jpg`
- `cucumber.jpg`
- `carrots.jpg`
- `apples.jpg`
- `oranges.jpg`
- `strawberries.jpg`
- `blueberries.jpg`
- `beef.jpg`
- `tuna.jpg`
- `shrimp.jpg`
- `whole_wheat_bread.jpg`
- `potatoes.jpg`
- `onions.jpg`
- `garlic.jpg`
- `ginger.jpg`
- `turmeric.jpg`
- `cumin.jpg`
- `coriander.jpg`
- `fenugreek.jpg`
- `amaranth.jpg`
- `buckwheat.jpg`
- `millet.jpg`
- `jowar.jpg`
- `ragi.jpg`
- `rajma.jpg`
- `chickpeas.jpg`
- `moong_dal.jpg`
- `urad_dal.jpg`
- `masoor_dal.jpg`

### **Fallback Image**
- `placeholder-food.png` (400x300px recommended)

## 🏋️ Workout Images (`/public/images/workouts/`)

### **Required Images**
Add exercise images following the naming convention from `src/data/workoutsData.js` and `src/data/comprehensiveWorkoutsData.js`.

### **Fallback Image**
- `placeholder-workout.png` (400x300px recommended)

## 📋 Image Specifications

### **Recommended Dimensions**
- **Food Images**: 400x300px (4:3 aspect ratio)
- **Workout Images**: 400x300px (4:3 aspect ratio)
- **Format**: JPG or PNG
- **Quality**: Web-optimized (under 100KB per image)

### **Naming Convention**
- Use lowercase with underscores: `chicken_breast.jpg`
- Match the `slug` field from data files
- No spaces or special characters

## 🔧 How to Add Images

1. Create the directories:
   ```bash
   mkdir -p public/images/foods
   mkdir -p public/images/workouts
   ```

2. Add images with correct names matching data structure

3. The app will automatically use placeholder images if specific images are missing

## 🎨 Image Sources

Consider using:
- **Unsplash**: High-quality food and fitness images
- **Pexels**: Free stock photos
- **Custom Photography**: Professional food styling

## ✅ Verification

After adding images, test by:
1. Opening Nutrition Library → Browse foods
2. Opening Workout Library → Browse exercises
3. Checking that images load properly
4. Verifying fallback to placeholder images works

---

**Note**: The application is fully functional without images - placeholders provide a good user experience while you source appropriate images.