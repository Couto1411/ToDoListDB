export function limit(element,tamanho)
{
    let max_chars
    tamanho?max_chars = tamanho:max_chars=250;
        
    if(element.target.value.length > max_chars) {
        element.target.value = element.target.value.substr(0, max_chars);
    }
}