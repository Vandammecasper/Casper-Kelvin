export const data = {
  labels: ['Simple haircut', 'Beard trim', 'Razor shave', 'Clean shave', 'Hair coloring', 'Neck clean up'],
  datasets: [
    {
      backgroundColor: ['#9594FC', '#FFC148', '#35E5AA', '#6BF5FF', '#18A0FB', '#FF83A8'],
      borderColor: ['#9594FC', '#FFC148', '#35E5AA', '#6BF5FF', '#18A0FB', '#FF83A8'],
      data: [100, 20, 80, 50, 60, 10],
        hoverOffset: 24
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
