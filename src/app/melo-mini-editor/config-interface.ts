export default interface EditorConfig {
    file: boolean;
    mentionedNames: MentionedName[];
    mentionedDates: string[];
    colorPalette: string[];
    buttonName: string;
    fontColor: boolean;
    highlightColor: boolean;
}

interface MentionedName {
    id: string;
    name: string;
}

