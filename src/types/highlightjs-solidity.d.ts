declare module 'highlightjs-solidity' {
  export const definer: () => {
      keywords: {
        keyword: string[];
        built_in: string[];
        literal: string[];
        operator: string[];
      };
      contains: ({
        className: string;
        begin: string;
        end?: string;
        contains?: { [name: string]: string };
      } | {
        className: string;
        begin: RegExp;
        end?: string;
        contains?: { [name: string]: string };
      })[];
    };
  
  }
