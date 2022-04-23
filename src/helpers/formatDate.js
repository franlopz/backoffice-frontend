export default function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("-")
}

export function formatDateES(date) {
  let d = date.split("-")
  let day = d[2],
    month = d[1],
    year = d[0]
  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [day, month, year].join("/")
}

export function formatDateDashES(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [day, month, year].join("-")
}
