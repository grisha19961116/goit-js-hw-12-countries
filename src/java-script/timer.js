export
 class Timer {
  constructor({dateNow, targetDate}) {
    this.dateNow = dateNow;
    this.targetDate = targetDate;
    this.time = this.targetDate-this.dateNow;
  }
  showTimes(){
    return this.time;
  }
  getDays(){
    return Math.floor(this.time / (1000 * 60 * 60 * 24));
  }
  getHours(){
    return  Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  };
  getMins(){
    return Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
  };
  getSecs(){
    return  Math.floor((this.time % (1000 * 60)) / 1000);
  }
}
const showDay = document.querySelector('span[data-value="days"]');
const showHour = document.querySelector('span[data-value="hours"]');
const showMins = document.querySelector('span[data-value="mins"]');
const showSecs = document.querySelector('span[data-value="secs"]');
const startTimer = () => {
  setInterval(() => {
    const newTimer = new Timer({dateNow : Date.now(),targetDate : new Date(2021, 0, 30).getTime()}); 
    showDay.textContent = `${newTimer.getDays()}`;
    showHour.textContent = `${newTimer.getHours()}`;
    showMins.textContent = `${newTimer.getMins()}`;
    showSecs.textContent = `${newTimer.getSecs()}`;
  }, 1000)
};
startTimer()
