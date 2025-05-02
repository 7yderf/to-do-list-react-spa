import Swal from 'sweetalert2'

const optionsSweet = {
  toast: {
    position: 'top-end',
    toast: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }
}

export function showAlert (type, message = null, timer = 4000) {
  const options = {
    success: {
      icon: 'success',
      title: '¡Listo!',
      text: message || 'Operación realizada con éxito',
      timer,
      confirmButtonText: 'Listo',
      confirmButtonColor: 'green',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      ...optionsSweet.toast
    },
    error: {
      icon: 'error',
      title: 'Error',
      text: message || 'Algo salió mal, por favor intenta de nuevo',
      timer,
      confirmButtonText: 'Entiendo',
      confirmButtonColor: 'red',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      ...optionsSweet.toast
    },
    warning: {
      icon: 'warning',
      title: '¡Atención!',
      text: message || 'Por favor verifica los datos ingresados',
      timer,
      confirmButtonText: 'Ok',
      confirmButtonColor: 'orange',
      showConfirmButton: !timer,
      timerProgressBar: !!timer,
      ...optionsSweet.toast
    }
  }

  // si timer es null, no se cerrará automáticamente
  if (!timer) delete options[type].timer
  if (!timer) delete options[type].didOpen

  return Swal.fire(options[type])
}

export async function showConfirm (message = '¿Estás seguro de realizar esta acción?', confirmText = 'Sí, estoy seguro') {
  const result = await Swal.fire({
    icon: 'warning',
    title: '¡Atención!',
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: 'green',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: 'red'
  })
  return result
}

export default { showAlert, showConfirm }
