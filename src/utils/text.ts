export function truncate(text:string, max:number) {
	
    return text.length > max ? `${text.substring(0, max)}...` : text;
}