import { Component, OnInit } from '@angular/core';
import { Grid, GridOptions } from 'ag-grid/main';

import { Card } from '../shared/classes/card';
import { UpdateInventoryComponent } from '../shared/components/grid-cells/update-inventory.component';

@Component({
  selector: 'app-craftulator',
  templateUrl: './craftulator.component.html',
  styleUrls: ['./craftulator.component.css']
})
export class CraftulatorComponent implements OnInit {

  private data: any;
  private filterData: any;
  private gridOptions: GridOptions;
  private totalDustRequired: number;
  private showAll: boolean;

  constructor() { 
    this.initGrid();
  }

  ngOnInit() {
    this.gridOptions.onGridReady = () => {
      this.data = this.getRowData();
      this.setGridData(this.data);
      this.setRequiredDust();
    }
  }

  private toggleFilter(showAll) {
    /*const data = [];
    if(showAll){
      console.log('show complete');
      this.setGridData(this.data);
    } else {
      console.log('hide complete');
      this.gridOptions.api.forEachNode(node => {
        if(node.data.inventory !== node.data.max){
          data.push(node.data);
        }
      });
      this.setGridData(data);
    }*/
  }

  private setRequiredDust() {
    this.totalDustRequired = 0;
    this.gridOptions.api.forEachNode((node) => {
      this.totalDustRequired += this.getTotalCardCost(node.data);
    });
  }

  private updateRequiredDust(action: string, rarity: string) {
    const costEach = this.getRarityCost(rarity);
    if (action === 'add') {
      this.totalDustRequired -= costEach;
    } else {
      this.totalDustRequired += costEach;
    }
  }

  private getTotalCardCost(card: Card) {
    const costEach = this.getRarityCost(card.rarity);
    return card.rarity.toLowerCase() === 'legendary' ? costEach : costEach * 2;
  }

  private getRarityCost(rarity: string){
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 1600;
      case 'epic':
        return 400;
      case 'rare':
        return 100;
      case 'common':
        return 40;
      default:
        return 0;
    }
  }

  private initGrid() {
    this.gridOptions = {
      columnDefs: this.getColumnData(),
      rowData: [],
      pagination: true,
      paginationPageSize: 10,
      suppressCellSelection: true,
      enableColResize: true,
      enableFilter: true,
      floatingFilter: true,
      enableSorting: true,
      headerHeight: 45,
      rowHeight: 40
    };
    this.gridOptions.onRowClicked = (row) => { this.onRowClicked(row) };
    this.gridOptions.getRowStyle = (params) => {
      if (params.data.inventory === params.data.max) {
        return { 
          'background': '#cccccc'
        }
      } else {
        return { 
          'background': '#ffffff'
        }
      }
    };
  }

  private onRowClicked(row) {
    const element = row.event.target as HTMLInputElement;
    if (element !== undefined) {
      const actionType = element.getAttribute('data-action-type');
      switch(actionType) {
        case 'add':
          this.addCard(row);
          break;
        case 'remove':
          this.removeCard(row);
          break;
        default:
          break;  
      }
    }
  }

  private addCard(row) {
    row.data.inventory++;
    this.updateRequiredDust('add', row.data.rarity);
    row.node.setData(row.data);
    //this.toggleFilter(this.showComplete);
    this.gridOptions.api.refreshCells();
  }

  private removeCard(row) {
    row.data.inventory--;
    this.updateRequiredDust('remove', row.data.rarity);
    row.node.setData(row.data);
    //this.toggleFilter(this.showComplete);
    this.gridOptions.api.refreshCells();
  }

  private getColumnData() {
    return [
      {
        width: 56,
        suppressFilter: true,
        cellRendererFramework: UpdateInventoryComponent
      },
      {
        headerName: 'Own',
        field: 'inventory',
        width: 45,
        suppressFilter: true,
        cellStyle: {'text-align': 'center'}
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 350
      },
      {
        headerName: 'Class',
        field: 'class'
      },
      {
        headerName: 'Rarity',
        field: 'rarity'
      }
    ];
  }

  private setGridData(data){
    this.gridOptions.api.setRowData(data);
    this.gridOptions.api.sizeColumnsToFit();
  }

  private getRowData(){
    return [  
      {  
         "id":1,
         "name":"Baku the Mooneater",
         "class":"Neutral",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":2,
         "name":"Azalina Soulthief",
         "class":"Neutral",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":3,
         "name":"Genn Greymane",
         "class":"Neutral",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":4,
         "name":"Phantom Militia",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":5,
         "name":"Pumpkin Peasant",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":6,
         "name":"Militia Commander",
         "class":"Warrior",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":7,
         "name":"Murkspark Eel",
         "class":"Shaman",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":8,
         "name":"Black Cat",
         "class":"Mage",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":9,
         "name":"Gloom Stag",
         "class":"Druid",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":10,
         "name":"Glitter Moth",
         "class":"Priest",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":11,
         "name":"Face Collector",
         "class":"Rogue",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":12,
         "name":"Warpath",
         "class":"Warrior",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":13,
         "name":"Houndmaster Shaw",
         "class":"Hunter",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":14,
         "name":"Rotten Applebaum",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":15,
         "name":"Witchwood Apple",
         "class":"Druid",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":16,
         "name":"Wispering Woods",
         "class":"Druid",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":17,
         "name":"Rebuke",
         "class":"Paladin",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":18,
         "name":"Vivid Nightmare",
         "class":"Priest",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":19,
         "name":"Glinda Crowskin",
         "class":"Warlock",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":20,
         "name":"Nightmare Amalgam",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":21,
         "name":"Witch's Apprentice",
         "class":"Shaman",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":22,
         "name":"Hagatha The Witch",
         "class":"Shaman",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":23,
         "name":"Muck Hunter",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":24,
         "name":"Redband Wasp",
         "class":"Warrior",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":25,
         "name":"Lord Godfrey",
         "class":"Warlock",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":26,
         "name":"Hunting Mastiff",
         "class":"Hunter",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":27,
         "name":"Forest Guide",
         "class":"Druid",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":28,
         "name":"WANTED!",
         "class":"Rogue",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":29,
         "name":"Scaleworm",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":30,
         "name":"Vex Crow",
         "class":"Mage",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":31,
         "name":"Blackwald Pixie",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":32,
         "name":"Clockwork Automation",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":33,
         "name":"Coffin Crasher",
         "class":"Priest",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":34,
         "name":"Darius Crowley",
         "class":"Warrior",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":35,
         "name":"Emeriss",
         "class":"Hunter",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":36,
         "name":"Raven Caller",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":37,
         "name":"Sound the Bells!",
         "class":"Paladin",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":38,
         "name":"Cheap Shot",
         "class":"Rogue",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":39,
         "name":"Blackhowl Gunspire",
         "class":"Warrior",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":40,
         "name":"Lady In White",
         "class":"Priest",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":41,
         "name":"Cursed Castaway",
         "class":"Rogue",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":42,
         "name":"Chameleos",
         "class":"Priest",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":43,
         "name":"Duskhaven Hunter",
         "class":"Hunter",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":44,
         "name":"Toxmonger",
         "class":"Hunter",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":45,
         "name":"Witchwood Grizzly",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":46,
         "name":"Witching Hour",
         "class":"Druid",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":47,
         "name":"Cathedral Gargoyle",
         "class":"Paladin",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":48,
         "name":"Woodcutter's Axe",
         "class":"Warrior",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":49,
         "name":"Deadly Arsenal",
         "class":"Warrior",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":50,
         "name":"Duskfallen Aviana",
         "class":"Druid",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":51,
         "name":"Witch's Cauldron",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":52,
         "name":"Wing Blast",
         "class":"Hunter",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":53,
         "name":"Rat Trap",
         "class":"Hunter",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":54,
         "name":"Holy Water",
         "class":"Priest",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":55,
         "name":"Spectral Cutlass",
         "class":"Rogue",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":56,
         "name":"Bogshaper",
         "class":"Shaman",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":57,
         "name":"Duskbat",
         "class":"Warlock",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":58,
         "name":"Deathweb Spider",
         "class":"Warlock",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":59,
         "name":"Blood Witch",
         "class":"Warlock",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":60,
         "name":"Dire Frenzy",
         "class":"Hunter",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":61,
         "name":"Swift Messenger",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":62,
         "name":"Spellshifter",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":63,
         "name":"Gilnean Royal Guard",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":64,
         "name":"Dollmaster Dorian",
         "class":"Neutral",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":65,
         "name":"Voodoo Doll",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":66,
         "name":"Splintergraft",
         "class":"Druid",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":67,
         "name":"Toki, Time-Tinker",
         "class":"Mage",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":68,
         "name":"Mistwraith",
         "class":"Rogue",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":69,
         "name":"Pickpocket",
         "class":"Rogue",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":70,
         "name":"Silver Sword",
         "class":"Paladin",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":71,
         "name":"Bellringer Sentry",
         "class":"Paladin",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":72,
         "name":"The Glass Knight",
         "class":"Paladin",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":73,
         "name":"Worgen Abomination",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":74,
         "name":"Town Crier",
         "class":"Warrior",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":75,
         "name":"Totem Cruncher",
         "class":"Shaman",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":76,
         "name":"Countess Ashmore",
         "class":"Neutral",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":77,
         "name":"Book of Specters",
         "class":"Mage",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":78,
         "name":"Mossy Horror",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":79,
         "name":"Festeroot Hulk",
         "class":"Warrior",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":80,
         "name":"Splitting Festeroot",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":81,
         "name":"Blink Fox",
         "class":"Rogue",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":82,
         "name":"Tess Greymane",
         "class":"Rogue",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":83,
         "name":"Archmage Arugal",
         "class":"Mage",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":84,
         "name":"Bonfire Elemental",
         "class":"Mage",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":85,
         "name":"Arcane Keysmith",
         "class":"Mage",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":86,
         "name":"Witchwood Piper",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":87,
         "name":"Druid of the Scythe",
         "class":"Druid",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":88,
         "name":"Ferocious Howl",
         "class":"Druid",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":89,
         "name":"Bewitched Guardian",
         "class":"Druid",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":90,
         "name":"Paragon of Light",
         "class":"Paladin",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":91,
         "name":"Curse of Weakness",
         "class":"Warlock",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":92,
         "name":"Squashling",
         "class":"Priest",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":93,
         "name":"Ghost Light Angler",
         "class":"Shaman",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":94,
         "name":"Shudderwock",
         "class":"Shaman",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":95,
         "name":"Baleful Banker",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":96,
         "name":"Zap!",
         "class":"Shaman",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":97,
         "name":"Carrion Drake",
         "class":"Hunter",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":98,
         "name":"Vileblood Skitterer",
         "class":"Hunter",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":99,
         "name":"Wyrmguard",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":100,
         "name":"Vicious Scalehide",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":101,
         "name":"Prince Liam",
         "class":"Paladin",
         "rarity":"Legendary",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":102,
         "name":"Earthen Might",
         "class":"Shaman",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":103,
         "name":"Hidden Wisdom",
         "class":"Paladin",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":104,
         "name":"Blazing Invocation",
         "class":"Shaman",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":105,
         "name":"Ghostly Charger",
         "class":"Paladin",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":106,
         "name":"Swamp Dragon Egg",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":107,
         "name":"Cinderstorm",
         "class":"Mage",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":108,
         "name":"Curio Collector",
         "class":"Mage",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":109,
         "name":"Marsh Drake",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":110,
         "name":"Darkmire Moonkin",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":111,
         "name":"Rabid Worgen",
         "class":"Warrior",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":112,
         "name":"Tanglefur Mystic",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":113,
         "name":"Hench-Clan Thug",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":114,
         "name":"Nightscale Matriarch",
         "class":"Priest",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":115,
         "name":"Quartz Elemental",
         "class":"Priest",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":116,
         "name":"Unpowered Steambot",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":117,
         "name":"Cutthroat Buccaneer",
         "class":"Rogue",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":118,
         "name":"Divine Hymn",
         "class":"Priest",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":119,
         "name":"Walnut Sprite",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":120,
         "name":"Fiendish Circle",
         "class":"Warlock",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":121,
         "name":"Dark Possession",
         "class":"Warlock",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":122,
         "name":"Snap Freeze",
         "class":"Mage",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":123,
         "name":"Mad Hatter",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":124,
         "name":"Lifedrinker",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":125,
         "name":"Furious Ettin",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":126,
         "name":"Witchwood Imp",
         "class":"Warlock",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":127,
         "name":"Cauldron Elemental",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":128,
         "name":"Lost Spirit",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":129,
         "name":"Sandbinder",
         "class":"Neutral",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":130,
         "name":"Ratcatcher",
         "class":"Warlock",
         "rarity":"Epic",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":131,
         "name":"Chief Inspector",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":132,
         "name":"Felsoul Inquisitor",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":133,
         "name":"Deranged Doctor",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":134,
         "name":"Swamp Leech",
         "class":"Neutral",
         "rarity":"Common",
         "set":"Witchwood",
         "inventory":0
      },
      {  
         "id":135,
         "name":"Night Prowler",
         "class":"Neutral",
         "rarity":"Rare",
         "set":"Witchwood",
         "inventory":0
      }
   ];
  }

}
