// import './style.css'
import "animate.css";
import "./main.scss";

import imgMobile from "./assets/montse_edit_mobile.png";
import imgDesk from "./assets/montse_edit_desk.png";

class Loader extends HTMLElement {
  constructor() {
    super()
    this.main = document.getElementById("main");
    this.body = document.querySelector('body');

    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        this.body.removeChild(this);
        this.main.classList.add("active");
      }, 1500);
    })
  }
}

customElements.define("loader-spinner", Loader)

class CounterClock extends HTMLElement {
  constructor() {
    super();

    this.startDate = this.dataset.startDate;
    this.startTime = this.dataset.startTime;
    this.endDate = this.dataset.endDate;
    this.endTime = this.dataset.endTime;
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;

    this.init();
  }

  /**
   * 
   */
  init() {
    setInterval(() => {
        const formatStart = this.formatDateUS(this.startDate, this.startTime);
        const formatEnd = this.formatDateUS(this.endDate, this.endTime);
        const formatNow = Date.now();
        const distanceFromStart = formatStart.time - formatNow;
        const distanceFromEnd = formatEnd.time - formatNow;
        const restDateEnd = this.getRestDate(distanceFromEnd);
    
        if (distanceFromStart < 0 && distanceFromEnd > 0) {
          this.renderCountdown(restDateEnd);
        } else if (distanceFromStart > 0 && distanceFromEnd > 0) {
          this.style.display = "none";
        }
    }, 1000);
  }

  /**
   *
   * @param {Date : string} date
   * @param {Time : string} time
   * @returns Date formated for javascript oparations
   */
  formatDateUS(date, time) {
    const arrayDate = date.split("/");
    const arrayTime = time.split(":");

    return {
      formatDate: `${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]} ${arrayTime[0]}:${arrayTime[1]}:${arrayTime[2]}`,
      time: new Date(
        `${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]} ${arrayTime[0]}:${arrayTime[1]}:${arrayTime[2]}`
      ).getTime(),
      second: arrayTime[2],
      minutes: arrayTime[1],
      hour: arrayTime[0],
      day: arrayDate[0],
      month: arrayDate[1],
      year: arrayDate[2],
    };
  }

  /**
   *
   * @param {Date} distance
   * @returns Object with Day, Hour, Minutes and Second for ending de countdown
   */
  getRestDate(distance) {
    const restDate = {
      day: Math.floor(distance / this.day),
      hour: Math.floor((distance % this.day) / this.hour),
      minutes: Math.floor((distance % this.hour) / this.minute),
      seconds: Math.floor((distance % this.minute) / this.second),
    };

    return restDate;
  }

  /**
   * Render values
   * @param {*} restDateEnd
   */
  renderCountdown(restDateEnd) {
    this.querySelector(".days .value").innerHTML =
      restDateEnd.day < 10 ? "0" + restDateEnd.day : restDateEnd.day;
    document.querySelector(".hours .value").innerHTML =
      restDateEnd.hour < 10 ? "0" + restDateEnd.hour : restDateEnd.hour;
    document.querySelector(".minutes .value").innerHTML =
      restDateEnd.minutes < 10
        ? "0" + restDateEnd.minutes
        : restDateEnd.minutes;
    document.querySelector(".seconds .value").innerHTML =
      restDateEnd.seconds < 10
        ? "0" + restDateEnd.seconds
        : restDateEnd.seconds;
  }
}

customElements.define("counter-clock", CounterClock);

class dynamicSrcImage extends HTMLElement {
  constructor() {
    super()

    this.srcDesk = imgDesk;
    this.srcMobile = imgMobile;
    this.img = this.querySelector("img");

    this.setSource();
  }

  setSource() {
    if(window.screen.width > 768) {
      this.img.src = this.srcDesk;
    } else {
      this.img.src = this.srcMobile;
    }
  }
}

customElements.define("dynamic-src-image", dynamicSrcImage);