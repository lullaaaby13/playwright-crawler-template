import {describe, it} from "vitest";
import 'app/src-electron/utils/extentions/common';

describe("Array Extensions", () => {

  it("spec name", () => {
    const champions = [
      {
        name: 'Aatrox',
        role: 'Top',
        from: 'Demacia'
      },
      {
        name: 'Ahri',
        role: 'Mid',
        from: 'Ionia'
      },
      {
        name: 'Akali',
        role: 'Mid',
        from: 'Ionia'
      },
      {
        name: 'Alistar',
        role: 'Support',
        from: 'Demacia'
      },
      {
        name: 'Amumu',
        role: 'Jungle',
        from: 'Shurima'
      },
      {
        name: 'Anivia',
        role: 'Mid',
        from: 'Freljord'
      },
      {
        name: 'Annie',
        role: 'Mid',
        from: 'Noxus'
      },
      {
        name: 'Aphelios',
        role: 'ADC',
        from: 'Targon'
      },
      {
        name: 'Ashe',
        role: 'ADC',
        from: 'Freljord'
      },
      {
        name: 'Aurelion Sol',
        role: 'Mid',
        from: 'Targon'
      },
      {
        name: 'Azir',
        role: 'Mid',
        from: 'Shurima'
      },
      {
        name: 'Bard',
        role: 'Support',
        from: 'Runeterra'
      },
      {
        name: 'Blitzcrank',
        role: 'Support',
        from: 'Zaun'
      },
      {
        name: 'Brand',
        role: 'Support',
        from: 'Freljord'
      },
      {
        name: 'Braum',
        role: 'Support',
        from: 'Freljord'
      },
      {
        name: 'Caitlyn',
        role: 'ADC',
        from: 'Piltover'
      },
      {
        name: 'Camille',
        role: 'Top',
        from: 'Piltover'
      },
      {
        name: 'Cassiopeia',
        role: 'Mid',
        from: 'Noxus'
      },
      {
        name: 'Cho\'Gath',
        role: 'Top',
        from: 'Void'
      },
      {
        name: 'Corki',
        role: 'ADC',
        from: 'Bandle City'
      },
      {
        name: 'Darius',
        role: 'Top',
        from: 'Noxus'
      },
      {
        name: 'Diana',
        role: 'Mid',
        from: 'Targon'
      },
      {
        name: 'Dr. Mundo',
        role: 'Top',
        from: 'Zaun'
      },
      {
        name: 'Draven',
        role: 'ADC',
        from: 'Noxus'
      },
      {
        name: 'Ekko',
        role: 'Mid',
        from: 'Zaun'
      },
    ]


    console.log(champions.groupBy(champion => champion.role));
    console.log(champions.groupBy(champion => champion.from));


  });

});
