const routeItems = [
  {
    title: 'Home',
    props: {
      to: '/',
      prependIcon: 'mdi-home'
    }
  },
  {
    title: 'Thumbnail Generator',
    props: {
      to: '/thumbnail/generate',
      prependIcon: 'mdi-cog-clockwise'
    }
  },
  {
    title: 'Wie funktioniert das?',
    props: {
      to: '/how-does-it-work',
      prependIcon: 'mdi-help-circle'
    }
  },
  {
    title: 'Über',
    props: {
      to: '/about',
      prependIcon: 'mdi-information'
    }
  },
]

export { routeItems }