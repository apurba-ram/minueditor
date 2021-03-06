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
    {name:'grining-face',className:'p8' },
    {name:'wave',className:'p9',type:'hand' },
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
    {name:'sleepy',className:'p39' ,type:'face' },
    {name:'red-cheek-sad',className:'p40',type:'face' },
    {name:'triumph',className:'p41',type:'face' },
    {name:'sweat',className:'p42' ,type:'face'},
    {name:'weary',className:'p43' ,type:'face'},
    {name:'speechless',className:'p44' ,type:'face'},
    {name:'tired-face',className:'p45' ,type:'face'},
    {name:'grimacing',className:'p46',type:'face' },
    {name:'ok-hand',className:'p47' ,type:'hand'},
    {name:'crying',className:'p48' ,type:'face' },
    {name:'thumbsup',className:'p49',type:'face' },
    {name:'surprised',className:'p50' ,type:'face'},
    {name:'surprised',className:'p51' ,type:'face' },
    {name:'thumbsdown',className:'p52' ,type:'face' },
    {name:'sweat_shockin',className:'p53' ,type:'face' },
    {name:'scaream',className:'p54' ,type:'face'},
    {name:'astonished, shocked',className:'p55', type:'face' },
    {name:'shocked',className:'p56' ,type:'face' },
    {name:'sleeping',className:'p57' ,type:'face' },
    {name:'dizzy',className:'p58' ,type:'face' },
    {name:'speechless',className:'p59' ,type:'face' },
    {name:'mask-face',className:'p60' ,type:'face' },
    {name:'cat_with-tears_of_joy',className:'p62',type:'face' },
    {name:'grining_cat',className:'p64',type:'face' },
    {name:'cat_with_heart_eyes',className:'p65' ,type:'face' },
    {name:'shocked_cat',className:'p66' ,type:'face' },
    {name:'blushed_cat',className:'p67' ,type:'face' },
    {name:'angry_cat',className:'p68' ,type:'face' },
    {name:'swaet_cat_face',className:'p69' ,type:'face' },
    {name:'clapping',className:'p70' ,type:'face' },
    {name:'shocking_cat',className:'p71' ,type:'face' },
    {name:'school_girl',className:'p72' ,type:'face'},
    {name:'shocking',className:'p73',type:'face' },
    {name:'woman_gesturing_no',className:'p74',type:'face' },
    {name:'woman_gesturing_no',className:'p75' ,type:'face' },
    {name:'woman_gesturing_no',className:'p76' ,type:'face' },
    {name:'police',className:'p77' },
    {name:'police',className:'p78' },
    {name:'police',className:'p79' },
    {name:'man_gesturing_ok',className:'p80' ,type:'face' },
    {name:'feet',className:'p81' ,type:'feet'},
    {name:'pari',className:'p82' ,type:'face'},
    {name:'police',className:'p83' },
    {name:'police',className:'p84' },
    {name:'police',className:'p85' },
    {name:'police',className:'p86' },
    {name:'police',className:'p87' },
    {name:'police',className:'p88' },
    {name:'police',className:'p89' },
    {name:'police',className:'p90' },
    {name:'police',className:'p91' },
    {name:'police',className:'p92' },
    {name:'police',className:'p93' },
    {name:'police',className:'p94' },
    {name:'police',className:'p95' },
    {name:'police',className:'p96' },
    {name:'police',className:'p97' },
    {name:'police',className:'p98' },
    {name:'police',className:'p99' },
    {name:'police',className:'p100' },
    {name:'police',className:'p101' },
    {name:'police',className:'p102' },
    {name:'police',className:'p103' },
    {name:'police',className:'p104' },
    {name:'police',className:'p105' },
    {name:'police',className:'p106' },
    {name:'police',className:'p107' },
    {name:'police',className:'p108' },
    {name:'police',className:'p109' },
    {name:'police',className:'p110' },
    {name:'police',className:'p111' },
    {name:'police',className:'p112' },
    {name:'police',className:'p113' },
    {name:'police',className:'p114' },
    {name:'police',className:'p115' },
    {name:'police',className:'p116' },
    {name:'police',className:'p117' },
  ]

  animals:any=[
    {name:'',className:'a1'},
    {name:'',className:'a2'},
    {name:'',className:'a3'},
    {name:'',className:'a4'},
    {name:'',className:'a5'},
    {name:'',className:'a6'},
    {name:'',className:'a7'},
    {name:'',className:'a8'},
    {name:'',className:'a9'},
    {name:'',className:'a10'},
    {name:'',className:'a11'},
    {name:'',className:'a12'},
    {name:'',className:'a13'},
    {name:'',className:'a14'},
    {name:'',className:'a15'},
    {name:'',className:'a16'},
    {name:'',className:'a17'},
    {name:'',className:'a18'},
    {name:'',className:'a19'},
    {name:'',className:'a20'},
    {name:'',className:'a21'},
    {name:'',className:'a22'},
    {name:'',className:'a23'},
    {name:'',className:'a24'},
    {name:'',className:'a25'},
    {name:'',className:'a26'},
    {name:'',className:'a27'},
    {name:'',className:'a28'},
    {name:'',className:'a29'},
    {name:'',className:'a30'},
    {name:'',className:'a31'},
    {name:'',className:'a32'},
    {name:'',className:'a33'},
    {name:'happy-cat',className:'a34'},
    {name:'happy-cat',className:'a35'},
    {name:'happy-cat',className:'a36'},
    {name:'happy-cat',className:'a37'},
    {name:'happy-cat',className:'a38'},
    {name:'happy-cat',className:'a39'},
    {name:'happy-cat',className:'a40'},
    {name:'happy-cat',className:'a41'},
    {name:'happy-cat',className:'a42'},
    {name:'happy-cat',className:'a43'},
    {name:'happy-cat',className:'a44'},
    {name:'happy-cat',className:'a45'},
    {name:'happy-cat',className:'a46'},
    {name:'happy-cat',className:'a47'},
    {name:'happy-cat',className:'a48'},
    {name:'happy-cat',className:'a49'},
    {name:'happy-cat',className:'a50'},
    {name:'happy-cat',className:'a51'},
    {name:'happy-cat',className:'a52'},
    {name:'happy-cat',className:'a53'},
    {name:'happy-cat',className:'a54'},
    {name:'happy-cat',className:'a55'},
    {name:'happy-cat',className:'a56'},
    {name:'happy-cat',className:'a57'},
    {name:'happy-cat',className:'a58'},
    {name:'happy-cat',className:'a59'},
    {name:'happy-cat',className:'a60'},
    {name:'happy-cat',className:'a61'},
    {name:'happy-cat',className:'a62'},
    {name:'happy-cat',className:'a63'},
    {name:'happy-cat',className:'a64'},
    {name:'happy-cat',className:'a65'},
    {name:'happy-cat',className:'a66'},
    {name:'happy-cat',className:'a67'},
    {name:'happy-cat',className:'a68'},
    {name:'happy-cat',className:'a69'},
    {name:'happy-cat',className:'a70'},
    {name:'happy-cat',className:'a71'},
    {name:'happy-cat',className:'a72'},
    

  ]

  food:any=[
    {name:'',className:''},

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
