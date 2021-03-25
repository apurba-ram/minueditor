export interface EditorConfig {
    file?: boolean;
    id?: string;
    mode?: 'basic' | 'prime';
    mentionedNames?: MentionedName[];
    mentionedDates?: string[];
    colorPalette?: boolean;
    toolbarPlacement?: 'top' | 'bottom';
    placeholder?: string;
    buttonName?: string;
    disabledButton?: boolean;
    isCollapsible?: boolean;
    link?: boolean;
    urlValue?:string;
    urlText?:string;
    urlTitle?:string;
    configFontStyle?: boolean;
    validUrlMessage?:string;
    urlInputPlaceHolder?:string;
    textInputPlaceHolder?:string;
    titlePlaceholder?:string;
    mentions?:MyMentions[];
    // option to disable encapsulated styles so global styles can be used instead
    disableStyle?:boolean;
}

export interface MentionedName {
    id: number;
    name: string;
}

export interface ToolbarConfig {
    bold?: boolean;
    italic?: boolean;
    strikeThrough?: boolean;
    underline?: boolean;
    orderedList?: boolean;
    unorderedList?: boolean;
    superscript?: boolean;
    subscript?: boolean;
    quote?: boolean;
    fontStyle?: string,
    fontColor: string;
    backgroundColor: string;
}

export interface MyMentionConfig {
    // nested config
    mentions?:MyMentions[];
    // option to disable encapsulated styles so global styles can be used instead
    disableStyle?:boolean;
}

export interface MyMentions {
    // an array of strings or objects to suggest
    items?:any[];
  
    // the character that will trigger the menu behavior
    triggerChar?:string;
  
    // option to specify the field in the objects to be used as the item label
    labelKey?:string;
  
    // option to limit the number of items shown in the pop-up menu
    maxItems?:number;
  
    // option to disable sorting
    disableSort?:boolean;
  
    // option to disable internal filtering. can be used to show the full list returned
    // from an async operation
    disableSearch?:boolean;
  
    // display menu above text instead of below
    dropUp?:boolean;
  
    // whether to allow space while mentioning or not
    allowSpace?:boolean;
  
    // option to include the trigger char in the searchTerm event
    returnTrigger?:boolean;
  
    // optional function to format the selected item before inserting the text
    mentionSelect?:(item:any, triggerChar?:string) => (string);
  
    // optional function to customize the search implementation
    // mentionFilter?:(searchString:string, items?:any) => (any[]);
  }
