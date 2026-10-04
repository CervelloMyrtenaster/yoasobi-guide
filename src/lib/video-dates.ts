/** Extract only a single explicitly written date; never choose one day of a range. */
export function videoDate(title:string) {
 const match=title.match(/(20\d{2})[.\/-](\d{1,2})[.\/-](\d{1,2})(?!\d)(?![–—〜~\-])/);
 if(!match)return undefined;
 const value=`${match[1]}-${match[2].padStart(2,'0')}-${match[3].padStart(2,'0')}`;
 const date=new Date(value+'T00:00:00Z');
 return Number.isNaN(date.valueOf())||date.toISOString().slice(0,10)!==value?undefined:value;
}
