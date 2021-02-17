export interface EditorConfig {
    file?: boolean;
    mentionedNames?: MentionedName[];
    mentionedDates?: string[];
    colorPalette?: string[];
    buttonName?: string;
    fontColor?: boolean;
    highlightColor?: boolean;
    toolbarPlacement?: 'top' | 'bottom';
    placeholder?: string;
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
}

