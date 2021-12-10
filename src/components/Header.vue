<template>
  <header>
    <nav class="container">
      <a href="/"><img src="../assets/mova_logo.svg" alt="Pagina Inicial" /></a>
      <div class="voltar" @click="voltarPagina">
        <img src="../assets/mova_voltar.svg" alt="" />
        <span>Voltar</span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    voltarPagina() {
      window.history.back();
    },
  },
};
</script>

<style scoped>
header {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-header);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
}

.container {
  display: flex;
  width: 90%;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}

.voltar {
  position: relative;
  top: 5px;
  right: 0;
  margin-right: 80px;
  padding: 6px 30px;
  color: var(--color-background-button);
  border: 2px solid var(--color-background-button);
  transition: 0.2s;
  cursor: pointer;
}

.voltar:hover {
  background-color: #be5bd6;
  opacity: 0.9;
}

span {
  margin-left: 10px;
}
@media (max-width: 600px) {
  header {
    padding-left: 30px;
    padding-right: 10px;
  }
  span {
    display: none;
  }
  .voltar {
    right: 0;
    border: none;
    margin-top: 4px;
    padding-right: 2px;
  }
  .voltar:hover {
    background-color: var(--color-background-header);
  }
  .voltar img {
    height: 15px;
    margin-left: 90px;
  }
}
</style>
