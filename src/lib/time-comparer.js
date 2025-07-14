

function isBefore(time1, time2){

    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    if (hours1 < hours2 || (hours1 === hours2 && minutes1 < minutes2)) {
    return true
    } else if (hours1 > hours2 || (hours1 === hours2 && minutes1 > minutes2)) {
    return false
    } else {
    return true
    }
}

export { isBefore };
