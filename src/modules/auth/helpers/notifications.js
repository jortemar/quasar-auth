import { Notify, Dialog } from 'quasar'

export function showNotifications(status, title, message, color) {
  if (!status) {
    const dialog = Dialog.create({
      dark: true,
      title: title,
      message: message,
    }).onDismiss(() => {
      clearTimeout(timer)
    })

    const timer = setInterval(() => {
      clearInterval(timer)
      dialog.hide()
    }, 10000)

  } else {

    Notify.create({
      title: title,
      message: message,
      color: color,
      type: 'positive'
    })
  }
}
