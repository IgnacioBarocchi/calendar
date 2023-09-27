//     <div>
//       {DAYS_ABBREVIATIONS.map((day) => (
//         <div className="calendar-day-cell" key={day}>
//           <span>{day}</span>
//         </div>
//       ))}
//       <div id="days-of-month-body">
//         {dates.map((date) => (
//           <div
//             className={`calendar-day-cell ${
//               date.toDateString() === currentDate.toDateString()
//                 ? 'today-highlight'
//                 : ''
//             }`}
//             key={date.toDateString()}
//             onClick={() => handleDayClick(date)}
//           >
//             <span>{date.getDate()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
