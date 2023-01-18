const activeMenu = () => {
  const openMenuButton = document.getElementById('open-menu-button')
  const closeMenuButton = document.getElementById('close-menu-button')
  const mainMenu = document.getElementById('main-menu')
  if (openMenuButton && mainMenu && closeMenuButton) {
    openMenuButton.addEventListener('click', () => {
      mainMenu.classList.add('active')
    })
    closeMenuButton.addEventListener('click', () => {
      mainMenu.classList.remove('active')
    })
  }
}


activeMenu()
