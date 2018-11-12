const moment = require('moment');
const schedule = require('node-schedule');
const sun = require('sun-time');
const {changeStatus} = require('./clipsal');

const lightID = 36;
const smartHome = sun(36.000756, -78.921345);

const scheduleLight = (time, on) => {
  const lightStatus = on ? 'on' : 'off';
  console.log(`Scheduling light to turn ${lightStatus} ${
      moment(time).calendar().toLowerCase()}`);
  schedule.scheduleJob(time, () => {
    console.log(`Turning ${lightStatus} light ${
        moment(time).calendar().toLowerCase()}`);
    changeStatus(on, [lightID]);
  });
};

const updateTimes = () => {
  const today = moment();
  const tomorrow = moment(today).add(1, 'days');

  const s1 = smartHome.set.split(':');
  const s2 = smartHome.rise.split(':');

  const sunset =
      moment(today).set({hour: s1[0], minute: s1[1]}).subtract(30, 'minutes');
  const sunrise =
      moment(tomorrow).set({hour: s2[0], minute: s2[1]}).add(30, 'minutes');
  const nextUpdate = moment(tomorrow).set({hour: 12, minute: 0});  // at noon

  if (moment().isBefore(sunset)) {
    changeStatus(false, [lightID]);
    scheduleLight(sunset.toDate());
    scheduleLight(sunrise.toDate());
  } else if (moment().isBefore(sunrise)) {
    changeStatus(true, [lightID]);
    scheduleLight(sunrise.toDate());
  }

  schedule.scheduleJob(nextUpdate.toDate(), updateTimes);
};

module.exports = updateTimes;