export interface EditorConfig {
    file?: boolean;
    id?: string;
    mentionedNames?: MentionedName[];
    mentionedDates?: string[];
    colorPalette?: boolean;
    buttonName?: string;
    toolbarPlacement?: 'top' | 'bottom';
    placeholder?: string;
    mode?: 'basic' | 'prime'
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

