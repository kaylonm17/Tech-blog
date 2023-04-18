const cancelBtnEl = document.getElementById('cancel')

const cancel = (event) => {
    event.preventDefault()

    document.location.replace('/api/tech')
} 

cancelBtnEl.addEventListener('click', cancel)