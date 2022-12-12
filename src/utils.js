export function toCapitalLetter(str) {
    return str[0].toUpperCase() + str.slice(1)
}

export function toBackendFormat(date) {
    const date_to_format = new Date(date).toLocaleDateString('es') + ' 00:00:00'
    return date_to_format.replace(/[\/]/g, '-')
}