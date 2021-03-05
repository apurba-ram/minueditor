import { Component, OnInit,Input, Output ,EventEmitter} from '@angular/core';
import { spawn } from 'child_process';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.less']
})
export class EmojiComponent implements OnInit {
  @Output() emojiPosInMenu: EventEmitter<any> = new EventEmitter();
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
    {name:'police',className:'p9' },
    {name:'police',className:'p10' },
    {name:'police',className:'p11' },
    {name:'police',className:'p12' },
    {name:'police',className:'p13' },
    {name:'police',className:'p14' },
    {name:'police',className:'p15' },
    {name:'police',className:'p16' },
    {name:'police',className:'p17' },
    {name:'police',className:'p18' },
    {name:'police',className:'p19' },
    {name:'police',className:'p20' },
    {name:'police',className:'p21' },
    {name:'police',className:'p22' },
    {name:'police',className:'p23' },
    {name:'police',className:'p24' },
    {name:'police',className:'p25' },
    {name:'police',className:'p26' },
    {name:'police',className:'p27' },
    {name:'police',className:'p28' },
    {name:'police',className:'p29' },
    {name:'police',className:'p30' },
    {name:'police',className:'p31' },
    {name:'police',className:'p32' },
    {name:'police',className:'p33' },
    {name:'police',className:'p34' },
    {name:'police',className:'p35' },
    {name:'police',className:'p36' },
    {name:'police',className:'p37' },
    {name:'police',className:'p38' },
    {name:'police',className:'p39' },
    {name:'police',className:'p40' },
    {name:'police',className:'p41' },
    {name:'police',className:'p42' },
    {name:'police',className:'p43' },
    {name:'police',className:'p44' },
    {name:'police',className:'p45' },
    {name:'police',className:'p46' },
    {name:'police',className:'p47' },
    {name:'police',className:'p48' },
    {name:'police',className:'p49' },
    {name:'police',className:'p50' },
    {name:'police',className:'p51' },
    {name:'police',className:'p52' },
    {name:'police',className:'p53' },
    {name:'police',className:'p54' },
    {name:'police',className:'p55' },
    {name:'police',className:'p56' },
    {name:'police',className:'p57' },
    {name:'police',className:'p58' },
    {name:'police',className:'p59' },
    {name:'police',className:'p60' },
    {name:'police',className:'p62' },
    {name:'police',className:'p64' },
    {name:'police',className:'p65' },
    {name:'police',className:'p66' },
    {name:'police',className:'p67' },
    {name:'police',className:'p68' },
    {name:'police',className:'p69' },
    {name:'police',className:'p70' },
    {name:'police',className:'p71' },
    {name:'police',className:'p72' },
    {name:'police',className:'p73' },
    {name:'police',className:'p74' },
    {name:'police',className:'p75' },
    {name:'police',className:'p76' },
    {name:'police',className:'p77' },
    {name:'police',className:'p78' },
    {name:'police',className:'p79' },
    {name:'police',className:'p80' },
    {name:'police',className:'p81' },
    {name:'police',className:'p82' },
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

  constructor() { }


  ngOnInit(): void {

    
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
    console.log("CLASSSSSS",e.target.className)
    if(!this.recentEmojiPos.includes(e.target.className))
    {
      this.recentEmojiPos.push(e.target.className)
    }
      // if(this.checkEmojiExists(this.emojiPos)===false)
      // {
      //   this.recentEmojiPos.push(this.emojiPos)
      // }
    

    console.log("RECENT",this.recentEmojiPos)


  }
   
}
