<template>
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.1594 19.0543V17.2645C18.1594 16.3151 17.7822 15.4046 17.1109 14.7333C16.4396 14.0619 15.529 13.6848 14.5796 13.6848H7.42022C6.47083 13.6848 5.56031 14.0619 4.88899 14.7333C4.21766 15.4046 3.84052 16.3151 3.84052 17.2645V19.0543" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.9999 10.1051C12.977 10.1051 14.5797 8.50238 14.5797 6.52536C14.5797 4.54834 12.977 2.94565 10.9999 2.94565C9.02292 2.94565 7.42023 4.54834 7.42023 6.52536C7.42023 8.50238 9.02292 10.1051 10.9999 10.1051Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>
