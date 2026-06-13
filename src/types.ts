/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BabyActivity = 'dormindo' | 'brincando' | 'passeando' | 'colo_sling';

export type DayMoment = 'dia' | 'noite';

export interface WeatherCondition {
  temp: number;
  moment: DayMoment;
  activity: BabyActivity;
  hasAC: boolean;
}

export interface ClothingItem {
  name: string;
  category: 'base' | 'middle' | 'outer' | 'accessory';
  description: string;
  icon: string; // Lucide icon name
}

export interface ClimaBabyRecommendation {
  tempRange: string;
  clothingCombination: ClothingItem[];
  layerExplanation: string[];
  recommendedFabrics: string[];
  safeSleepTip: string;
  comfortStatus: 'frio_intenso' | 'frio' | 'fresco' | 'agradavel' | 'quente' | 'muito_quente';
}
