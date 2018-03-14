export class parseDate {
    _date;
    constructor(date: Date) {
        this._date = new Date(date);
    }

    dateTimeTh() {
        return this.pad(this._date.getDate()) +
            '-' + this.pad(this._date.getMonth() + 1) +
            '-' + this.pad(this._date.getFullYear()) +
            'T00:00:00';
    }

    pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }
}