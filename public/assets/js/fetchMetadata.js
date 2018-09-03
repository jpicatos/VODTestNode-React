function fetchTitle(title) {
    var miniTitle = title;
    if (title.length > 16) {
        miniTitle = title.substring(0, 16) + '...';
    }
    return miniTitle;
}
function fetchDate(date) {
    var myDate = new Date(date);
    return myDate.toDateString();
}
function fetchLanguaje(lang) {
    var finalLang='Not defined';
    switch (lang) {
        case 'en':
            finalLang = 'English';
            break;
        case 'es':
            finalLang = 'Spanish';
            break;
        case 'fr':
            finalLang = 'French';
            break;
    
        default:
            break;
    }
    return finalLang;
}
function fetchType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}