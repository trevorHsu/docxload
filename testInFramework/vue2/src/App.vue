<template>
  <div id="app">
    <div @click="handleDownload" style="cursor: pointer;">
      download
    </div>
  </div>
</template>

<script>
import docxload from '@docxload/index'

const genVueJSX = (h) => {
  return (
    <template>

      <page>
        <p>
          <span 
            underline="type: single; color: #000;"
            color="#000"
          >Hello, </span>
          <template>
            <span font-size={30}>docxload</span>
          </template>
        </p>
      </page>

      <template>
        <page>
          <p>
            <span>page 2</span>
          </p>
        </page>
      </template>

    </template>
  )
}

export default {
  name: 'App',
  methods: {
    handleDownload() {
      docxload(genVueJSX(this.$createElement))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
