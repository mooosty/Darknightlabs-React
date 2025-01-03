export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

export const formatDateTime = (isoString) => {
    const today = new Date();

    if (isEqualDate(isoString, today.toISOString())) {
        return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (isEqualDate(isoString, yesterday.toISOString())) {
        return 'Yesterday';
    }

    const date = new Date(isoString);

    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).replace(',', '');
}

export const isEqualDate = (isoString1, isoString2) => {
    const date1 = new Date(isoString1);
    const date2 = new Date(isoString2);

    const year1 = date1.getUTCFullYear();
    const month1 = date1.getUTCMonth();
    const day1 = date1.getUTCDate();

    const year2 = date2.getUTCFullYear();
    const month2 = date2.getUTCMonth();
    const day2 = date2.getUTCDate();

    return year1 === year2 && month1 === month2 && day1 === day2;
}

export const dayWiseFormat = (isoString) => {
    const date = new Date(isoString);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${period}`;
    const today = new Date();
    return isEqualDate(isoString, today.toISOString()) ? `${formattedTime}` : `${dayOfWeek} ${formattedTime}`;
}
