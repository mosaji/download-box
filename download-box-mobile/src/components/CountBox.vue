<template>
  <div class="countBox border-box">
    <div>
      <h1>{{ this.count }}</h1>
      <p>{{ this.text }}</p>
    </div>
    <i :class="icon"></i>
  </div>
</template>

<script>
export default {
  props: ['icon', 'text', 'count'],
}
</script>


<style lang="scss" scoped>
.countBox {
  direction: ltr;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  div {
    flex: 1;
  }
  p {
    margin: 0;
    font-size: 0.7rem;
  }
  h1 {
    margin: 0;
    font-family: english !important;
    margin-bottom: 0.3rem;
  }
  i {
    font-size: 3rem;
    color: var(--f7-theme-color);
  }
}
</style>

