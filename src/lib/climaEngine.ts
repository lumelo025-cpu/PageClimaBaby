/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClimaBabyRecommendation, WeatherCondition, ClothingItem } from '../types';

export function getClimaRecommendation(condition: WeatherCondition): ClimaBabyRecommendation {
  const { temp, moment, activity, hasAC } = condition;
  
  let tempAdjusted = temp;
  // If AC is on, temperature is typically controlled, but let's simulate the air draft.
  if (hasAC) {
    tempAdjusted = Math.min(tempAdjusted, 22); // Assume cooled stable room
  }
  // Colo/Sling adds warmth equivalent to being in a warmer room
  if (activity === 'colo_sling') {
    tempAdjusted += 1.5;
  }

  let comfortStatus: ClimaBabyRecommendation['comfortStatus'] = 'agradavel';
  let tempRange = '';
  let clothingCombination: ClothingItem[] = [];
  let layerExplanation: string[] = [];
  let recommendedFabrics: string[] = [];
  let safeSleepTip = 'Mantenha o ambiente bem arejado e verifique a temperatura tocando na nuca ou no peitinho do bebê, que são os melhores indicadores de conforto térmico.';

  if (tempAdjusted < 16) {
    comfortStatus = 'frio_intenso';
    tempRange = 'Abaixo de 16°C • Frio Intenso';
    
    clothingCombination = [
      { name: 'Body Manga Longa', category: 'base', description: 'Proteção inicial e térmica de algodão na pele', icon: 'Shirt' },
      { name: 'Calça Culote (Mijão)', category: 'base', description: 'Calça justa por baixo para reter o calor das pernas', icon: 'Footprints' },
      { name: 'Macacão Soft ou Plush', category: 'middle', description: 'Segunda camada quentinha com pezinho fechado', icon: 'Layers' },
      { name: 'Meias térmicas grossas', category: 'accessory', description: 'Para manter as extremidades protegidas', icon: 'Heart' }
    ];

    if (activity === 'dormindo') {
      clothingCombination.push({
        name: 'Saco de Dormir Soft (TOG 2.5)',
        category: 'outer',
        description: 'Substitui cobertores soltos para um sono aquecido e 100% seguro',
        icon: 'Moon'
      });
      safeSleepTip = 'Nunca use cobertas soltas no berço sob frio intenso. O Saco de Dormir TOG 2.5 mantém o bebê aquecido a noite toda sem risco de sufocamento acidental.';
    }

    layerExplanation = [
      '1ª Camada (Pele): Body de algodão respirável para evitar suor e assaduras.',
      '2ª Camada (Aquecimento): Macacão soft ou plush para barreira de aquecimento denso.',
      '3ª Camada (Exterior / Sono): Saco de dormir térmico de algodão estruturado.'
    ];

    recommendedFabrics = ['Soft / Fleece', 'Plush macio', 'Algodão Escovado'];

  } else if (tempAdjusted >= 16 && tempAdjusted < 19) {
    comfortStatus = 'frio';
    tempRange = '16°C a 18°C • Clima Frio';

    clothingCombination = [
      { name: 'Body Manga Longa', category: 'base', description: 'Proteção delicada e térmico leve', icon: 'Shirt' },
      { name: 'Calça Culote de Algodão', category: 'base', description: 'Justinho e esticável para conforto das juntas', icon: 'Footprints' },
      { name: 'Macacão Suedine Algodão', category: 'middle', description: 'Cobertura ideal com toque macio premium', icon: 'Layers' }
    ];

    if (activity === 'dormindo') {
      clothingCombination.push({
        name: 'Saco de Dormir Algodão Acolchoado',
        category: 'outer',
        description: 'Guia de segurança com proteção de braços livres',
        icon: 'Moon'
      });
      safeSleepTip = 'Em noites frias de 17°C, as extremidades (mãozinhas) podem parecer frias, mas isso é fisiológico. Toque na nuca do bebê para confirmar que ele está na temperatura ideal.';
    } else {
      clothingCombination.push({ name: 'Meias de algodão', category: 'accessory', description: 'Proteção para os pezinhos descalços', icon: 'Heart' });
    }

    layerExplanation = [
      '1ª Camada (Pele): Absorção de sebo natural com algodão hipoalergênico.',
      '2ª Camada (Conforto): Macacão confortável de suedine 100% algodão para regular calor.',
      'Se Dormir: Proteção extra antiresfriamento com saco de dormir protetor.'
    ];

    recommendedFabrics = ['Algodão Suedine', 'Plush de algodão', 'Fleece leve'];

  } else if (tempAdjusted >= 19 && tempAdjusted < 22) {
    comfortStatus = 'fresco';
    tempRange = '19°C a 21°C • Clima Fresco';

    clothingCombination = [
      { name: 'Body Manga Longa', category: 'base', description: 'Conforto clássico para dias equilibrados', icon: 'Shirt' },
      { name: 'Calça Culote (Mijão)', category: 'base', description: 'Material leve e ultra maleável', icon: 'Footprints' }
    ];

    if (activity === 'brincando' || activity === 'passeando') {
      clothingCombination.push({ name: 'Macacão leve de algodão', category: 'middle', description: 'Capa de passeio macia com zíper protegido', icon: 'Layers' });
    } else if (activity === 'dormindo') {
      clothingCombination.push({ name: 'Saco de Dormir de Algodão Fino (TOG 1.0)', category: 'outer', description: 'Conforto térmico perfeito de meia-estação', icon: 'Moon' });
      safeSleepTip = 'Evite toucas para dormir. A cabeça do bebê é a principal via de dispersão de calor; cobri-la durante o sono pode causar superaquecimento.';
    }

    layerExplanation = [
      '1ª Camada: Conjunto clássico body + mijão de algodão penteado.',
      '2ª Camada: Macacão de espessura média fácil de abrir para trocas rápidas de fralda.'
    ];

    recommendedFabrics = ['Algodão Penteado', 'Suedine Macio', 'Malha de Interlock'];

  } else if (tempAdjusted >= 22 && tempAdjusted < 25) {
    comfortStatus = 'agradavel';
    tempRange = '22°C a 24°C • Clima Agradável';

    clothingCombination = [
      { name: 'Body Manga Curta', category: 'base', description: 'Deixa os bracinhos livres e confortáveis', icon: 'Shirt' },
      { name: 'Calça Culote Fina', category: 'base', description: 'Proteção essencial de pernas contra brisas', icon: 'Footprints' }
    ];

    if (activity === 'dormindo') {
      clothingCombination.push({ name: 'Saco de Dormir de Verão (TOG 0.5)', category: 'outer', description: 'Camada de toque fresco e aconchegante', icon: 'Moon' });
      safeSleepTip = 'Nesta faixa de temperatura agradável, um body de algodão egípcio leve é suficiente. O bebê dormirá profundamente com as vias aéreas livres e frescas.';
    }

    layerExplanation = [
      'Base Essencial: Body manga curta de algodão leve.',
      'Proteção Inferior: Calça de espessura fina para evitar atrito nas coxas do bebê.',
      'Saco de Dormir: Opcional e muito leve (TOG < 0.5), apenas para aconchego.'
    ];

    recommendedFabrics = ['Algodão Egípcio', 'Malha Fina de Algodão', 'Bambu Sustentável'];

  } else if (tempAdjusted >= 25 && tempAdjusted < 28) {
    comfortStatus = 'quente';
    tempRange = '25°C a 27°C • Clima Quente';

    clothingCombination = [
      { name: 'Body Manga Curta Leve', category: 'base', description: 'Fresco e confortável de material super fino', icon: 'Shirt' }
    ];

    if (activity === 'brincando' || activity === 'passeando') {
      clothingCombination.push({ name: 'Shorts de Algodão Confortável', category: 'base', description: 'Fácil movimentação e transpiração livre', icon: 'Footprints' });
    }

    safeSleepTip = 'Prefira roupas claras e 100% algodão para facilitar a troca de calor com a atmosfera. Se o bebê estiver inquieto, verifique se a nuca não está suada.';
    
    layerExplanation = [
      'Camada Única: Apenas body manga curta e sem camadas extras para manter a pele ventilada.',
      'Livre de Cobertores: Totalmente contraindicado qualquer saco ou coberta quente.'
    ];

    recommendedFabrics = ['Gaze de Algodão', 'Modal Hipoalergênico', 'Algodão Orgânico Fino'];

  } else {
    comfortStatus = 'muito_quente';
    tempRange = 'Acima de 28°C • Calor Intenso';

    clothingCombination = [
      { name: 'Body Regata ou Fralda', category: 'base', description: 'Minimalismo para máximo resfriamento natural', icon: 'Shirt' }
    ];

    safeSleepTip = 'Ofereça amamentação em livre demanda em dias muito quentes para manter seu bebê hidratado. Evite passeios diretos sob o sol entre 10h e 16h.';

    layerExplanation = [
      'Ventilação Máxima: Apenas fraldinha confortável ou body regata de trama bem aberta.',
      'Zero Peças de Poliéster: Tecidos sintéticos retêm calor e umidade, favorecendo brotosejas.'
    ];

    recommendedFabrics = ['Cambraia de algodão', 'Linho Amaciado', 'Trama de Algodão 100%'];
  }

  // Activity & Room overrules
  if (hasAC && activity !== 'colo_sling') {
    // Override base with long sleeve if it wasn't already, because AC drafts are chilly.
    const hasLongSleeve = clothingCombination.some(item => item.name.includes('Manga Longa'));
    if (!hasLongSleeve) {
      clothingCombination = clothingCombination.map(item => {
        if (item.name === 'Body Manga Curta') {
          return { ...item, name: 'Body Manga Longa', description: 'Protege os bracinhos do fluxo de vento do AC' };
        }
        return item;
      });
    }
  }

  if (activity === 'colo_sling') {
    safeSleepTip = '🤱 No Sling ou Colo, seu bebê está recebendo seu calor corporal de forma direta. Roupas com zíperes metálicos de contato direto devem ser evitadas para não machucar o bebê.';
  }

  return {
    tempRange,
    clothingCombination,
    layerExplanation,
    recommendedFabrics,
    safeSleepTip,
    comfortStatus
  };
}
