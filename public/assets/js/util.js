/* eslint-disable no-console */
const util = {
  convertDate(date) {
    const submissionInputDate = new Date(date)
    const submissionDate = submissionInputDate.toDateString().slice(4, -4)
    let submissionMinutes = submissionInputDate.getMinutes()
    if (submissionMinutes < 10) {
      submissionMinutes = '0' + submissionMinutes
    }
    let submissionHours = submissionInputDate.getHours()
    if (submissionHours < 10) {
      submissionHours = '0' + submissionHours
    }
    const submissionTime = submissionHours + ':' + submissionMinutes
    const submissionTimeAndDate = submissionDate + ' ' + submissionTime
    return submissionTimeAndDate
  },
  contentPreview(content) {
    const maxLength = 160
    let trimmedString = content.substr(0, maxLength)
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    )
    return trimmedString
  },
}

export default util
