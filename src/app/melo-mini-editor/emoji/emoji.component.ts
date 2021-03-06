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
    {name:'',className:'p62' ,type:'face'},
    {name:'',className:'p63' ,type:'face'},
    {name:'',className:'p64' ,type:'face'},
    {name:'',className:'p65' ,type:'face'},
    {name:'',className:'p66' ,type:'face'},
    {name:'',className:'p67' ,type:'face'},
    {name:'',className:'p68' ,type:'face'},
    {name:'',className:'p69' ,type:'face'},
    {name:'',className:'p70' ,type:'face'},
    {name:'',className:'p71' ,type:'face'},
    {name:'',className:'p72' ,type:'face'},
    {name:'',className:'p73' ,type:'face'},
    {name:'',className:'p74' ,type:'face'},
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
    {name:'',className:'p89' ,type:'hand'},
    {name:'',className:'p90' ,type:'hand'},
    {name:'',className:'p91' ,type:'hand'},
    {name:'',className:'p92' ,type:'hand'},
    {name:'',className:'p93' ,type:'hand'},
    {name:'',className:'p94' ,type:'hand'},




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
