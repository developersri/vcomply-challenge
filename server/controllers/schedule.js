let { findMany, create } = require('../lib/db/crud');

let holidays, weeklyoffs;

const checkForWeekoffAndHolidays = async (date) => {
    let dateCopy = new Date(date);
    // let weeklyoffs = [0, 6];
    // let holidays = [new Date('2021-03-29')];

    let day = dateCopy.getDay();
    if (weeklyoffs.indexOf(day) >= 0) {
        let daysOfWeek = [0,1,2,3,4,5,6];
        let eligibleDays = daysOfWeek.filter(d => weeklyoffs.indexOf(d) < 0);
        let nextEligibleDay = eligibleDays.find(d => d > day) || eligibleDays[0];
        if (!nextEligibleDay) {
            throw new Error('Invalid weekly offs: Could not postpone the schedule!');
        }
        let daysOffset = nextEligibleDay - day;
        if (nextEligibleDay < day) {
            daysOffset = (7 - day) + nextEligibleDay;
        }
        dateCopy.setDate(date.getDate() + daysOffset);
    }

    let matchedHoliday = holidays.find((holiday) => {
        return (
            holiday.getFullYear() === dateCopy.getFullYear() &&
            holiday.getMonth() === dateCopy.getMonth() &&
            holiday.getDate() === dateCopy.getDate()
        );
    });
    if (matchedHoliday) {
        dateCopy.setDate(date.getDate() + 1);
    }

    if (dateCopy.getTime() !== date.getTime()) {
        date = await checkForWeekoffAndHolidays(dateCopy);
    }
    return date;
}

const createSchedule = async (req, res) => {
    // console.log(req.body);

    let { frequency = 'onetime', repeat = {}, lifecycle = {} } = req.body || {};
    let { every = 1, at = '00:00', date = 1, day = 0, month = 0 } = repeat;
    let { start = new Date(), end = {} } = lifecycle || {};
    let { by: endAt, after: endAfter } = end;

    start = new Date(start);

    endAt = endAt && new Date(endAt);
    if (endAt == null && endAfter == null) {
        endAfter = 100;
    }

    let startDate;
    at = at.split(':').map(t => +t);

    if (frequency === 'yearly') {
        let startYear = start.getFullYear();
        startDate = new Date(startYear, month, date, at[0], at[1]);
        if (startDate < start) {
            startDate.setFullYear(startYear + 1);
        }
    }
    else if (frequency === 'monthly') {
        let startYear = start.getFullYear();
        let startMonth = start.getMonth();
        startDate = new Date(startYear, startMonth, date, at[0], at[1]);
        if (startDate < start) {
            startDate.setMonth(startMonth + 1);
        }
    }
    else if (frequency === 'weekly') {
        let startYear = start.getFullYear();
        let startMonth = start.getMonth();
        let _startDate = start.getDate();
        let dateOffset = day - start.getDay();
        dateOffset = dateOffset < 0 ? dateOffset + 7 : dateOffset;
        startDate = new Date(startYear, startMonth, _startDate + dateOffset, at[0], at[1]);
        if (startDate < start) {
            startDate.setDate(startDate.getDate() + 7);
        }
    }
    else if (frequency === 'daily') {
        let startYear = start.getFullYear();
        let startMonth = start.getMonth();
        let _startDate = start.getDate();
        startDate = new Date(startYear, startMonth, _startDate, at[0], at[1]);
        if (startDate < start) {
            startDate.setDate(startDate.getDate() + 1);
        }
    }
    else if (frequency === 'onetime') {
        let startYear = start.getFullYear();
        let startMonth = start.getMonth();
        let _startDate = start.getDate();
        startDate = new Date(startYear, startMonth, _startDate, at[0], at[1]);
    }
    // console.log(startDate.toLocaleString());

    let shouldEnd = false;
    let result = [];

    if (endAt == null || endAt >= startDate) {
        holidays = await findMany('holidays', {});
        holidays = holidays.map(h => new Date(h.date));
    
        weeklyoffs = await findMany('weekly_offs', {});
        weeklyoffs = weeklyoffs.map(wo => wo.day);

        while (!shouldEnd) {
            let eligibleDate = await checkForWeekoffAndHolidays(startDate);
            if (result.find(d => d.getTime() === eligibleDate.getTime()) == null) {
                result.push(new Date(eligibleDate));
            }

            switch (frequency) {
                case 'daily':
                    startDate.setDate(startDate.getDate() + (1 * every));
                    break;
                case 'weekly':
                    startDate.setDate(startDate.getDate() + (7 * every));
                    break;
                case 'monthly':
                    startDate.setMonth(startDate.getMonth() + (1 * every));
                    break;
                case 'yearly':
                    startDate.setFullYear(startDate.getFullYear() + (1 * every));
                    break;
                default:
                    break;
            }
    
            if (
                (endAt != null && startDate > endAt) ||
                (endAfter != null && result.length === endAfter)
            ) {
                shouldEnd = true;
            }
        }
    }

    let newSchedule = await create('schedule', {
        config: req.body,
        events: result,
    });

    res.json({ startDate, id: newSchedule.insertedId });
}

module.exports = {
    createSchedule,
};