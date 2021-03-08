import { Component, OnInit,Input, Output ,EventEmitter} from '@angular/core';
import { spawn } from 'child_process';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.less']
})
export class EmojiComponent implements OnInit {
  @Output() emojiPosInMenu: EventEmitter<any> = new EventEmitter();
  searchEmoji=''
  emojiPos:object={}
  recentlyUsed:boolean=false
  peopleEmoji:boolean=true
  animalEmoji:boolean=false
  foodEmoji:boolean=false
  recentEmojiPos:Array<object>=[]
  ppl:any=[
    {name:'police',className:'p1',type:'face' },
    {name:'grining-face',className:'p2',type:'face' },
    {name:'happy-face',className:'p3',type:'face' },
    {name:'sneezing-face',className:'p4' },
    {name:'face-with-tears-of-joy',className:'p5',type:'face' },
    {name:'grining-face-with-big-eyes',className:'p6',type:'face' },
    {name:'grining-squinting-face',className:'p7',type:'face' },
    {name:'grining-face',className:'p8' ,type:'face'},
    {name:'vomit',className:'p9',type:'face' },
    {name:'smile',className:'p10' ,type:'face'},
    {name:'innocent',className:'p11',type:'face' },
    {name:'angry',className:'p12',type:'face' },
    {name:'wink',className:'p13',type:'face' },
    {name:'blush',className:'p14' ,type:'face' },
    {name:'yum',className:'p15',type:'face' },
    {name:'satisfy',className:'p16',type:'face' },
    {name:'heart-eyes',className:'p17',type:'face' },
    {name:'dark-glass',className:'p18',type:'face' },
    {name:'smirk',className:'p19',type:'face' },
    {name:'neutral',className:'p20',type:'face' },
    {name:'expressionless',className:'p21',type:'face' },
    {name:'confused',className:'p22',type:'face' },
    {name:'sweat',className:'p23' ,type:'face'},
    {name:'relieved',className:'p24',type:'face' },
    {name:'confused',className:'p25',type:'face' },
    {name:'confounded',className:'p26',type:'face' },
    {name:'kissing',className:'p27',type:'face' },
    {name:'kissing-heart',className:'p28',type:'face' },
    {name:'kissing-smiling-eyes',className:'p29',type:'face' },
    {name:'happy-heart-eyes',className:'p30' ,type:'face' },
    {name:'stuck-out-tongue',className:'p31' ,type:'face' },
    {name:'stuck-out_tongue-wink',className:'p32',type:'face' },
    {name:'stuck_out_tongue-closed-eyes',className:'p33' ,type:'face' },
    {name:'disappointed',className:'p34' ,type:'face' },
    {name:'anguished',className:'p35' ,type:'face'},
    {name:'Upside-Down',className:'p36',type:'face' },
    {name:'nauseated',className:'p37' ,type:'face' },
    {name:'flushed',className:'p38' ,type:'face'},
    {name:'sweat',className:'p39' ,type:'face' },
    {name:'red-cheek-sad',className:'p40',type:'face' },
    {name:'triumph',className:'p41',type:'face' },
    {name:'sweat',className:'p42' ,type:'face'},
    {name:'weary',className:'p43' ,type:'face'},
    {name:'speechless',className:'p44' ,type:'face'},
    {name:'tired-face',className:'p45' ,type:'face'},
    {name:'grimacing',className:'p46',type:'face' },
    {name:'thermometer,sick',className:'p47' ,type:'face'},
    {name:'rolling-eyes',className:'p49' ,type:'face'},
    {name:'crying',className:'p50' ,type:'face'},
    {name:'thinking',className:'p51' ,type:'face'},
    {name:'shocking_open_eyes',className:'p52' ,type:'face'},
    {name:'shocking',className:'p53' ,type:'face'},
    {name:'head_bandage',className:'p54' ,type:'face'},
    {name:'sweat_shocking',className:'p55' ,type:'face'},
    {name:'scary',className:'p56' ,type:'face'},
    {name:'weary',className:'p57' ,type:'face'},
    {name:'shocked_with_blushed',className:'p58' ,type:'face'},
    {name:'sleeping',className:'p59' ,type:'face'},
    {name:'dizzy',className:'p60' ,type:'face'},
    {name:'ghost',className:'p61' ,type:'face'},
    {name:'speechless',className:'p62' ,type:'face'},
    {name:'blush',className:'p63' ,type:'face'},
    {name:'mask',className:'p64' ,type:'face'},
    {name:'smile-cat',className:'p65' ,type:'face'},
    {name:'cat-with-tears-of-joy',className:'p66' ,type:'face'},
    {name:'shocked-cat',className:'p67' ,type:'face'},
    {name:'happy-cat-with-two-eyes',className:'p68' ,type:'face'},
    {name:'smirk-cat',className:'p69' ,type:'face'},
    {name:'kissing-cat',className:'p70' ,type:'face'},
    {name:'angry-cat',className:'p71' ,type:'face'},
    {name:'lying-face-emoji',className:'p72' ,type:'face'},
    {name:'shocked-cat',className:'p73' ,type:'face'},
    {name:'open-hand',className:'p74' ,type:'hand'},
    {name:'bye',className:'p75' ,type:'hand'},
    {name:'ok_gesture',className:'p76' ,type:'hand'},
    {name:'clapping',className:'p77' ,type:'hand'},
    {name:'punch',className:'p78' ,type:'hand'},
    {name:'thumbsup',className:'p79' ,type:'hand'},
    {name:'thumbsdown',className:'p80' ,type:'hand'},
    {name:'point_right',className:'p81' ,type:'hand'},
    {name:'point_left',className:'p82' ,type:'hand'},
    {name:'point_down',className:'p83' ,type:'hand'},
    {name:'point_up',className:'p84' ,type:'hand'},
    {name:'muscle',className:'p85' ,type:'hand'},
    {name:'fist',className:'p86' ,type:'hand'},
    {name:'high-five',className:'p87' ,type:'hand'},
    {name:'writing-hand',className:'p88' ,type:'hand'},
    {name:'point-up',className:'p89' ,type:'hand'},
    {name:'i-love-you-hand',className:'p90' ,type:'hand'},
    {name:'raised-hand',className:'p91' ,type:'hand'},
    {name:'spock-hand',className:'p92' ,type:'hand'},
    {name:'reversed-hand-with-middle-finger',className:'p93' ,type:'hand'},
    {name:'call-me-hand',className:'p94' ,type:'hand'},
  ]

  animals:any=[
    {name:'rabbit',className:'a1',type:'animal'},
    {name:'',className:'a2'},
    {name:'snake',className:'a3',type:'animal'},
    {name:'crocodile',className:'a4',type:'animal'},
    {name:'whale',className:'a5',type:'animal'},
    {name:'',className:'a6',type:'animal'},
    {name:'anaconda',className:'a7',type:'animal'},
    {name:'horse',className:'a8',type:'animal'},
    {name:'goat',className:'a9',type:'animal'},
    {name:'ram',className:'a10',type:'animal'},
    {name:'monkey',className:'a11',type:'animal'},
    {name:'coack',className:'a12',type:'animal'},
    {name:'hen',className:'a13',type:'animal'},
    {name:'crabs',className:'a14',type:'animal'},
    {name:'',className:'a15',type:'animal'},
    {name:'pig',className:'a16',type:'animal'},
    {name:'bear',className:'a17',type:'animal'},
    {name:'elephant',className:'a18',type:'animal'},
    {name:'head-fish',className:'a19',type:'animal'},
    {name:'Shell',className:'a20',type:'animal'},
    {name:'catterpillar',className:'a21',type:'animal'},
    {name:'ant',className:'a22',type:'animal'},
    {name:'butterfly',className:'a23',type:'animal'},
    {name:'',className:'a24',type:'animal'},
    {name:'fish',className:'a25'},
    {name:'',className:'a26',type:'animal'},
    {name:'frog',className:'a27',type:'animal'},
    {name:'pig',className:'a28',type:'animal'},
    {name:'dog',className:'a29',type:'animal'},
    {name:'monkey-face',className:'a30',type:'animal'},
    {name:'donkey',className:'a31',type:'animal'},
    {name:'whale',className:'a32',type:'animal'},
    {name:'',className:'a33',type:'animal'},
    {name:'cat',className:'a34',type:'animal'},
    {name:'rabbit',className:'a35',type:'animal'},
    {name:'cat',className:'a36',type:'animal'},
    {name:'cow',className:'a37',type:'animal'},
    {name:'mouse',className:'a38',type:'animal'},
    {name:'dolphin',className:'a39',type:'animal'},
    {name:'camel',className:'a40',type:'animal'},
    {name:'',className:'a41',type:'animal'},
    {name:'',className:'a42',type:'animal'},
    {name:'bear',className:'a43',type:'animal'},
    {name:'penguin',className:'a44'},
    {name:'fish',className:'a45',type:'animal'},
    {name:'hatched-chick',className:'a46',type:'animal'},
    {name:'baby-chick',className:'a47',type:'animal'},
    {name:'chicken',className:'a48',type:'animal'},
    {name:'blossom ',className:'a49',type:'flower'},
    {name:'sun-flower',className:'a50',type:'flower'},
    {name:'hibiscus',className:'a51',type:'flower'},
    {name:'rose',className:'a52',type:'flower'},
    {name:'cherry-blossom',className:'a53',type:'flower'},
    {name:'lotus',className:'a54',type:'flower'},
    {name:'cactus',className:'a55',type:'flower'},
    {name:'coconut-tree',className:'a56',type:'tree'},
    {name:'deciduous',className:'a57',type:'tree'},
    {name:'christmas',className:'a58',type:'tree'},
    {name:'tanabata',className:'a59',type:'tree'},    
  ]

  food:any=[
    {name:'corn',className:'f1',type:'food'},
    {name:'corn',className:'f2',type:'food'},
    {name:'corn',className:'f3',type:'food'},
    {name:'corn',className:'f4',type:'food'},
    {name:'corn',className:'f5',type:'food'},
    {name:'corn',className:'f6',type:'food'},
    {name:'corn',className:'f7',type:'food'},
    {name:'corn',className:'f8',type:'food'},
    {name:'mashroom',className:'f9',type:'food'},
    {name:'tomato',className:'f10',type:'food,vegitables'},
    {name:'brinjal',className:'f11',type:'food,vegitables'},
    {name:'grapes',className:'f12',type:'food,fruits'},
    {name:'pumpkin',className:'f13',type:'food,vegitabless'},
    {name:'water-melon',className:'f14',type:'food,vegitables'},
    {name:'orange',className:'f15',type:'food,fruits'},
    {name:'mango',className:'f16',type:'food,fruits'},
    {name:'banana',className:'f17',type:'food,fruits'},
    {name:'pineapple',className:'f18',type:'food,fruits'},
    {name:'apple',className:'f19',type:'food,fruits'},
    {name:'',className:'f20',type:'food,fruits'},
    {name:'guava',className:'f21',type:'food'},
    {name:'fish-cake',className:'f22',type:'food,meat'},
    {name:'fried-shrimp',className:'f23',type:'food,meat'},
    {name:'pastry',className:'f24',type:'food'},
    {name:'dango',className:'f25',type:'food'},
    {name:'oden',className:'f26',type:'food'},
    {name:'corn',className:'f27',type:'food'},
    {name:'french-fries',className:'f28',type:'food'},
    {name:'bread',className:'f29',type:'food'},
    {name:'ramen',className:'f30',type:'food'},
    {name:'',className:'f31',type:'food'},
    {name:'',className:'f32',type:'food'},
    {name:'rice',className:'f33',type:'food,grain'},
    {name:'',className:'f34',type:'food,biscuit'},
    {name:'cookie',className:'f35',type:'food,sweet'},
    {name:'poultry-leg',className:'f36',type:'food,meat'},
    {name:'candy',className:'f37',type:'food'},
    {name:'pizza',className:'f38',type:'food,junk'},
    {name:'burger',className:'f39',type:'food,junk'},
    {name:'strawberry',className:'f40',type:'food,fruits'},
    {name:'',className:'f41',type:'food'},
    {name:'',className:'f42',type:'food'},
    {name:'cake',className:'f43',type:'food'},
    {name:'popcorn',className:'f44',type:'food'},
    {name:'campaign',className:'f45',type:'food'},
    {name:'cake',className:'f46',type:'food'},
    {name:'baby-bottle',className:'f47',type:'drink,milk'},
    {name:'',className:'f48',type:'food'},
    {name:'spoon',className:'f49',type:'food,utensils'},
    {name:'milk-glass',className:'f50',type:'food,drink'},
    {name:'clinking-glass',className:'f51',type:'food,drink'},

  ]

  constructor() { }


  ngOnInit(): void {
   
    if(localStorage.getItem('marx_emoji'))
    {
      this.recentEmojiPos=JSON.parse(localStorage.getItem('marx_emoji'))
    }
    
  }

  
  show_area(e:any)
  {
    let el = document.getElementById(e);
    el.scrollIntoView();

  }

  checkEmojiExists(o)
  {
    
    for(let i=0; i < this.recentEmojiPos.length; i++){
      if(JSON.stringify(this.recentEmojiPos[i]) === JSON.stringify(o)){
        return true;
      }
    }
    return false;
  }
  

  show_emoji_in_editor(e:any)
  {

    const emoji=e.target;
    const posx=getComputedStyle(emoji).backgroundPositionX;
    const posy=getComputedStyle(emoji).backgroundPositionY;
    this.emojiPos={
      x:posx,
      y:posy
    }
    
    this.emojiPosInMenu.emit(this.emojiPos);
    console.log("CLASSSSSS",e.target.classList[1])
    var a = [];

    a = JSON.parse(localStorage.getItem('marx_emoji')) || [];
    if(!a.includes(e.target.className))
    {
      a.push(e.target.className);
    }
    localStorage.setItem('marx_emoji', JSON.stringify(a));
    console.log("RECENT",this.recentEmojiPos)
    if(!this.recentEmojiPos.includes(e.target.className))
    {
      this.recentEmojiPos.push(e.target.className)
    }



  }
   
}
