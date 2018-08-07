var func = {
    fetchTitle: function(title) {
        var miniTitle = title;
        if (title.length > 16) {
            miniTitle = title.substring(0, 16) + '...';
        }
        return miniTitle;
    },
    fetchDate: function(date) {
        var myDate = new Date(date);
        return myDate.toDateString();
    },
    fetchLanguaje: function(lang) {
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
    },
    fetchType: function(type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
};
module.exports = func;