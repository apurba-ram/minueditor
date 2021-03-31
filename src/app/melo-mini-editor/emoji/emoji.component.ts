import { Component, OnInit,Input, Output ,EventEmitter,HostListener} from '@angular/core';
import { spawn } from 'child_process';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.less']
})
export class EmojiComponent implements OnInit {
  // @HostListener('window:scroll', ['$event']) onWindowScroll())
  @Output() emojiPosInMenu: EventEmitter<any> = new EventEmitter();
  searchEmoji=''
  emojiPos:object={}
  recentEmoji:boolean=false
  recentlyUsed:boolean=false
  peopleEmoji:boolean=true
  animalEmoji:boolean=false
  foodEmoji:boolean=false
  travelEmoji:boolean=false
  acitiviyEmoji:boolean=false
  objectEmoji:boolean=false
  symbolEmoji:boolean=false
  flagEmoji:boolean=false
  recentEmojiPos:Array<object>=[]
  ppl:any=[
    {name:'police',className:'p1',type:'face' },
    {name:'grining-face',className:'p2',type:'face' },
    {name:'happy-face',className:'p3',type:'face' },
    {name:'sneezing-face',className:'p4' ,type:'face'},
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
    {name:'pray',className:'pray' ,type:'hand'},
    {name:'point-up',className:'p89' ,type:'hand'},
    {name:'i-love-you-hand',className:'p90' ,type:'hand'},
    {name:'raised-hand',className:'p91' ,type:'hand'},
    {name:'spock-hand',className:'p92' ,type:'hand'},
    {name:'reversed-hand-with-middle-finger',className:'p93' ,type:'hand'},
    {name:'call-me-hand',className:'p94' ,type:'hand'},
    {name:'eyes',className:'p95' ,type:''},
    {name:'',className:'p96' ,type:''},
    {name:'',className:'p97' ,type:''},
    {name:'',className:'p98' ,type:''},
    {name:'',className:'p99' ,type:''},
    {name:'',className:'p100' ,type:''},
    {name:'',className:'p101' ,type:''},
    {name:'',className:'p102' ,type:''},
    {name:'',className:'p103' ,type:''},
    {name:'',className:'p104' ,type:''},
    // {name:'',className:'p105' ,type:''},
    {name:'',className:'p106' ,type:''},
    {name:'',className:'p107' ,type:''},
    {name:'',className:'p108' ,type:''},
    {name:'',className:'p109' ,type:''},
    {name:'',className:'p110' ,type:''},
    {name:'',className:'p111' ,type:''},
    {name:'',className:'p112' ,type:''},
    {name:'',className:'p113' ,type:''},
    {name:'',className:'p114' ,type:''},
    {name:'',className:'p115' ,type:''},
    {name:'',className:'p116' ,type:''},
    {name:'',className:'p117' ,type:''},
    {name:'',className:'p118' ,type:''},
    {name:'',className:'p119' ,type:''},
    {name:'',className:'p120' ,type:''},
    {name:'',className:'p121' ,type:''},
    {name:'',className:'p122' ,type:''},
    {name:'',className:'p123' ,type:''},
    {name:'',className:'p124' ,type:''},
    {name:'',className:'p125' ,type:''},
    {name:'',className:'p126' ,type:''},
    {name:'',className:'p127' ,type:''},
    {name:'',className:'p128' ,type:''},
    {name:'',className:'p129' ,type:''},
    {name:'',className:'p130' ,type:''},
    {name:'',className:'p131' ,type:''},
    {name:'',className:'p132' ,type:''},
    {name:'',className:'p133' ,type:''},
    {name:'',className:'p134' ,type:''},
    {name:'',className:'p135' ,type:''},
    {name:'',className:'p136' ,type:''},
    {name:'',className:'p137' ,type:''},
    {name:'',className:'p138' ,type:''},
    {name:'',className:'p139' ,type:''},
    {name:'',className:'p140' ,type:''},
    {name:'',className:'p141' ,type:''},
    {name:'',className:'p142' ,type:''},
    {name:'',className:'p143' ,type:''},
    {name:'',className:'p144' ,type:''},
    {name:'',className:'p145' ,type:''},
    {name:'',className:'p161' ,type:''},
    {name:'',className:'p162' ,type:''},
    {name:'',className:'p163' ,type:''},
    {name:'',className:'p164' ,type:''},
    {name:'',className:'p146' ,type:''},
    {name:'',className:'p147' ,type:''},
    {name:'',className:'p148' ,type:''},
    {name:'',className:'p149' ,type:''},
    {name:'',className:'p150' ,type:''},
    {name:'',className:'p151' ,type:''},
    {name:'',className:'p152' ,type:''},
    {name:'',className:'p153' ,type:''},
    {name:'',className:'p154' ,type:''},
    {name:'',className:'p155' ,type:''},
    {name:'',className:'p156' ,type:''},
    {name:'',className:'p157' ,type:''},
    {name:'',className:'p158' ,type:''},
    {name:'',className:'p159' ,type:''},
    {name:'',className:'p160' ,type:''},



  ]

  animals:any=[
    {name:'rabbit',className:'a1',type:'animal'},
    {name:'',className:'a2',type:'animal'},
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
    {name:'fish',className:'a25',type:'face'},
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
    {name:'penguin',className:'a44',type:'face'},
    {name:'fish',className:'a45',type:'animal'},
    {name:'hatched-chick',className:'a46',type:'animal'},
    {name:'baby-chick',className:'a47',type:'animal'},
    {name:'chicken',className:'a48',type:'animal'},
    {name:'',className:'a49',type:'animal'},
    {name:'',className:'a50',type:'animal'},
    {name:'',className:'a51',type:'animal'},
    {name:'',className:'a52',type:'animal'},
    {name:'',className:'a53',type:'animal'},
    {name:'',className:'a54',type:'animal'},
    {name:'',className:'a55',type:'animal'},
    {name:'',className:'a56',type:'animal'},
    {name:'',className:'a57',type:'animal'},
    {name:'',className:'a58',type:'animal'},
    {name:'',className:'a59',type:'animal'},
    {name:'',className:'a60',type:'animal'},
    {name:'',className:'a61',type:'animal'},
    {name:'',className:'a62',type:'animal'},
    {name:'',className:'a63',type:'animal'},
    {name:'',className:'a64',type:'animal'},
    

    // className does not effect code here ,any name can be given to class only background possition matters
    //TREES
    // {name:'blossom ',className:'w2',type:'flower'},//todo need to add more images  to sprite
    {name:'blossom ',className:'w2',type:'flower'},
    {name:'sun-flower',className:'w3',type:'flower'},
    {name:'hibiscus',className:'w4',type:'flower'},
    {name:'rose',className:'w5',type:'flower'},
    {name:'cherry-blossom',className:'w6',type:'flower'},
    {name:'lotus',className:'w7',type:'flower'},
    {name:'cactus',className:'w8',type:'flower'},
    {name:'coconut-tree',className:'w9',type:'tree'},
    {name:'deciduous',className:'w10',type:'tree'},
    {name:'christmas',className:'w11',type:'tree'},
    {name:'seedling',className:'w12',type:'tree'},  
    {name:'tanabata',className:'w13',type:'tree'},  
    {name:'',className:'w14',type:'tree'},  
    // {name:'',className:'w15',type:'tree'},  
    {name:'',className:'w16',type:'tree'},  
    {name:'',className:'w17',type:'tree'},  
    {name:'',className:'w18',type:'tree'},  
    {name:'ear-of-rice',className:'w19',type:'food'},
    // {name:'',className:'w19',type:'tree'},    
  ]

  food:any=[
    {name:'corn',className:'f1',type:'food vegitables'},
    {name:'cucumber',className:'f2',type:'food vegitables'},
    {name:'carrot',className:'f3',type:'food'},
    {name:'potato',className:'f4',type:'food'},
    {name:'mashroom',className:'f9',type:'food'},
    // {name:'peanut',className:'f72',type:'food'},
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
    {name:'salad',className:'f5',type:'food'},
    {name:'gravy',className:'f6',type:'food'},
    {name:'sandwich',className:'f7',type:'food'},
    {name:'egg',className:'f8',type:'food'},
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
    {name:'icecream',className:'f52',type:'food'},
    {name:'softy',className:'f53',type:'food'},
    {name:'icecream',className:'f54',type:'food'},
    {name:'donuts',className:'f55',type:'food'},
    {name:'cookie',className:'f56',type:'food'},
    {name:'chocolate',className:'f57',type:'food'},
    {name:'candy',className:'f58',type:'food'},
    {name:'lolypop',className:'f59',type:'food'},
    {name:'tea',className:'f60',type:'food'},
    {name:'',className:'f61',type:'food'},
    {name:'pastry',className:'f62',type:'food cake'},
    {name:'pan ',className:'f63',type:'food pan '},
    {name:'omlet ',className:'f64',type:'food pan'},
    {name:'fork-and-knife',className:'f65',type:'food cutlary'},
    {name:'soup',className:'f66',type:'food drink'},
    {name:'milk',className:'f67',type:' drink'},
    {name:'wine',className:'f68',type:'drink'},
    {name:'juice',className:'f70',type:'drink'},
    {name:'beer',className:'f71',type:'drink'},

  ]

  travel:any=[
    {name:'taxi',className:'t1',type:'travel,transport'},
    {name:'oncoming-taxi',className:'t2',type:'travel,transport'},
    {name:'pickup-truck',className:'t3',type:'travel,transport'},
    {name:'oncomin-blue-car',className:'t4',type:'travel,transport'},
    {name:'blue-car',className:'t5',type:'travel,transport'},
    {name:'fire-engine',className:'t6',type:'travel,transport'},
    {name:'',className:'t7',type:'travel,transport'},
    {name:'jeep',className:'t8',type:'travel,transport'},
    {name:'monorail',className:'t9',type:'travel,transport'},
    {name:'tram',className:'t10',type:'travel,transport,train rail'},
    {name:'suspension-railway',className:'t14',type:'travel,transport,train rail'},
    {name:'mountain-train',className:'t15',type:'travel,transport rail train'},
    {name:'cable-train',className:'t16',type:'travel,transport rail train'},
    {name:'ship',className:'t17',type:'travel,transport ship boat'},
    {name:'man-boating',className:'t18',type:'travel,transport '},
    {name:'woman-boating',className:'t19',type:'travel,transport'},
    {name:'traffic-light',className:'t20',type:' '},
    {name:'vertical-trafic-light',className:'t21',type:''},
    {name:'construction',className:'t22',type:''},
    {name:'ambulance',className:'t23',type:'travel'},
    {name:'red-flag',className:'t24',type:'travel,transport'},
    {name:'door ',className:'t25',type:' gate'},
    {name:'restriction',className:'t26',type:'restriction'},
    {name:'',className:'t27',type:''},
    {name:'',className:'t28',type:'restriction'},
    {name:'',className:'t29',type:'restriction'},
    {name:'bike',className:'t30',type:'travel,transport '},
    {name:'restriction-bike',className:'t31',type:'restriction'},
    {name:'cycle',className:'t32',type:'travel,transport '},
    {name:'truck',className:'t33',type:'travel,transport'},
    {name:'oncoming-automobile',className:'t34',type:'travel,transport'},
    {name:'going-automobile',className:'t35',type:'travel,transport'},
    {name:'',className:'t36',type:'travel,transport'},
    {name:'ambulance',className:'t37',type:'travel,transport'},
    {name:'bus',className:'t38',type:'travel,transport'},
    {name:'',className:'t39',type:'travel,transport'},
    {name:'ongoing-bus',className:'t40',type:'travel,transport'},
    {name:'',className:'t41',type:'travel,transport'},
    {name:'',className:'t42',type:'travel,transport'},
    {name:'',className:'t42',type:'travel,transport'},
    {name:'',className:'t43',type:'travel,transport'},
    {name:'',className:'t44',type:'travel,transport'},
    {name:'',className:'t45',type:'travel,transport'},
    {name:'',className:'t46',type:'travel,transport'},
    {name:'',className:'t47',type:'travel,transport'},
    {name:'',className:'t48',type:'travel,transport'},
    {name:'helicopter',className:'t49',type:'travel,transport'},
    {name:'aeroplane',className:'t50',type:'travel,transport'},
    {name:'waxing-gibbous-moon-left-dark',className:'t51',type:'star,moon'},
    {name:'full-moon',className:'t52',type:' star,moon'},
    {name:'waxing-gibbous-moon-right-dark',className:'t53',type:'star,moon'},
    {name:'quarter-moon',className:'t54',type:'star,moon'},
    {name:'waxing-crescent-moon',className:'t55',type:'star,moon'},
    {name:'half-moon',className:'t56',type:'star,moon'},
    {name:'new-moon-with-face',className:'t57',type:'star,moon'},
    {name:'half-moon-with-face',className:'t58',type:'star,moon'},
    {name:'full-moon-with-face',className:'t60',type:'star,moon'},
    {name:'sun',className:'t61',type:'star'},
    {name:'star',className:'t62',type:'star'},
    {name:'broken-star',className:'t63',type:'star'},
    {name:'thermometer',className:'t64',type:'medical'},
    {name:'sun-behind-cloud',className:'t65',type:'cloud'},
    {name:'partial-sunny',className:'t66',type:'cloud'},
    {name:'sun-behind-rain-cloud',className:'t67',type:'cloud'},
    {name:'rain-cloud',className:'t68',type:'cloud'},

  ]

  activity:any=[
    //activity
    {name:'man-biking',className:'v1',type:' cycle'},
    {name:'mountain-biking',className:'v2',type:'cycle'},
    {name:'walk',className:'v3',type:'walk'},
    {name:'shower',className:'v4',type:'bath'},
    {name:'bath',className:'v5',type:'bath shower'},
    {name:'cartwheeling',className:'v6',type:'gymnasitc'},
    {name:'',className:'v7',type:''},
    {name:'boxing',className:'v8',type:'sports  games'},
    {name:'',className:'v9',type:''},
    {name:'basket-ball',className:'v10',type:'games sports'},
    {name:'horse-riding',className:'v11',type:'sports '},
    {name:'swimming',className:'v12',type:'sports'},
    {name:'biking',className:'v13',type:'sports games'},
    {name:'',className:'v14',type:'sports games'},
    {name:'running',className:'v15',type:'sports games'},
    {name:'',className:'v16',type:'sports games'},
    {name:'medal',className:'v17',type:'sports'},
    {name:'trophy',className:'v18',type:'sports '},
    // sports
    {name:'bedminton',className:'s1',type:'coack shuttle racket sports games'},
    {name:'skating-shoes',className:'s2',type:'activity'},
    {name:'basketball',className:'s3',type:'sports games'},
    // {name:'',className:'s4',type:''},
    {name:'table-tennin',className:'s5',type:'indoor games '},
    {name:'hocky-stick',className:'s6',type:'sports games '},
    {name:'golf',className:'s7',type:'sports games'},
    // {name:'',className:'s8',type:''},
    {name:'cricket',className:'s9',type:'sports games ball bat'},
    {name:'football',className:'s10',type:'sports games'},
    {name:'ball',className:'s11',type:'sports games'},
    // {name:'',className:'s12',type:''},
    // {name:'',className:'s13',type:''},
]

objects:any=[
  {name:'crown',className:'o1',type:''},
  {name:'',className:'o2',type:''},
  {name:'specs',className:'o3',type:''},
  {name:'necktie',className:'o4',type:'dress clothe'},
  {name:'shirt',className:'o5',type:' clothe'},
  {name:'jeans',className:'o6',type:' clothe'},
  {name:'frock',className:'o7',type:' clothe'},
  {name:'night-dress',className:'o8',type:' clothe'},
  {name:'bikini',className:'o9',type:' clothe'},
  {name:'tshirt',className:'o10',type:'clothe'},
  {name:'purse',className:'o11',type:''},
  {name:'hand-bag',className:'o12',type:''},
  {name:'hand-clutch',className:'o13',type:''},
  {name:'sandals',className:'o14',type:'footwear'},
  {name:'shoes',className:'o15',type:'footwear'},
  {name:'high-heel',className:'o16',type:'footwear'},
  {name:'slippers',className:'o17',type:'footwear'},
  {name:'boot',className:'o18',type:'footwear'},
  {name:'headphone',className:'o19',type:''},
  {name:'tophat',className:'o20',type:'footwear'},
  {name:'',className:'o22',type:''},
  {name:'clapper',className:'o23',type:'movie film'},
  {name:'dice',className:'o24',type:'game indoor'},
  {name:'musical_note',className:'o25',type:'music'},
  {name:'notes',className:'o26',type:'music'},
  {name:'saxophone',className:'o27',type:'music'},
  {name:'guitar',className:'o28',type:'music'},
  {name:'musical_keyboard',className:'o29',type:'music'},
  {name:'trumpet',className:'o30',type:'music'},
  {name:'violin',className:'o31',type:'music'},
  {name:'musical-score',className:'o32',type:'music'},
  {name:'inner-wear',className:'o33',type:'cloth'},
  {name:'movie-camera',className:'o34',type:''},
  {name:'mic',className:'o35',type:''},
  {name:'fishing_pole_and_fish',className:'o36',type:''},
  {name:'slide',className:'o37',type:''},
  {name:'merry-go-round',className:'o38',type:''},
  {name:'',className:'o39',type:''},
  {name:'money',className:'o40',type:'movie'},
  {name:'film-frames',className:'o41',type:''},
  {name:'compass',className:'o42',type:''},
  {name:'volume-scale',className:'o43',type:''},
  {name:'studio-microphone',className:'o44',type:''},
  {name:'ribbon',className:'o45',type:''},
  {name:'medal',className:'o46',type:''},
  {name:'mortal-board',className:'o47',type:''},
  {name:'bag',className:'o48',type:''},
  {name:'home',className:'o49',type:'night'},
  {name:'bell',className:'o50',type:''},
  {name:'fish',className:'o51',type:''},
  {name:'mosque',className:'o52',type:''},
]

symbols:any=[
  {name:'zero',className:'m1',type:'counting'},
  {name:'one',className:'m2',type:'counting'},
  {name:'two',className:'m3',type:'counting'},
  {name:'three',className:'m4',type:'counting'},
  {name:'four',className:'m5',type:'counting'},
  {name:'five',className:'m6',type:'counting'},
  {name:'six',className:'m7',type:'counting'},
  {name:'seven',className:'m8',type:'counting'},
  {name:'eight',className:'m9',type:'counting'},
  {name:'nine',className:'m10',type:'counting'},
  {name:'star',className:'m11',type:'counting'},
  {name:'hash',className:'m12',type:''},
  {name:'ok',className:'m13',type:''},
  {name:'sos',className:'m14',type:''},
  {name:'up',className:'m15',type:'save_our_soul'},
  {name:'arrow-up',className:'m16',type:''},
  {name:'arrow-down',className:'m17',type:''},
  {name:'arrow-left',className:'m18',type:''},
  {name:'arrow-right',className:'m19',type:''},
  {name:'back',className:'m20',type:''},
  {name:'end',className:'m21',type:''},
  {name:'on',className:'m22',type:''},
  {name:'soon',className:'m23',type:''},
  {name:'top',className:'m24',type:''},
  {name:'underage',className:'m25',type:''},
  {name:'ten',className:'m26',type:'counting'},
  {name:'capital-abcd',className:'m27',type:'alphabets'},
  {name:'abcd',className:'m28',type:'alphabets'},
  {name:'1234',className:'m29',type:'counting'},
  {name:'symbol',className:'m30',type:'abc'},
  {name:'abc',className:'m31',type:'o'},
  {name:'O',className:'m32',type:''},
  {name:'P',className:'m33',type:''},
  {name:'ab',className:'m34',type:''},
  {name:'cl',className:'m35',type:''},
  {name:'cool',className:'m36',type:''},
  {name:'free',className:'m37',type:''},
  // {name:'',className:'m38',type:''},
  {name:'no-pedestrian',className:'m39',type:''},
  {name:'children-crossing',className:'m40',type:''},
  {name:'men',className:'m41',type:''},
  {name:'women',className:'m42',type:''},
  {name:'bangbang',className:'m43',type:''},
  {name:'interobang',className:'m44',type:''},
  {name:'trademark',className:'m45',type:''},
  {name:'exclamation',className:'m46',type:''},
  {name:'left-right-arrow',className:'m47',type:''},
  {name:'top-down-arrow',className:'m48',type:''},
  {name:'north-east-arrow',className:'m49',type:''},
  {name:'north-west-arrow',className:'m50',type:''},
  {name:'south-west-arrow',className:'m51',type:''},
  {name:'south-east-arrow',className:'m52',type:''},
  {name:'left-arrow-with-hooks',className:'m53',type:''},
  {name:'right-arrow-with-hooks',className:'m54',type:''},
  {name:'eject',className:'m55',type:''},
  {name:'double-right-arrow',className:'m56',type:''},
  {name:'double-left-arrow',className:'m57',type:''},
  {name:'double-up-arrow',className:'m58',type:''},
  {name:'double-down-arrow',className:'m59',type:''},
  {name:'fast-forward',className:'m60',type:''},
  {name:'fast-backkward',className:'m61',type:''},
  {name:'double-vertical-bar',className:'m62',type:'pause'},
  {name:'sqaure-for-stop',className:'m63',type:'stop'},
  {name:'circle-for-record',className:'m64',type:''},
  // {name:'',className:'m65',type:''},
  // {name:'',className:'m66',type:''},
  // {name:'',className:'m67',type:''},
  {name:'put-litter-in-its-place',className:'m68',type:'dustbin'},
  {name:'do-not-litter',className:'m69',type:''},
  {name:'portable-water',className:'m70',type:''},
  {name:'non-portable-water',className:'m71',type:''},
  // {name:'',className:'m72',type:''},
  {name:'no-bicycles',className:'m73',type:''},

]


flag:any=[
  {name:'',className:'c1',type:''},
  {name:'',className:'c2',type:''},
  {name:'',className:'c3',type:''},
  {name:'',className:'c4',type:''},
  {name:'',className:'c5',type:''},
  {name:'',className:'c6',type:''},
  {name:'',className:'c7',type:''},
  {name:'',className:'c8',type:''},
  {name:'',className:'c9',type:''},
  {name:'',className:'c10',type:''},
  {name:'',className:'c11',type:''},
  {name:'',className:'c12',type:''},
  {name:'',className:'c13',type:''},
  {name:'',className:'c14',type:''},
  {name:'',className:'c15',type:''},
  {name:'',className:'c16',type:''},
  {name:'',className:'c17',type:''},
  {name:'',className:'c18',type:''},
  {name:'',className:'c19',type:''},
  {name:'',className:'c20',type:''},
  {name:'',className:'c21',type:''},
  {name:'',className:'c22',type:''},
  {name:'',className:'c23',type:''},
  {name:'',className:'c24',type:''},
  {name:'',className:'c25',type:''},
  {name:'',className:'c26',type:''},
  {name:'',className:'c27',type:''},
  {name:'',className:'c28',type:''},
  {name:'',className:'c29',type:''},
  {name:'',className:'c30',type:''},
  {name:'',className:'c31',type:''},
  {name:'',className:'c32',type:''},
  {name:'',className:'c33',type:''},
  {name:'',className:'c34',type:''},
  {name:'',className:'c35',type:''},
  {name:'',className:'c36',type:''},
  {name:'',className:'c37',type:''},
  {name:'',className:'c38',type:''},
  {name:'',className:'c39',type:''},
  {name:'',className:'c40',type:''},
  {name:'',className:'c41',type:''},
  {name:'',className:'c42',type:''},
  {name:'',className:'c43',type:''},
  {name:'',className:'c44',type:''},
  {name:'',className:'c45',type:''},
  {name:'',className:'c46',type:''},
  {name:'',className:'c47',type:''},
  {name:'',className:'c48',type:''},
  {name:'',className:'c49',type:''},
  {name:'',className:'c50',type:''},
  {name:'',className:'c51',type:''},
  {name:'',className:'c52',type:''},
  {name:'',className:'c53',type:''},
  {name:'',className:'c54',type:''},
  {name:'',className:'c55',type:''},
  {name:'',className:'c56',type:''},
  {name:'',className:'c57',type:''},
  {name:'',className:'c58',type:''},
  {name:'',className:'c59',type:''},
  {name:'',className:'c60',type:''},
  {name:'',className:'c61',type:''},
  {name:'',className:'c62',type:''},
  {name:'',className:'c63',type:''},
  {name:'',className:'c64',type:''},
  {name:'',className:'c65',type:''},
  {name:'',className:'c66',type:''},
  {name:'',className:'c67',type:''},
  {name:'',className:'c68',type:''},
  {name:'',className:'c69',type:''},
  {name:'',className:'c70',type:''},
  {name:'',className:'c71',type:''},
  {name:'',className:'c72',type:''},
  {name:'',className:'c73',type:''},
  {name:'',className:'c74',type:''},
  {name:'',className:'c75',type:''},
  {name:'',className:'c76',type:''},
  {name:'',className:'c77',type:''},
  {name:'',className:'c78',type:''},
  {name:'',className:'c79',type:''},
  {name:'',className:'c80',type:''},
  {name:'',className:'c81',type:''},
  {name:'',className:'c82',type:''},
  {name:'',className:'c83',type:''},
  {name:'',className:'c84',type:''},
  {name:'',className:'c85',type:''},
  {name:'',className:'c86',type:''},
  {name:'',className:'c87',type:''},
  {name:'',className:'c88',type:''},
  {name:'',className:'c89',type:''},
  {name:'',className:'c90',type:''},
  {name:'',className:'c92',type:''},
  {name:'',className:'c92',type:''},
  {name:'',className:'c93',type:''},
  {name:'',className:'c94',type:''},
  {name:'',className:'c95',type:''},
  {name:'',className:'c96',type:''},
  {name:'',className:'c97',type:''},
  {name:'',className:'c98',type:''},
  {name:'',className:'c99',type:''},
  {name:'',className:'c100',type:''},
  {name:'',className:'c101',type:''},
  {name:'',className:'c102',type:''},
  {name:'',className:'c103',type:''},
  {name:'',className:'c104',type:''},
  {name:'',className:'c105',type:''},
  {name:'',className:'c106',type:''},
  {name:'',className:'c107',type:''},
  {name:'',className:'c108',type:''},
  {name:'',className:'c109',type:''},
  {name:'',className:'c110',type:''},
  {name:'',className:'c111',type:''},
  {name:'',className:'c112',type:''},
  {name:'',className:'c113',type:''},
  {name:'',className:'c114',type:''},
  {name:'',className:'c115',type:''},
  {name:'',className:'c116',type:''},
  {name:'',className:'c117',type:''},
  {name:'',className:'c118',type:''},
  {name:'',className:'c119',type:''},
  {name:'',className:'c120',type:''},
  {name:'',className:'c121',type:''},
  {name:'',className:'c122',type:''},
  {name:'',className:'c123',type:''},
  {name:'',className:'c124',type:''},
  {name:'',className:'c125',type:''},
  {name:'',className:'c126',type:''},
  {name:'',className:'c127',type:''},
  {name:'',className:'c128',type:''},
  {name:'',className:'c129',type:''},
  {name:'',className:'c130',type:''},
  {name:'',className:'c131',type:''},
  {name:'',className:'c132',type:''},
  {name:'',className:'c133',type:''},
  {name:'',className:'c134',type:''},
  {name:'',className:'c135',type:''},
  {name:'',className:'c136',type:''},
  {name:'',className:'c137',type:''},
  {name:'',className:'c138',type:''},
  {name:'',className:'c139',type:''},
  {name:'',className:'c140',type:''},
  {name:'',className:'c141',type:''},
  {name:'',className:'c142',type:''},
  {name:'',className:'c143',type:''},
  {name:'',className:'c144',type:''},
  {name:'',className:'c145',type:''},
  {name:'',className:'c146',type:''},
  {name:'',className:'c147',type:''},
  {name:'',className:'c148',type:''},
  {name:'',className:'c149',type:''},
  {name:'',className:'c150',type:''},
  {name:'',className:'c151',type:''},
  {name:'',className:'c152',type:''},
  {name:'',className:'c153',type:''},
  {name:'',className:'c154',type:''},
  {name:'',className:'c155',type:''},


]

  constructor() { }


  ngOnInit(): void {
   
    if(localStorage.getItem('marx_emoji'))
    {
      this.recentEmojiPos=JSON.parse(localStorage.getItem('marx_emoji'))
    }
    
  }

  scroll(e:any)
  {
        var section =document.getElementsByClassName("scroll-element");
        var bScroll = document.getElementById('emoji-area').scrollTop;
        var parentOffsetTop=document.getElementById('emoji-area').offsetTop;
        for (var i = 0; i < section.length; i++) {
          var a=section[i] as HTMLElement;
          var sHeight = a.offsetHeight ;
          var offsets = a.offsetTop-parentOffsetTop-41;
          if (bScroll > offsets && bScroll < offsets + sHeight) {
            document.getElementsByClassName('emoji-btn')[i].classList.add('active')
          } else {
            document.getElementsByClassName('emoji-btn')[i].classList.remove('active')
          }
        }
  }

  show_area(e:any)
  { 
    // (<HTMLInputElement>document.getElementById('search-emoji')).value=''
    this.recentEmoji=false
    this.animalEmoji=false
    this.peopleEmoji=false
    this.travelEmoji=false
    this.foodEmoji=false
    this.acitiviyEmoji=false
    this.objectEmoji=false
    this.symbolEmoji=false
    this.flagEmoji=false
    let el = document.getElementById(e);
    switch(e)
    {
       case 'recent':
         this.recentEmoji=true
         break;
       case 'ppl':
          this.peopleEmoji=true
          console.log("ppl")
        break;
      case 'animals':
        this.animalEmoji=true
        console.log("animal")
        break;
      case 'food':
        this.foodEmoji=true
        console.log("FOOD")
        break;
      case 'travel':
        this.travelEmoji=true
        break;
      case 'activity':
        this.acitiviyEmoji=true
        break;
      case 'objects':
        this.objectEmoji=true
        break;
      case 'symbols':
        this.symbolEmoji=true
        break;
      case 'flags':
        this.flagEmoji=true
        break;


    }
    el.scrollIntoView();

      // window.onscroll=function ()
      // {
      //   console.log("HY")
      // }
    

    // document.getElementById('emoji-area').scroll()

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