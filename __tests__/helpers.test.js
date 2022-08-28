const {format_date} = require('../utils/helpers');
const {format_plural} = require('../utils/helpers');

test('format_date returns a date string', () => {
    const date = new Date('2022-05-12 02:30:00');

    expect(format_date(date)).toBe('5/12/2022');
});

test('format_plural returns a pluralized word', () => {
    const plural = format_plural('Phone', 2);
    const single = format_plural('Watch', 1);

    expect(plural).toBe('Phones');
    expect(single).toBe('Watch');
});