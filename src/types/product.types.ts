// Basic product information
export interface Nutrition {
    energy_kcal_100g: number;
    energy_kj_100g: number;
    proteins_100g: number;
    carbohydrates_100g: number;
    sugars_100g: number;
    fat_100g: number;
    saturated_fat_100g: number;
    fiber_100g: number;
    salt_100g: number;
    sodium_100g: number;
}

export interface Product {
    id: string;
    code: string;
    product_name: string;
    generic_name?: string;
    quantity: string;
    packaging?: string[];
    packaging_tags?: string[];
    brands: string[];
    categories: string[];
    categories_tags: string[];
    categories_en: string[];
    origins: string[];
    manufacturing_places?: string[];
    labels?: string[];
    labels_tags?: string[];
    labels_en?: string[];
    allergens?: string[];
    traces?: string[];
    ingredients_text: string;
    nutrition: Nutrition;
    nutrition_grade: string;
    nova_group?: number;
    image_url: string;
    image_small_url: string;
    image_ingredients_url?: string;
    image_nutrition_url?: string;
    created_t: number;
    last_modified_t: number;
    serving_size?: string;
    serving_quantity?: number;
    additives_n?: number;
    additives_tags?: string[];
    states_tags: string[];
    states_en: string[];
    main_category?: string;
    main_category_en?: string;
}

export interface NutritionFacts {
    // Basic nutrition
    energy_100g?: number;
    energy_kcal_100g?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    saturated_fat_100g?: number;
    fiber_100g?: number;
    sodium_100g?: number;
    
    // Vitamins
    vitamin_a_100g?: number;
    vitamin_b1_100g?: number;
    vitamin_b2_100g?: number;
    vitamin_b6_100g?: number;
    vitamin_b9_100g?: number;
    vitamin_b12_100g?: number;
    vitamin_c_100g?: number;
    vitamin_d_100g?: number;
    vitamin_e_100g?: number;
    vitamin_k_100g?: number;
    vitamin_pp_100g?: number;
    
    // Minerals
    calcium_100g?: number;
    iron_100g?: number;
    magnesium_100g?: number;
    zinc_100g?: number;
    potassium_100g?: number;
    phosphorus_100g?: number;
    copper_100g?: number;
    manganese_100g?: number;
    selenium_100g?: number;
    
    // Fats breakdown
    omega_3_fat_100g?: number;
    omega_6_fat_100g?: number;
    omega_9_fat_100g?: number;
    monounsaturated_fat_100g?: number;
    polyunsaturated_fat_100g?: number;
    trans_fat_100g?: number;
    cholesterol_100g?: number;
    
    // Other nutrients
    biotin_100g?: number;
    pantothenic_acid_100g?: number;
    silica_100g?: number;
    bicarbonate_100g?: number;
    chloride_100g?: number;
    chromium_100g?: number;
    molybdenum_100g?: number;
    caffeine_100g?: number;
    taurine_100g?: number;
    
    // Composition indicators
    ph_100g?: number;
    fruits_vegetables_nuts_100g?: number;
    collagen_meat_protein_ratio_100g?: number;
    cocoa_100g?: number;
}

// Display configuration
export interface ProductDisplayConfig {
    showNutritionScore: boolean;
    showEcoScore: boolean;
    showIngredients: boolean;
    showNutritionFacts: boolean;
    showAllergens: boolean;
    showOrigins: boolean;
    showAdditives: boolean;
    nutritionFactsToShow: (keyof NutritionFacts)[];
}

// Default display configuration
export const DEFAULT_DISPLAY_CONFIG: ProductDisplayConfig = {
    showNutritionScore: true,
    showEcoScore: true,
    showIngredients: true,
    showNutritionFacts: true,
    showAllergens: true,
    showOrigins: true,
    showAdditives: false,
    nutritionFactsToShow: [
        'energy_kcal_100g',
        'proteins_100g',
        'carbohydrates_100g',
        'sugars_100g',
        'fat_100g',
        'saturated_fat_100g',
        'fiber_100g',
        'sodium_100g'
    ]
}; 