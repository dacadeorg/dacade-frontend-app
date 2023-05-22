const convertNotificationDate = (date: Date) => {
  const submissionInputDate = new Date(date);
  const submissionDate = submissionInputDate.toDateString().slice(4, -4);
  let submissionMinutes: number | string = submissionInputDate.getMinutes();
  if (submissionMinutes < 10) {
    submissionMinutes = "0" + submissionMinutes;
  }
  let submissionHours: number | string = submissionInputDate.getHours();
  if (submissionHours < 10) {
    submissionHours = "0" + submissionHours;
  }
  const submissionTime = submissionHours + ":" + submissionMinutes;
  const submissionTimeAndDate = submissionDate + " " + submissionTime;
  return submissionTimeAndDate;
};

export default convertNotificationDate;
