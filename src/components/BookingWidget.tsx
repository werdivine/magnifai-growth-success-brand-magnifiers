'use client';

import styles from './BookingWidget.module.css';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BookingWidget() {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <h3>Book Your Growth Strategy Audit</h3>
        <p className={styles.sub}>Free 15-min strategy session</p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="work@email.com" className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <select className={styles.select}>
            <option>I want to automate Sales</option>
            <option>I want to automate Content</option>
            <option>I want to automate Support</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>
          <Calendar size={18} /> Schedule Now
        </button>

        <div className={styles.urgenctStrp}>
          <span className={styles.dot}></span> 2 spots left for this week
        </div>
      </form>
    </div>
  );
}
