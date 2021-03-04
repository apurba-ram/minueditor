import { Component, OnInit,Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.less']
})
export class EmojiComponent implements OnInit {
  recentlyUsed:boolean=false
  peopleEmoji:boolean=true
  animalEmoji:boolean=false
  foodEmoji:boolean=false
  ppl:any=[
    {name:'police',className:'p1' },
    {name:'police',className:'p2' },
    {name:'police',className:'p3' },
    {name:'police',className:'p4' },
    {name:'police',className:'p5' },
    {name:'police',className:'p6' },
    {name:'police',className:'p7' },
    {name:'police',className:'p8' },
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
  
  constructor() { }


  ngOnInit(): void {

    
  }
  //scroll to particular category emojies
  
  show_area(e:any)
  {
    let el = document.getElementById(e);
    el.scrollIntoView();

  }
   
}
