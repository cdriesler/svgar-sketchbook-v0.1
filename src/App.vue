<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <div class="header__logo">
          <router-link to="/">
          <img height="52px" alt="svgar logo" src="./assets/svgar-logo.svg">
          </router-link>
        </div> 
      </div>
      <div class="navigation">
        <router-link class="navigation__link" exact-active-class="navigation__link--active" to="/">home</router-link>
        <router-link class="navigation__link" exact-active-class="navigation__link--active" to="/gallery">gallery</router-link>
        <router-link class="navigation__link" exact-active-class="navigation__link--active" to="/docs">docs</router-link>
      </div>
      <div class="box">
        <router-view/>
      </div>
      <div class="footer">
        <div class="footer__version">
          0.4.0
        </div>   
        <div class="footer__source">
          <a href="https://github.com/WeWorkSandbox/svgar" target="_blank">&lt;/&gt;</a>
        </div>   
      </div>
        <!--
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
        -->  
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;

  font-size: 14px;
}

::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: 'Consolas', monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;


}
.container {
  height: 100%;
  width: calc(100vw - 30px);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.header {
  width: 100%;
  height: 42px;
  border-bottom: 2px solid black;

  margin-top: 15px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.navigation {
  width: 100%;
  min-height: 30px;
  height: 30px;
  border-bottom: 2px solid black;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.navigation__link {
  height: 28px;
  line-height: 28px;
  vertical-align: middle;

  text-decoration: none;
  color: black;

  padding-left: 15px;
  padding-right: 15px;  
}

.navigation__link--active {
  background: black;
  color: white;
}

.box {
  width: 100%;

  flex-grow: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;

  overflow-y: auto;
  overflow-x: visible;
}

.footer {
  width: 100%;
  height: 25px;
  border-top: 2px solid black;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.footer__version {
  margin-left: 15px;

  line-height: 25px;
  vertical-align: middle;
  font-size: 10px;
}

.footer__source a{
  margin-left: 15px;

  color: black;
  text-decoration: none;

  line-height: 25px;
  vertical-align: middle;
  font-size: 10px;
}


</style>
